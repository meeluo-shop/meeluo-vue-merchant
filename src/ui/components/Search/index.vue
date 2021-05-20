<template>
  <span v-if="showSearch">
    <vab-remix-icon
      icon-class="search-line"
      @click="openDialog"
    ></vab-remix-icon>
    <el-dialog :visible.sync="dialogVisible" append-to-body width="40%">
      <el-form :model="queryForm" @submit.native.prevent>
        <el-form-item label-width="0">
          <vab-remix-icon icon-class="search-line"></vab-remix-icon>
          <el-autocomplete
            v-model="queryForm.searchWord"
            v-focus
            :fetch-suggestions="querySearchAsync"
            select-when-unmatched
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
      </el-form>
    </el-dialog>
  </span>
</template>
<script>
  import { mapGetters } from "vuex";

  export default {
    name: "Search",
    directives: {
      focus: {
        inserted(el) {
          el.querySelector("input").focus();
        },
      },
    },
    data() {
      return {
        dialogVisible: false,
        queryForm: {
          searchWord: "",
        },
        restaurants: [],
        state: "",
        timeout: null,
      };
    },
    computed: {
      ...mapGetters({
        showSearch: "settings/showSearch",
      }),
    },
    created() {
      this.$nextTick(() => {
        if (this.showSearch) this.loadAll();
      });
    },
    methods: {
      openDialog() {
        this.queryForm.searchWord = "";
        this.dialogVisible = true;
      },
      async loadAll() {
        // fetch data
        this.restaurants = [];
      },
      querySearchAsync(queryString, cb) {
        let restaurants = this.restaurants;
        let results = queryString
          ? restaurants.filter(this.createStateFilter(queryString))
          : restaurants;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 500);
      },
      createStateFilter(queryString) {
        return (state) => state.value.includes(queryString.toLowerCase());
      },
      handleSelect(item) {
        if (item.url) {
          window.open(item.url);
        } else {
          window.open(`https://www.baidu.com/s?wd=${item.value}`);
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
  ::v-deep {
    .el-dialog {
      &__header {
        display: none;
        border: 0 !important;
      }

      &__body {
        padding: 0;
        border: 0 !important;
      }

      .el-form-item__content {
        position: relative;

        i {
          position: absolute;
          top: 14px;
          left: $base-padding;
          z-index: $base-z-index;
        }

        .el-autocomplete {
          width: 100%;

          .el-input__inner {
            width: 100%;
            height: 60px;
            padding-left: $base-padding * 2.5;
            border: 0 !important;
          }
        }
      }
    }
  }
</style>
