<template>
  <el-table
    ref="table"
    v-loading="loading"
    :data="tableData"
    :row-key="selectProps.id"
    type="selection"
    @row-click="rowClick"
    @selection-change="selectionChange"
    @select="selectTableCheck"
    @header-dragend="headerDragend"
  >
    <el-table-column
      v-if="isSelect"
      type="selection"
      width="55"
      :selectable="selectable"
    />
    <el-table-column
      v-for="item in columns"
      :key="item[prop.prop]"
      :column-key="item[prop.prop]"
      :label="item[prop.label]"
      :fixed="item[prop.fixed]"
      :min-width="item[prop.minWidth] || 'auto'"
      :align="item[prop.align] || 'center'"
      :show-overflow-tooltip="item[prop.showTooltip]"
    >
      <template slot-scope="scope">
        <span
          v-if="item[prop.type] === 'text'"
          :title="item[prop.showTooltip] ? '' : scope.row[item[prop.prop]]"
        >
          {{ scope.row[item[prop.prop]] || "" }}
        </span>

        <el-tag
          v-for="tag in scope.row[item[prop.prop]]"
          v-else-if="item[prop.type] === 'tag'"
          :key="tag.id"
        >
          {{ tag.reason }}
        </el-tag>
        <span v-else-if="item[prop.type] === 'date'">
          {{
            dayjs(scope.row[item[prop.prop]]).format(
              item.format || "YYYY-MM-DD"
            )
          }}
        </span>
        <div v-else-if="item[prop.type] === 'img'" class="img-wrap">
          <el-image
            v-if="deepGet(scope.row, item[prop.prop])"
            :style="`
            width: 90px;
            height: 90px;
            margin-right: 10px;
            vertical-align: bottom;
            border-radius: 3px;
            border: 1px solid #dcdfe5;
          `"
            class="upload-box"
            :src="deepGet(scope.row, item[prop.prop])"
            :preview-src-list="[deepGet(scope.row, item[prop.prop])]"
          ></el-image>
          <el-tag v-else type="info">无</el-tag>
        </div>
      </template>
    </el-table-column>

    <el-table-column
      v-if="operate.visible"
      :label="operate.label || '操作'"
      align="center"
      :min-width="operate.minWidth"
      fixed="right"
    >
      <template slot-scope="scope">
        <slot :row="scope.row" />
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  import dayjs from "dayjs";
  export default {
    name: "Table",
    props: {
      // table数组
      data: {
        type: Array,
        required: true,
        default: () => [],
      },
      // table 表头数组
      headData: {
        type: Array,
        required: true,
        default: () => [],
      },
      // table 操作按钮
      operations: {
        type: Array,
        default: () => [],
      },
      // 是否多选
      isSelect: {
        type: Boolean,
        default: false,
      },
      // 是否合并行
      isConcat: {
        type: Boolean,
        default: false,
      },
      // 是否合并行
      concatType: {
        type: [Number, String],
        default: "1",
      },
      // 是否编辑
      isChange: {
        type: Boolean,
        default: false,
      },
      // 是否编辑
      loading: {
        type: Boolean,
        default: false,
      },
      // 操作
      operate: {
        type: Object,
        default: () => ({
          label: "操作",
          minWidth: 100,
          visible: false,
        }),
      },
      // 操作
      prop: {
        type: Object,
        default: () => ({
          label: "label",
          required: "required",
          minWidth: "minWidth",
          showTooltip: "showTooltip",
          filterData: "filterData",
          prop: "prop",
          fixed: "fixed",
          type: "type",
          align: "align",
          max: "max",
          min: "min",
          sortable: "sortable",
        }),
      },
      // 表格唯一id
      selectProps: {
        type: Object,
        default: () => ({
          id: "id",
        }),
      },
      // 选中table数组
      selectListData: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        dayjs,
        tableData: this.data,
        columns: this.headData,
        selectData: this.selectListData,
        default_err_img: require("@/assets/index_images/image.jpg"),
      };
    },
    watch: {
      // data: {
      //   handler(val) {
      //     console.log("val");
      //     this.tableData = val;
      //     this.$nextTick(() => {
      //       this.$refs.table && this.$refs.table.doLayout();
      //     });
      //   },
      //   immediate: true,
      //   deep: true,
      // },
      data(val) {
        this.tableData = val;
        this.$nextTick(() => {
          this.$refs.table && this.$refs.table.doLayout();
        });
      },
      selectListData: {
        handler(val) {
          this.selectData = val;
        },
        immediate: true,
        deep: true,
      },
      headData: {
        handler(val) {
          this.columns = val;
        },
        immediate: true,
        deep: true,
      },
    },
    mounted() {},
    methods: {
      deepGet(object, path, defaultValue) {
        return (
          (!Array.isArray(path)
            ? path.replace(/\[/g, ".").replace(/\]/g, "").split(".")
            : path
          ).reduce((o, k) => (o || {})[k], object) || defaultValue
        );
      },
      toTop() {
        if (this.$refs.table) {
          this.$refs.table.bodyWrapper.scrollTop = 0;
        }
      },
      headerDragend() {
        this.$nextTick(() => {
          this.$refs.table && this.$refs.table.doLayout();
        });
      },
      selectable(row, index) {
        let status = true;
        this.$emit("selectable", row, index, (data) => {
          status = data;
        });
        return status;
      },
      selectTableCheck(selection, row) {
        this.$emit("select", selection, row);
      },
      selectionChange(selection) {
        this.$emit("selectionChange", selection);
      },
      rowClick(val) {
        this.$emit("row-click", val);
      },
    },
  };
</script>
