<template>
  <div>
    <el-row>
      <el-col :span="24">
        <part-header>
          <span slot="title">预览游戏</span>
          <el-button slot="right" @click="cancel">返回</el-button>
        </part-header>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div
      ref="containers"
      class="Containers"
      :style="`transform:scale(${scale});
-ms-transform:scale(${scale}); 	/* IE 9 */
-moz-transform:scale(${scale}); 	/* Firefox */
-webkit-transform:scale(${scale}); /* Safari 和 Chrome */
-o-transform:scale(${scale}); 	/* Opera */`"
    >
      <div class="Conts">
        <iframe v-if="url" :src="url" />
      </div>
    </div>
  </div>
</template>
<script>
  import { setGameSession } from "@/api/game";
  export default {
    name: "GamePreview",
    props: {},
    data() {
      return {
        scale: 1,
        url: null,
      };
    },
    methods: {
      windowResize() {
        const that = this;
        window.onresize = () =>
          (() => {
            const width = document.body.clientWidth - 80;
            that.scale = width / 500 >= 1 ? 1 : width / 500;
          })();
        window.onresize();
      },
      async show(gameId, url) {
        await setGameSession(gameId);
        this.url = url;
        this.windowResize();
      },
      cancel() {
        this.url = null;
        this.$emit("cancel");
      },
    },
  };
</script>
<style lang="scss" scoped>
  .Containers {
    width: 500px;
    height: 945px;
    margin: 5px auto 5px auto;
    background: url("~@/assets/game/moble1.jpg") center top no-repeat;
    background-size: contain;
    position: relative;
    transform-origin: 0 0;
  }
  .Containers .Conts {
    width: 436px;
    height: 700px;
    overflow: hidden;
    position: absolute;
    top: 121px;
    left: 34px;
    z-index: 10;

    iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }
  }
</style>
