<template>
  <el-dropdown @command="handleCommand">
    <span class="avatar-dropdown">
      <img :src="avatar" alt="" class="user-avatar" />
      <div class="user-name">
        {{ username }}
        <vab-remix-icon icon-class="arrow-down-s-line"></vab-remix-icon>
      </div>
    </span>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="logout">
        <vab-remix-icon icon-class="logout-circle-r-line"></vab-remix-icon>
        退出登录
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  import { mapGetters } from "vuex";
  import { recordRoute } from "@/config/settings";

  export default {
    name: "Avatar",
    computed: {
      ...mapGetters({
        avatar: "passport/avatar",
        username: "passport/username",
      }),
    },
    methods: {
      handleCommand(command) {
        switch (command) {
          case "logout":
            this.logout();
            break;
          case "personalCenter":
            this.personalCenter();
            break;
        }
      },
      personalCenter() {
        this.$router.push("/personalCenter/personalCenter");
      },
      async logout() {
        await this.$store.dispatch("passport/logout");
        if (recordRoute) {
          const fullPath = this.$route.fullPath;
          this.$router.push(`/login?redirect=${fullPath}`);
        } else {
          this.$router.push("/login");
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
  .avatar-dropdown {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;

    .user-avatar {
      width: 40px;
      height: 40px;
      margin-left: 15px;
      cursor: pointer;
      border-radius: 50%;
    }

    .user-name {
      position: relative;
      display: flex;
      align-content: center;
      align-items: center;
      height: 40px;
      margin-left: 6px;
      // line-height: 40px;
      cursor: pointer;

      [class*="ri-"] {
        margin-left: 0 !important;
      }
    }
  }
</style>
