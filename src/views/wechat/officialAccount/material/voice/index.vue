<template>
  <MaterialList type="3" :title="title" :columns="columns"></MaterialList>
</template>

<script>
  import MaterialList from "@/views/wechat/officialAccount/components/MaterialList";
  export default {
    name: "MaterialVoice",
    components: {
      MaterialList,
    },
    data() {
      return {
        type: 3,
        title: "语音素材",
        columns: [
          // {
          //   prop: "id",
          //   label: "素材ID",
          //   type: "text",
          //   minWidth: 100,
          // },
          {
            prop: "media_id",
            label: "MEDIA_ID",
            type: "text",
            minWidth: 100,
          },
          // {
          //   prop: "img",
          //   label: "素材预览",
          //   type: "img",
          //   minWidth: 100,
          // },
          {
            prop: "name",
            label: "素材名称",
            type: "text",
            minWidth: 100,
          },
          {
            prop: "created_at",
            label: "添加时间",
            type: "date",
            minWidth: 160,
            format: "YYYY-MM-DD HH:mm:ss",
          },
        ],
      };
    },
  };
</script>
