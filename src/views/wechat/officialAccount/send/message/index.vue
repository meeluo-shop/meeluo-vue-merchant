<template>
  <MaterialList type="5" :title="title" :columns="columns"></MaterialList>
</template>

<script>
  import MaterialList from "@/views/wechat/officialAccount/components/MaterialList";
  export default {
    name: "SendMessage",
    components: {
      MaterialList,
    },
    data() {
      return {
        title: "群发消息列表",
        columns: [
          {
            prop: "id",
            label: "消息编号",
            type: "text",
            minWidth: 100,
          },
          {
            prop: "img",
            label: "任务ID",
            type: "text",
            minWidth: 100,
          },
          {
            prop: "name",
            label: "消息标题",
            type: "text",
            minWidth: 100,
          },
          {
            prop: "name1",
            label: "消息类型",
            type: "text",
            minWidth: 100,
          },
          {
            prop: "name2",
            label: "群发状态",
            type: "text",
            minWidth: 100,
          },
          {
            prop: "name3",
            label: "群发人数",
            type: "text",
            minWidth: 100,
          },
          {
            prop: "name4",
            label: "成功人数",
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
