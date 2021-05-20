<template>
  <div>
    <el-col
      v-for="(item, index) in iconList"
      :key="index"
      :lg="3"
      :md="3"
      :sm="6"
      :xl="3"
      :xs="12"
    >
      <el-card
        v-if="item.click && item.click === 'handleChangeTheme'"
        class="icon-panel"
        shadow="hover"
        @click.native="handleChangeTheme"
      >
        <vab-remix-icon
          :icon-class="item.icon"
          :style="{ color: item.color }"
        ></vab-remix-icon>
        <p>{{ item.title }}</p>
      </el-card>
      <el-card
        v-else-if="item.click && item.click === 'handleMore'"
        class="icon-panel"
        shadow="hover"
        @click.native="handleMore"
      >
        <vab-remix-icon
          :icon-class="item.icon"
          :style="{ color: item.color }"
        ></vab-remix-icon>
        <p>{{ item.title }}</p>
      </el-card>
      <vab-link v-else :to="item.link" target="_blank">
        <el-card class="icon-panel" shadow="hover">
          <vab-remix-icon
            :icon-class="item.icon"
            :style="{ color: item.color }"
          ></vab-remix-icon>
          <p>{{ item.title }}</p>
        </el-card>
      </vab-link>
    </el-col>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        //卡片图标
        iconList: [
          {
            click: "handleChangeTheme",
            icon: "brush-2-line",
            title: "主题配置",
            link: "",
            color: "#69c0ff",
          },
          {
            icon: "baidu-line",
            title: "百度一下",
            link:
              "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=good_luck%20meeluo&oq=%25E7%25A0%2581%25E4%25BA%2591%2520meeluo&rsv_pq=833c7ae50000f14e&rsv_t=bd263I%2FXZj6ZhFhkvolvKrUSlDRSBRval6SREIwmuFlTI7YwUIXYq72%2BBc0&rqlang=cn&rsv_enter=0&rsv_dl=tb&rsv_btype=t&inputT=9757&rsv_sug3=79&rsv_sug1=22&rsv_sug7=100&rsv_sug2=0&rsv_sug4=10773&rsv_sug=1",
            color: "#1890FF",
          },

          {
            icon: "video-line",
            title: "视频播放器",
            link: "/vab/player",
            color: "#ffc069",
          },
          {
            icon: "table-line",
            title: "表格",
            link: "/vab/table/comprehensiveTable",
            color: "#5cdbd3",
          },
          {
            icon: "code-box-line",
            title: "源码",
            link: "https://www.baidu.com",
            color: "#b37feb",
          },
          {
            click: "handleMore",
            icon: "notification-2-line",
            title: "公告",
            link: "",
            color: "#ff85c0",
          },
          {
            click: "handleMore",
            icon: "gift-line",
            title: "礼物",
            link: "",
            color: "#ffd666",
          },
          {
            click: "handleMore",
            icon: "cup-line",
            title: "休息一下",
            link: "",
            color: "#95de64",
          },
        ],
      };
    },
    methods: {
      handleChangeTheme() {
        this.$baseEventBus.$emit("theme");
      },
      handleMore() {
        this.$baseAlert("敬请期待！");
      },
    },
  };
</script>
<style lang="scss" scoped>
  .icon-panel {
    height: 120px;
    text-align: center;
    cursor: pointer;

    &:hover {
      i {
        transform: scale(1.15);
      }
    }

    i {
      display: block;
      width: 50px;
      height: 50px;
      margin: auto;
      font-size: 40px;
      transition: all ease-in-out 0.3s;
    }

    p {
      margin-top: 10px;
    }
  }
</style>
