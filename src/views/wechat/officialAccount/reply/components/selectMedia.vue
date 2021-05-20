<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="720px"
      @close="close"
    >
      <div style="max-height: 400px; overflow: scroll">
        <el-table
          v-loading="listLoading"
          :data="mediaList"
          :element-loading-text="elementLoadingText"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            v-if="multipleChoice"
            type="selection"
            width="55"
          ></el-table-column>
          <el-table-column v-if="!multipleChoice" label="" width="28">
            <template slot-scope="{ row }">
              <el-radio-group v-model="selectedMedia" class="select-radio-box">
                <el-radio :label="row"></el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column label="素材ID">
            <template slot-scope="{ row }">
              {{ row.id }}
            </template>
          </el-table-column>
          <el-table-column v-if="type === 20" label="图片预览">
            <template slot-scope="{ row }">
              <el-image
                v-if="row.resource"
                :src="row.resource.url"
                :preview-src-list="[row.resource.url]"
              ></el-image>
              <el-tag v-else type="info">无</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="素材名称">
            <template slot-scope="{ row }">
              {{ row.name }}
            </template>
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="创建时间"
            :formatter="formatTime"
          ></el-table-column>
        </el-table>
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
  </div>
</template>

<script>
  import dayjs from "dayjs";
  import {
    getMaterialVoice,
    getMaterialImage,
    getMaterialText,
    getMaterialVideo,
  } from "@/api/wechat";

  export default {
    name: "SelectMaterial",
    props: {
      type: {
        type: Number,
        default: 20,
      },
      multipleChoice: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        title: "",
        multipleSelection: [],
        selectedMedia: null,
        dialogFormVisible: false,
        mediaList: [],
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        elementLoadingText: "正在加载...",
        queryForm: {
          page_index: 1,
          page_size: 20,
        },
      };
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      cancel() {
        this.$emit("cancel");
      },
      async show() {
        this.setTitle();
        await this.fetchData();
        this.queryForm = this.$options.data().queryForm;
        this.dialogFormVisible = true;
        this.selectedMedia = null;
      },
      setTitle() {
        switch (this.type) {
          case 20:
            this.title = "选择图片素材";
            break;
          case 30:
            this.title = "选择音频素材";
            break;
          case 40:
            this.title = "选择视频素材";
            break;
          case 50:
            this.title = "选择图文素材";
            break;
          default:
            this.title = "选择图片素材";
        }
      },
      close() {
        this.dialogFormVisible = false;
      },
      save() {
        if (!this.multipleChoice && this.selectedMedia) {
          this.$emit("select", this.selectedMedia);
        }
        if (this.multipleChoice && this.multipleSelection) {
          this.$emit("select", this.multipleSelection);
        }
        this.close();
      },
      formatTime(row, column, cellValue) {
        return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
      },
      handleSizeChange(val) {
        this.queryForm.page_size = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.queryForm.page_index = val;
        this.fetchData();
      },
      queryData() {
        this.queryForm.page_index = 1;
        this.fetchData();
      },
      async fetchData() {
        this.listLoading = true;
        let Api;
        switch (this.type) {
          case 20:
            Api = getMaterialImage;
            break;
          case 30:
            Api = getMaterialVoice;
            break;
          case 40:
            Api = getMaterialVideo;
            break;
          case 50:
            Api = getMaterialText;
            break;
          default:
            Api = getMaterialImage;
        }
        const resp = await Api(this.queryForm);
        this.mediaList = resp.data.rows;
        this.total = resp.data.count;
        this.listLoading = false;
      },
    },
  };
</script>

<style>
  .select-radio-box .el-radio__label {
    display: none;
  }
</style>
