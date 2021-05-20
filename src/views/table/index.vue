<template>
  <div class="table-container">
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
      <el-table-column prop="name" label="餐桌/包间"></el-table-column>
      <el-table-column prop="image" label="二维码">
        <template v-slot="scope">
          <a
            href="javascript:void(0)"
            title="点击获取二维码"
            @click="showQRCode(scope.row.id)"
          >
            <el-image title="点击获取二维码" :src="defaultQRCode"></el-image>
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="people" label="容纳人数">
        <template v-slot="scope">{{ scope.row.people }}人</template>
      </el-table-column>
      <el-table-column prop="min_consume_fee" label="最低消费">
        <template v-slot="scope">{{ scope.row.min_consume_fee }}元</template>
      </el-table-column>
      <el-table-column prop="ware_fee" label="餐具费/人">
        <template v-slot="scope">{{ scope.row.ware_fee }}元</template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="scope">
          <el-tag :type="scope.row.status === 10 ? 'success' : 'danger'">
            {{ scope.row.status === 10 ? "闲" : "忙" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="order" label="排序"></el-table-column>
      <el-table-column
        prop="created_at"
        label="创建时间"
        :formatter="formatTime"
      ></el-table-column>
      <el-table-column label="操作" width="240">
        <template v-slot="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
          <el-button type="warning" @click="printQRCode(scope.row)">
            打印
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
    <edit ref="edit" @fetchData="fetchData"></edit>
  </div>
</template>

<script>
  import { getTableList, deleteTable, printTableQRCode } from "@/api/table";
  import { getTableQRCode } from "@/api/wechat";
  import { getQRCode } from "@/api/jsonp";
  import Edit from "./components/TableEdit";
  import dayjs from "dayjs";

  export default {
    name: "TablePage",
    components: { Edit },
    data() {
      return {
        list: [],
        defaultQRCode: require("@/assets/2code.png"),
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
          await deleteTable(row.id);
          this.$baseMessage("删除成功", "success");
          this.fetchData();
        });
      },
      async fetchData() {
        this.listLoading = true;
        const { data } = await getTableList(this.queryForm);
        this.list = data.rows;
        this.total = data.count;
        this.listLoading = false;
      },
      formatTime(row, column, cellValue) {
        return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
      },
      async printQRCode(row) {
        this.$baseConfirm("你确定要打印餐桌二维码", null, async () => {
          await printTableQRCode(row.id);
          this.$baseMessage("打印成功", "success");
        });
      },
      async showQRCode(id) {
        const table = this.list.find((item) => item.id === id);
        if (table.previewList && table.previewList.length) {
          window.open(table.previewList[0]);
          return;
        }
        const merchant = this.$store.getters["passport/merchant"];
        try {
          const qrcodeResp = await getTableQRCode(id);
          if (qrcodeResp.code !== 0) {
            this.$message.error(
              qrcodeResp.msg || qrcodeResp.error || "二维码获取失败"
            );
            return;
          }
          let qrcodeVal = "";
          if (qrcodeResp.data) {
            qrcodeVal = qrcodeResp.data.url;
          } else {
            this.$message.error("二维码获取失败，请先配置微信公众号");
            return;
          }
          const qrcodeUrl = await getQRCode({
            data: qrcodeVal,
            logo: merchant.logo || null,
          });
          table.previewList = [qrcodeUrl];
          window.open(table.previewList[0]);
          // loading.close();
        } catch (err) {
          console.error(err);
          // loading.close();
        }
      },
    },
  };
</script>
