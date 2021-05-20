/* mixin-pagination */
export const pagination = {
  data() {
    return {
      queryForm: {
        page_index: 1,
        page_size: 20,
        pageSizes: [10, 20, 50, 100, 300, 500],
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        background: true,
      },
    };
  },
  methods: {
    // pageSize 改变时会触发
    handleCurrentChange(val) {
      console.log("handleCurrentChange", val);
      this.queryForm.page_index = val;
      this.fetchData();
    },
    // currentPage 改变时会触发
    handleSizeChange(val) {
      console.log("handleSizeChange", val);
      this.queryForm.page_index = 1;
      this.queryForm.page_size = val;
      this.fetchData();
    },
  },
};
