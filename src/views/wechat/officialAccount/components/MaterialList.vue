<template>
  <div class="wechat-container">
    <el-row>
      <el-col :span="24">
        <part-header>
          <span slot="title">{{ title }}</span>
        </part-header>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <div v-if="type === '5'" class="tips">
        每日可群发100次，但是用户每月只能接收4条。
      </div>
      <vab-query-form>
        <vab-query-form-left-panel style="width: 50%">
          <el-button icon="el-icon-plus" type="primary" @click="handleEdit()">
            添加
          </el-button>
          <!-- TODO 批量删除 - begin -->
          <!-- <el-button
            v-if="type !== '5'"
            icon="el-icon-delete"
            type="danger"
            @click="handleDelete()"
          >
            批量删除
          </el-button> -->

          <!-- TODO 批量删除 - end -->
        </vab-query-form-left-panel>
      </vab-query-form>

      <!-- TODO 批量删除 - begin -->
      <!-- :select-props="selectProps"
        :is-select="isSelect" -->
      <!-- TODO 批量删除 - end -->
      <Table
        :loading="listLoading"
        :data="list"
        :head-data="columns"
        :operate="operate"
        @selectionChange="setSelectRows"
      >
        <template v-slot="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </Table>
      <!-- <el-table
        v-loading="listLoading"
        :data="list"
        :element-loading-text="elementLoadingText"
        @selection-change="setSelectRows"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="素材ID" prop="id"></el-table-column>
        <el-table-column label="素材预览">
          <template slot-scope="{ row }">
            <el-image
              v-if="row.wechat_user"
              :src="row.wechat_user.avatar || avatar"
            ></el-image>
            <el-tag v-else type="info">无</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="素材名称" prop="name"></el-table-column>
        <el-table-column label="MEDIA_ID" prop="MEDIA_ID"></el-table-column>
        <el-table-column
          label="添加时间"
          prop="created_at"
          :formatter="formatTime"
        ></el-table-column>

        <el-table-column label="操作" min-width="120">
          <template v-slot="scope">
            <el-button type="primary" :disabled="!user.is_native">
              编辑
            </el-button>
            <el-button
              :disabled="scope.row.is_native || !user.is_native"
              type="danger"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table> -->
      <el-pagination
        style="text-align: center"
        :page-size="queryForm.page_size"
        :current-page="queryForm.page_index"
        :layout="queryForm.layout"
        :total="queryForm.total"
        :page-sizes="queryForm.pageSizes"
        :background="queryForm.background"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
  import { pagination } from "@/mixin";
  import Table from "./Table";
  import {
    getMaterialText,
    deleteMaterialText,
    getMaterialImage,
    deleteMaterialImage,
    getMaterialVoice,
    deleteMaterialVoice,
    getMaterialVideo,
    deleteMaterialVideo,
  } from "@/api/wechat";
  export default {
    name: "MaterialList",
    components: {
      Table,
    },
    mixins: [pagination],
    props: {
      // 类型：1-图文 2-图片 3-语音 4-视频
      type: {
        type: String,
        default: "1",
      },
      // 页头-标题
      title: {
        type: String,
        default: "",
      },
      // 表头
      columns: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        avatar: require("@/assets/default_avatar.svg"),
        handleWidth: 200,
        listLoading: false,
        elementLoadingText: "正在加载...",
        labelPosition: "right",
        list: [],
        selectRows: [],
        operate: {
          visible: true,
          minWidth: 130,
        },
        // TODO 批量删除 - begin
        isSelect: true,
        selectProps: {
          id: "id",
        },
        // TODO 批量删除 - end
      };
    },
    async created() {
      await this.fetchData();
    },
    mounted() {
      const that = this;
      window.onresize = () =>
        (() => {
          const width = document.body.clientWidth;
          if (width < 1000) {
            that.labelPosition = "top";
          } else {
            that.labelPosition = "right";
          }
          if (width < 600) {
            that.handleWidth = 100;
          } else if (width < 700) {
            that.handleWidth = 120;
          } else if (width < 1000) {
            that.handleWidth = 180;
          } else {
            that.handleWidth = 200;
          }
        })();
      window.onresize();
    },
    methods: {
      // 格式化时间
      formatTime(row, column, cellValue) {
        return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
      },
      // 表格多选-批量删除
      setSelectRows(val) {
        this.selectRows = val;
      },
      // 初始化
      async fetchData() {
        this.listLoading = true;
        let Api = "";
        switch (this.type) {
          case "1":
            Api = getMaterialText;
            break;
          case "2":
            Api = getMaterialImage;
            break;
          case "3":
            Api = getMaterialVoice;
            break;
          case "4":
            Api = getMaterialVideo;
            break;
          case "5":
            break;

          default:
            break;
        }
        if (!Api) {
          return;
        }
        // const { count, rows }
        const { data } = await Api({
          page_size: this.queryForm.page_size,
          page_index: this.queryForm.page_index,
        });
        console.log("列表", data);
        this.selectRows = [];
        this.list = data.rows || [];
        this.queryForm.total = data.count || 0;
        this.listLoading = false;
      },
      handleEdit(row) {
        if (row) {
          this.$router.push({
            path: `edit/${this.type}/${row.id}`,
          });
        } else {
          this.$router.push({
            path: `add/${this.type}`,
          });
        }
      },
      // 删除
      handleDelete(row) {
        let Api = "";
        switch (this.type) {
          case "1":
            Api = deleteMaterialText;
            break;
          case "2":
            Api = deleteMaterialImage;
            break;
          case "3":
            Api = deleteMaterialVoice;
            break;
          case "4":
            Api = deleteMaterialVideo;
            break;
          default:
            break;
        }
        if (row && row.id) {
          this.$baseConfirm("你确定要删除当前项吗", null, async () => {
            await Api([row.id]);
            this.$baseMessage("删除成功", "success");
            this.queryForm.page_index = 1;
            this.fetchData();
          });
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id);
            this.$baseConfirm("你确定要删除选中项吗", null, async () => {
              const { msg } = await Api(ids);
              this.$baseMessage("删除成功", "success");
              this.queryForm.page_index = 1;
              this.fetchData();
            });
          } else {
            this.$baseMessage("未选中任何行", "error");
            return false;
          }
        }
      },
    },
  };
</script>

<style scoped>
  .wechat-container {
    padding: 20px;
  }
  .el-pagination {
    text-align: right;
  }
  .tips {
    border: 1px solid #dfeffd;
    border-radius: 3px;
    padding: 16px;
    background: #fbfdff;
    margin-bottom: 16px;
    color: #1890ff;
  }
</style>
