<template>
  <div class="store-staff-container">
    <div v-show="showList" class="delivery-list-container">
      <vab-query-form>
        <vab-query-form-left-panel :span="6">
          <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
            {{ queryForm.type === 10 ? "添加商品" : "添加菜品" }}
          </el-button>
        </vab-query-form-left-panel>
        <vab-query-form-right-panel :span="18">
          <el-form :inline="true" :model="queryForm" @submit.native.prevent>
            <el-form-item>
              <el-cascader
                v-model="categoryIds"
                :placeholder="`请选择${
                  queryForm.type === 10 ? '商品' : '菜品'
                }分类`"
                :options="categoryList"
                :props="{ checkStrictly: true }"
                clearable
              ></el-cascader>
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="queryForm.is_active"
                :placeholder="`${queryForm.type === 10 ? '商品' : '菜品'}状态`"
              >
                <el-option label="全部" :value="null"></el-option>
                <el-option label="上架" :value="1"></el-option>
                <el-option label="下架" :value="0"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-input
                v-model.trim="queryForm.name"
                clearable
                :placeholder="`请输入${
                  queryForm.type === 10 ? '商品' : '菜品'
                }名称`"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                icon="el-icon-search"
                type="primary"
                @click="queryData"
              >
                查询
              </el-button>
            </el-form-item>
          </el-form>
        </vab-query-form-right-panel>
      </vab-query-form>

      <el-table
        v-loading="listLoading"
        :data="goodsList"
        :element-loading-text="elementLoadingText"
      >
        <el-table-column
          :label="`${queryForm.type === 10 ? '商品' : '菜品'}ID`"
          prop="id"
          width="160px"
        ></el-table-column>
        <el-table-column
          :label="`${queryForm.type === 10 ? '商品' : '菜品'}图片`"
        >
          <template slot-scope="{ row }">
            <el-image
              v-if="row.thumbnail"
              :preview-src-list="imageList"
              :src="row.thumbnail.url"
            ></el-image>
            <el-tag v-else type="info">无</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :label="`${queryForm.type === 10 ? '商品' : '菜品'}名称`"
          prop="name"
        ></el-table-column>

        <el-table-column
          :label="`${queryForm.type === 10 ? '商品' : '菜品'}分类`"
          prop="category.name"
        >
          <template slot-scope="{ row }">
            <el-tag>{{ row.category.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="实际销量" prop="sales_actual"></el-table-column>
        <el-table-column label="开启会员折扣">
          <template slot-scope="{ row }">
            <el-tooltip
              :content="row.is_enable_grade ? '是' : '否'"
              class="item"
              effect="dark"
              placement="top-start"
            >
              <el-tag :type="row.is_enable_grade | statusFilter">
                {{ row.is_enable_grade ? "是" : "否" }}
              </el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <!-- <el-table-column label="开启积分赠送">
          <template slot-scope="{ row }">
            <el-tooltip
              :content="row.is_points_gift ? '是' : '否'"
              class="item"
              effect="dark"
              placement="top-start"
            >
              <el-tag :type="row.is_points_gift | statusFilter">
                {{ row.is_points_gift ? "是" : "否" }}
              </el-tag>
            </el-tooltip>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="允许积分抵扣" >
          <template slot-scope="{ row }">
            <el-tooltip
              :content="row.is_points_discount ? '是' : '否'"
              class="item"
              effect="dark"
              placement="top-start"
            >
              <el-tag :type="row.is_points_discount | statusFilter">
                {{ row.is_points_discount ? "是" : "否" }}
              </el-tag>
            </el-tooltip>
          </template>
        </el-table-column> -->
        <el-table-column label="是否上架">
          <template slot-scope="{ row }">
            <el-tooltip
              :content="row.is_active ? '是' : '否'"
              :enterable="false"
              placement="top"
            >
              <el-switch
                v-model="row.is_active"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="goodsActive(row)"
              ></el-switch>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template v-slot="scope">
            <el-button type="primary" @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-button type="danger" @click="handleDelete(scope.row)">
              删除
            </el-button>
            <el-button type="success" @click="handleEdit(scope.row, true)">
              复制
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="queryForm.page_index"
        :layout="layout"
        :page-size="queryForm.page_size"
        :total="total"
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>
    <div class="goods-edit-container">
      <edit
        v-show="!showList"
        ref="edit"
        :goods-type="queryForm.type"
        @cancel="cancelEdit"
        @fetchData="fetchData"
      ></edit>
    </div>
  </div>
</template>

<script>
  import { getList, getCategoryList, setActive, doDelete } from "@/api/goods";
  import Edit from "./components/GoodsEdit";
  import dayjs from "dayjs";

  export default {
    name: "GoodsIndex",
    components: { Edit },
    filters: {
      statusFilter(status) {
        return !!status ? "success" : "info";
      },
    },
    data() {
      return {
        showList: true,
        imageList: [],
        goodsList: [],
        categoryIds: [],
        categoryList: [],
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        elementLoadingText: "正在加载...",
        queryForm: {
          page_index: 1,
          page_size: 20,
          type: 10,
          name: undefined,
          category_id: undefined,
          is_active: undefined,
        },
      };
    },
    watch: {
      $route: {
        handler(route) {
          console.log(route.query);
          this.queryForm.type = (route.query && Number(route.query.type)) || 10;
        },
        immediate: true,
      },
      categoryIds(ids) {
        if (ids && ids.length) {
          this.queryForm.category_id = ids[ids.length - 1];
        }
      },
    },
    created() {
      this.fetchData();
    },
    methods: {
      handleDelete(row) {
        this.$baseConfirm(
          `你确定要删除当前${this.queryForm.type === 10 ? "商品" : "菜品"}吗`,
          null,
          async () => {
            await doDelete([row.id]);
            this.$baseMessage("删除成功", "success");
            this.fetchData();
          }
        );
      },
      async getCategorys() {
        const { data } = await getCategoryList({
          type: this.queryForm.type,
          page_size: 500,
        });
        const list = data.rows.map((item) => ({
          label: item.name,
          value: item.id,
          id: item.id,
          superior_id: item.superior_id,
        }));
        return this.conversion(list);
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
      goodsActive(row) {
        setActive({
          id: row.id,
          is_active: row.is_active ? 1 : 0,
        });
      },
      formatTime(row, column, cellValue) {
        return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
      },
      cancelEdit() {
        this.showList = true;
      },
      handleEdit(row, isCopy = false) {
        this.showList = false;
        if (row.id) {
          this.$refs["edit"].showEdit(row, isCopy);
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
      queryData() {
        this.queryForm.page_index = 1;
        this.fetchData();
      },
      async fetchData() {
        this.listLoading = true;
        console.log(this.queryForm);
        const [goodsData, categoryData] = await Promise.all([
          getList(this.queryForm),
          this.getCategorys(),
        ]);
        this.categoryList = categoryData;
        this.goodsList = goodsData.data.rows;
        this.total = goodsData.data.count;
        const imageList = [];
        this.goodsList.forEach((item) => {
          item.thumbnail && imageList.push(item.thumbnail.url);
        });
        this.imageList = imageList;
        this.listLoading = false;
      },
    },
  };
</script>
