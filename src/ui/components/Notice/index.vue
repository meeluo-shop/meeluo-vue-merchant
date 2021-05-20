<template>
  <el-badge v-if="showNotice" :value="badge">
    <el-popover placement="bottom" trigger="hover" width="300">
      <vab-remix-icon
        slot="reference"
        icon-class="notification-line"
      ></vab-remix-icon>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="通知" name="notice">
          <div class="notice-list">
            <el-scrollbar>
              <ul>
                <li v-for="(item, index) in list" :key="index">
                  <el-avatar :size="45" :src="item.image"></el-avatar>
                  <span v-html="item.notice"></span>
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </el-tab-pane>
        <el-tab-pane label="邮件" name="email">
          <div class="notice-list">
            <el-scrollbar>
              <ul>
                <li v-for="(item, index) in list" :key="index">
                  <el-avatar :size="45" :src="item.image"></el-avatar>
                  <span>{{ item.email }}</span>
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="notice-clear" @click="handleClearNotice">
        <vab-remix-icon icon-class="close-circle-line"></vab-remix-icon>
        清空消息
      </div>
    </el-popover>
  </el-badge>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: "Notice",
    data() {
      return {
        activeName: "notice",
        badge: null,
        list: [],
      };
    },
    computed: {
      ...mapGetters({
        showNotice: "settings/showNotice",
      }),
    },
    created() {
      this.$nextTick(() => {
        if (this.showNotice) this.fetchData();
      });
    },
    methods: {
      handleClick(tab) {
        this.fetchData();
      },
      handleClearNotice() {
        this.badge = null;
        this.list = [];
        this.$baseMessage("清空消息成功", "success");
      },
      async fetchData() {
        const data = null;
        this.badge = data?.length;
        this.list = data;
      },
    },
  };
</script>

<style lang="scss" scoped>
  ::v-deep {
    .el-tabs__active-bar {
      min-width: 28px;
    }
  }

  .notice-list {
    height: 29vh;

    ul {
      padding: 0 15px 0 0;
      margin: 0;

      li {
        display: flex;
        align-items: center;
        padding: 10px 0 10px 0;

        ::v-deep {
          .el-avatar {
            flex-shrink: 0;
            height: 50px;
            border-radius: 50%;
            widows: 50px;
          }
        }

        span {
          margin-left: 10px;
        }
      }
    }
  }

  .notice-clear {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0 0 0;
    font-size: 14px;
    color: #515a6e;
    color: $base-color-blue;
    text-align: center;
    cursor: pointer;
    border-top: 1px solid #e8eaec;
    -webkit-transition: color 0.2s ease-in-out;
    transition: color 0.2s ease-in-out;

    i {
      margin-right: 3px;
    }
  }
</style>
