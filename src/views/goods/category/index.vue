<template>
  <div class="goods-category-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
          添加
        </el-button>
      </vab-query-form-left-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      row-key="id"
      :tree-props="{ children: `children`, hasChildren: `hasChildren` }"
      default-expand-all
    >
      <el-table-column label="分类ID" prop="id" width="160px"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column prop="image" label="缩略图">
        <template slot-scope="{ row }">
          <el-image
            v-if="row.image"
            :src="row.image.url"
            :preview-src-list="imageList"
          ></el-image>
          <el-tag v-else type="info">无</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="order" label="分类顺序"></el-table-column>
      <el-table-column
        prop="created_at"
        label="创建时间"
        :formatter="formatTime"
      ></el-table-column>
      <el-table-column label="操作" width="160">
        <template v-slot="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.page_index"
      :page-size="queryForm.page_size"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <edit
      ref="edit"
      :goods-type="queryForm.type"
      :list="list"
      @fetchData="fetchData"
    ></edit>
  </div>
</template>

<script>
  import { getCategoryList, doDeleteCategory } from "@/api/goods";
  import Edit from "./components/CategoryEdit";
  import dayjs from "dayjs";

  export default {
    name: "GoodsCategory",
    components: { Edit },
    data() {
      return {
        imageList: [],
        list: [],
        childrenList: [],
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        elementLoadingText: "正在加载...",
        queryForm: {
          page_index: 1,
          page_size: 200,
          type: 10,
          superior_id: undefined,
        },
      };
    },
    watch: {
      $route: {
        handler(route) {
          this.queryForm.type = (route.query && Number(route.query.type)) || 10;
        },
        immediate: true,
      },
    },
    created() {
      this.fetchData();
    },
    methods: {
      handleEdit(row) {
        if (row.id) {
          this.$refs["edit"].showEdit(row);
        } else {
          this.$refs["edit"].showEdit();
        }
      },
      handleSizeChange(val) {
        this.queryForm.page_size = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.queryForm.page_index = val;
        this.fetchData();
      },
      handleDelete(row) {
        this.$baseConfirm("你确定要删除当前项吗", null, async () => {
          await doDeleteCategory(row.id);
          this.$baseMessage("删除成功", "success");
          this.fetchData();
        });
      },
      async fetchData() {
        this.listLoading = true;
        const { data } = await getCategoryList(this.queryForm);
        const conversionData = this.conversion(data.rows);
        this.list = this.sortByOrder(conversionData);
        const imageList = [];
        data.rows.forEach((item) => {
          if (item.image) {
            imageList.push(item.image.url);
          }
        });
        this.imageList = imageList;
        this.total = data.count;
        this.listLoading = false;
      },
      formatTime(row, column, cellValue) {
        return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
      },
      sortByOrder(data) {
        let result = [];
        result = data.sort((item_1, item_2) => {
          return item_1.order - item_2.order;
        });
        result.forEach((item, index) => {
          if (item.children && item.children.length > 1) {
            result[index].children = item.children.sort((item_1, item_2) => {
              return item_1.order - item_2.order;
            });
          }
        });
        return result;
      },
      conversion(data) {
        const root = [];
        for (const item of data) {
          if (!item.superior_id) {
            root.push(item);
          }
          for (const item2 of data) {
            if (item2.superior_id === item.id) {
              if (!item.children) {
                item.children = [];
              }
              item.children.push(item2);
            }
          }
        }
        return root;
      },
    },
  };
</script>
