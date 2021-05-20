<template>
  <div class="remix-icon-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form :inline="true" label-width="80px" @submit.native.prevent>
          <el-form-item label="图标名称">
            <el-input v-model="queryForm.title"></el-input>
          </el-form-item>
          <el-form-item label-width="0">
            <el-button native-type="submit" type="primary" @click="queryData">
              搜索
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col
        v-for="(item, index) in queryIcon"
        :key="index"
        :lg="2"
        :md="3"
        :sm="8"
        :xl="2"
        :xs="6"
      >
        <el-card shadow="hover" @click.native="handleCopyIcon(index, $event)">
          <vab-remix-icon
            :icon-class="`https://cdn.jsdelivr.net/gh/chuzhixin/zx-remixicon/src/icons/svg/${item}.svg`"
            @click.stop
          ></vab-remix-icon>
        </el-card>
        <div class="icon-text">{{ item }}</div>
      </el-col>

      <el-col :span="24">
        <el-pagination
          :background="background"
          :current-page="queryForm.pageNo"
          :layout="layout"
          :page-size="queryForm.pageSize"
          :page-sizes="[72, 144, 216, 288]"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import clip from "@/utils/clipboard";
  import { iconList } from "./iconData";

  export default {
    name: "RemixIcon",
    data() {
      return {
        copyText: "",
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        background: true,
        height: 0,
        selectRows: "",
        elementLoadingText: "正在加载...",
        queryIcon: [],
        queryForm: {
          pageNo: 1,
          pageSize: 72,
          title: "",
        },
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      handleSizeChange(val) {
        this.queryForm.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val;
        this.fetchData();
      },
      queryData() {
        this.queryForm.pageNo = 1;
        this.fetchData();
      },
      async fetchData() {
        const { title, pageNo = 1, pageSize = 72 } = this.queryForm;
        let mockList = iconList.filter((item) => {
          if (title && item.indexOf(title) < 0) return false;
          return true;
        });
        const pageList = mockList.filter(
          (item, index) =>
            index < pageSize * pageNo && index >= pageSize * (pageNo - 1)
        );
        this.queryIcon = pageList;
        this.total = mockList.length;
      },
      handleCopyIcon(index, event) {
        //const copyText = `<vab-remix-icon icon-class="https://cdn.jsdelivr.net/gh/chuzhixin/zx-remixicon@master/src/icons/svg/${this.queryIcon[index]}.svg" />`;
        const copyText = `<vab-remix-icon icon-class="${this.queryIcon[index]}"></vab-remix-icon>`;
        this.copyText = copyText;
        clip(copyText, event);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .remix-icon-container {
    ::v-deep {
      .el-card__body {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        svg:not(:root),
        .svg-external-icon {
          font-size: 28px;
          font-weight: bold;
          color: $base-color-gray;
          text-align: center;
          vertical-align: middle;
          pointer-events: none;
          cursor: pointer;
        }
      }
    }

    .icon-text {
      height: 30px;
      margin-top: -15px;
      overflow: hidden;
      font-size: 12px;
      line-height: 30px;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
