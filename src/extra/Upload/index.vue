<template>
  <div class="image-dialog-container">
    <el-dialog
      title="选取图片"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="720px"
      :modal="modal"
      :append-to-body="true"
      @close="close"
    >
      <div class="ope-box">
        <el-row :gutter="24">
          <el-col :sm="15">
            <el-button
              type="primary"
              style="padding: 9px 12px 9px 10px"
              @click="handleUpload"
            >
              <i class="el-icon-upload"></i>
              上传图片
            </el-button>
            <el-select
              v-model="selectGroupId"
              placeholder="请选择分组"
              style="margin: 0 5px 10px 8px; width: 172px"
              @change="queryData"
            >
              <el-option
                v-for="item in groupOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-button
              v-if="selectGroupId"
              icon="el-icon-edit"
              type="success"
              circle
              style="margin-left: 4px"
              @click="handleGroupEdit"
            ></el-button>
            <el-button
              v-if="selectGroupId"
              icon="el-icon-delete"
              type="danger"
              circle
              style="margin-left: 6px"
              @click="handleGroupRemove"
            ></el-button>
            <el-button
              icon="el-icon-plus"
              circle
              style="margin-left: 6px"
              @click="handleGroupAdd"
            ></el-button>
          </el-col>
          <el-col v-if="selectIds.length > 0" :xs="24" :sm="9">
            <el-select
              v-model="moveToGroupId"
              placeholder="移动至"
              style="margin: 0 5px 10px 5px; width: 172px"
              @change="handlerMove"
            >
              <el-option
                v-for="item in groupOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-button type="danger" @click="handlerDelete">删除</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="list">
        <p
          v-if="list === null || list.length === 0"
          style="
            font-size: 12px;
            line-height: 80px;
            color: #999;
            text-align: center;
          "
        >
          暂无数据
        </p>
        <div
          v-else
          style="max-height: 380px; overflow: scroll; min-height: 204px"
        >
          <ul class="el-upload-list el-upload-list--picture-card">
            <li
              v-for="item in list"
              :key="item.id"
              tabindex="0"
              class="el-upload-list__item is-success"
              :class="item.checked ? 'show-label' : ''"
            >
              <div>
                <el-image
                  class="el-upload-list__item-thumbnail image-item"
                  :src="item.url"
                  :preview-src-list="[item.url]"
                ></el-image>
                <label class="el-upload-list__item-status-label">
                  <i class="el-icon-upload-success el-icon-check"></i>
                </label>
                <el-checkbox
                  v-model="item.checked"
                  :checked="selectIds.includes(item.id)"
                  @change="handlerCheck(item)"
                >
                  {{ interceptChar(item.name, 12) }}
                </el-checkbox>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <el-pagination
        layout="prev, pager, next"
        :current-page="queryForm.page_index"
        :page-size="queryForm.page_size"
        :total="total"
        :pager-count="5"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
    <qiniu-upload
      ref="qiniuUpload"
      url=""
      name="图片"
      :limit="50"
      :size="5"
      :group="!selectGroupId ? 0 : selectGroupId"
      @fetchData="fetchData"
    ></qiniu-upload>
    <group-edit ref="groupEdit" @initOption="initOption"></group-edit>
  </div>
</template>

<script>
  import {
    getResourceList,
    getGroupList,
    doMove,
    doDelete,
    deleteGroup,
  } from "@/api/resource";
  import QiniuUpload from "./QiniuUpload";
  import GroupEdit from "./GroupEdit";

  export default {
    name: "ImgManager",
    components: {
      QiniuUpload,
      GroupEdit,
    },
    props: {
      images: {
        type: Array,
        default: function () {
          return [];
        },
      },
      maxLength: {
        type: Number,
        default: 1,
      },
      modal: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        dialogVisible: false,
        selectGroupId: undefined,
        moveToGroupId: undefined,
        groupOptions: [],
        list: [],
        listLoading: false,
        queryForm: {
          page_index: 1,
          page_size: 40,
        },
        total: 0,
        selectIds: [],
        checkedImg: null,
      };
    },
    watch: {
      dialogVisible(newVal) {
        if (newVal) {
          this.selectList = this.images.map((item) => {
            item.id = Number(item.id);
            return item;
          }); // 重置选中数组
          this.initOption();
          this.fetchData();
        }
      },
    },
    methods: {
      handleGroupAdd() {
        this.$refs["groupEdit"].showEdit();
      },
      handleGroupEdit() {
        if (this.selectGroupId) {
          const group = this.groupOptions.find(
            (item) => item.id === this.selectGroupId
          );
          if (group) {
            this.$refs["groupEdit"].showEdit(group);
          }
        }
      },
      handleGroupRemove() {
        this.$baseConfirm("你确定要删除当前分组吗", null, async () => {
          if (this.selectGroupId) {
            await deleteGroup(this.selectGroupId);
          }
          this.$baseMessage("删除成功", "success");
          this.selectGroupId = 0;
          this.initOption();
          this.queryData();
        });
      },
      interceptChar(string, num) {
        if (string.length > num) return string.substr(0, num) + "...";
        return string;
      },
      handlePictureCardPreview(url) {
        this.dialogImageUrl = url;
        this.dialogVisible = true;
      },
      showImgManager() {
        this.dialogVisible = true;
      },
      close() {
        this.dialogVisible = false;
        this.selectGroupId = undefined;
        this.groupOptions = [];
        this.list = [];
        this.moveToGroupId = undefined;
        this.selectList = [];
        this.selectIds = [];
      },
      async queryData() {
        this.queryForm.page_index = 1;
        this.queryForm.group_id = this.selectGroupId;
        await this.fetchData();
      },
      handleSizeChange(val) {
        this.queryForm.page_size = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.queryForm.page_index = val;
        this.fetchData();
      },
      handleUpload() {
        this.$refs["qiniuUpload"].handleShow();
      },
      handlerMove(val) {
        if (this.selectIds.length > 0) {
          this.$baseConfirm(
            "你确定要移动当前选中的所有图片吗？",
            null,
            async () => {
              await doMove({
                ids: this.selectIds,
                group_id: val,
              });
              this.$baseMessage("移动完成", "success");
              this.fetchData();
            }
          );
        } else {
          this.$baseMessage("未选中任何图片", "error");
          return false;
        }
        this.moveToGroupId = undefined; // 移动之后选项还原
      },
      handlerDelete() {
        if (this.selectIds.length > 0) {
          this.$baseConfirm(
            "你确定要删除当前选中的所有图片吗？",
            null,
            async () => {
              await doDelete({ ids: this.selectIds });
              this.$baseMessage("删除成功", "success");
              this.fetchData();
            }
          );
        } else {
          this.$baseMessage("未选中任何图片", "error");
          return false;
        }
      },
      handlerCheck(item) {
        if (item.checked) {
          this.selectIds.push(item.id);
          this.selectList.push(item);
        } else {
          this.$baseLodash.pull(this.selectIds, item.id);
          this.$baseLodash.pullAllBy(this.selectList, [item], "id");
        }
        if (this.selectList.length > 0) {
          this.checkedImg = this.$baseLodash.last(this.selectList);
        } else {
          this.checkedImg = null;
        }
      },
      async initOption() {
        this.listLoading = true;
        const { data } = await getGroupList({
          page_index: 1,
          page_size: 100,
        });
        const groupOptions = this.sortByOrder(data.rows);
        this.groupOptions = [
          {
            name: "所有",
            id: 0,
          },
          ...groupOptions,
        ];
        this.selectIds = this.selectList.map((image) => Number(image.id));
        this.listLoading = false;
      },
      async fetchData() {
        this.list = []; // 数据清除
        this.listLoading = true;
        if (!parseInt(this.queryForm.group_id)) {
          this.queryForm = Object.assign(
            {},
            {
              page_index: this.queryForm.page_index,
              page_size: this.queryForm.page_size,
            }
          );
        }
        const { data } = await getResourceList(this.queryForm);
        this.list = this.sortByOrder(data.rows);
        this.total = data.count;
        this.listLoading = false;
      },
      save() {
        if (!this.checkedImg) {
          this.$baseMessage("未选中任何图片", "error");
          return false;
        }
        if (this.selectList.length > this.maxLength) {
          this.$baseMessage(`最多只能选择${this.maxLength}张图片`, "error");
          return false;
        }
        if (this.maxLength === 1) {
          this.$emit("on-select", this.checkedImg);
        } else {
          this.$emit("on-select", this.selectList);
        }
        this.close();
      },
      sortByOrder(data) {
        return data.sort((item_1, item_2) => {
          item_1.id = Number(item_1.id);
          item_2.id = Number(item_2.id);
          return item_1.order - item_2.order;
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .el-upload-list--picture-card {
    .el-upload-list__item {
      width: 134px;
      height: 176px;
      margin: 14px 12px 0px 12px;
      border: none;
      .el-upload-list__item-status-label {
        display: none;
      }
    }
  }

  .image-item {
    height: 134px;
    border: 1px solid #c0ccda;
    border-radius: 6px;
  }

  .show-label.el-upload-list__item {
    &:hover,
    &:focus {
      .el-upload-list__item-status-label {
        display: block !important;
      }
    }
    .el-upload-list__item-status-label {
      display: block !important;
    }
  }

  .pic-box {
    position: relative;
    padding: 16px;
    margin-bottom: 20px;
    border: #f0f0f0 solid 1px;
    border-radius: 3px;
    &.active {
      border-color: #1890ff;
    }
  }
  .tip-box {
    width: 100%;
  }
</style>
