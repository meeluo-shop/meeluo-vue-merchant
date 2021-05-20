import Layout from "@/layouts";
export default {
  path: "/wechat",
  name: "Wechat",
  component: Layout,
  redirect: "/wechat/officialAccount",
  alwaysShow: true,
  meta: {
    title: "微信",
    remixIcon: "wechat-2-line",
  },
  children: [
    {
      path: "/officialAccount",
      name: "OfficialAccount",
      redirect: "/OfficialAccount/setting",
      component: () => import("@/views/wechat/officialAccount"),
      meta: {
        title: "微信公众号",
        remixIcon: "wechat-line",
        noKeepAlive: true,
      },
      children: [
        {
          path: "/officialAccount/setting",
          name: "OfficialAccountSetting",
          component: () => import("@/views/wechat/officialAccount/setting"),
          meta: {
            title: "账号设置",
            remixIcon: "settings-6-line",
            noKeepAlive: true,
          },
        },
        {
          path: "/officialAccount/message",
          name: "OfficialAccountMessage",
          component: () => import("@/views/wechat/officialAccount/message"),
          meta: {
            title: "模板消息",
            remixIcon: "message-2-line",
            noKeepAlive: true,
          },
        },
        {
          path: "/officialAccount/menus",
          name: "OfficialAccountMenus",
          component: () => import("@/views/wechat/officialAccount/menus"),
          meta: {
            title: "菜单设置",
            remixIcon: "menu-add-fill",
            noKeepAlive: true,
          },
        },
        {
          path: "/officialAccount/reply",
          name: "OfficialAccountReply",
          redirect: "/OfficialAccount/reply/keyword",
          component: () => import("@/views/wechat/officialAccount/reply"),
          meta: {
            title: "智能回复",
            remixIcon: "reply-line",
            noKeepAlive: true,
          },
          children: [
            {
              path: "/officialAccount/reply/keyword",
              name: "ReplyKeyword",
              component: () =>
                import("@/views/wechat/officialAccount/reply/keyword"),
              meta: {
                title: "关键字回复",
                remixIcon: "text", // TODO icon未改
                noKeepAlive: true,
              },
            },
            {
              path: "/officialAccount/reply/subscribe",
              name: "ReplySubscribe",
              component: () =>
                import("@/views/wechat/officialAccount/reply/subscribe"),
              meta: {
                title: "被关注回复",
                remixIcon: "chat-follow-up-line", // TODO icon未改
                noKeepAlive: true,
              },
            },
            {
              path: "/officialAccount/reply/scancode",
              name: "ReplyScanCode",
              component: () =>
                import("@/views/wechat/officialAccount/reply/scanCode"),
              meta: {
                title: "被扫码回复",
                remixIcon: "chat-voice-line", // TODO icon未改
                noKeepAlive: true,
              },
            },
            {
              path: "add/:type",
              name: "ReplyAdd",
              component: () =>
                import("@/views/wechat/officialAccount/reply/components/edit"),
              hidden: true,
              meta: {
                title: "新增回复",
                tagHidden: true,
                noKeepAlive: true,
              },
            },
            {
              path: "edit/:type/:id",
              name: "ReplyEdit",
              component: () =>
                import("@/views/wechat/officialAccount/reply/components/edit"),
              hidden: true,
              meta: {
                title: "编辑回复",
                tagHidden: true,
                noKeepAlive: true,
              },
            },
          ],
        },
        // {
        //   path: "/officialAccount/send",
        //   name: "OfficialAccountSend",
        //   component: () => import("@/views/wechat/officialAccount/send"),
        //   redirect: "/officialAccount/send/message",
        //   // alwaysShow: true,
        //   meta: {
        //     title: "群发消息",
        //     remixIcon: "message-line",
        //   },
        //   children: [
        //     {
        //       path: "message",
        //       name: "SendMessage",
        //       component: () =>
        //         import("@/views/wechat/officialAccount/send/message"),
        //       meta: {
        //         title: "群发消息",
        //         remixIcon: "message-line", // TODO icon未改
        //         noKeepAlive: true,
        //         // alwaysShow: true,
        //       },
        //     },
        //     {
        //       path: "add/:type/:mode",
        //       name: "MaterialEdit",
        //       component: () =>
        //         import(
        //           "@/views/wechat/officialAccount/components/EditMaterial"
        //         ),
        //       hidden: true,
        //       meta: {
        //         title: "新增群发消息",
        //         remixIcon: "message-2-line", // TODO icon未改
        //         tagHidden: true,
        //         noKeepAlive: true,
        //       },
        //     },
        //     {
        //       path: "edit/:type/:mode",
        //       name: "MaterialEdit",
        //       component: () =>
        //         import(
        //           "@/views/wechat/officialAccount/material/components/EditMaterial"
        //         ),
        //       hidden: true,
        //       meta: {
        //         title: "编辑群发消息",
        //         remixIcon: "message-2-line", // TODO icon未改
        //         tagHidden: true,
        //         noKeepAlive: true,
        //       },
        //     },
        //   ],
        // },
        {
          path: "/officialAccount/material",
          name: "OfficailAccountMaterial",
          redirect: "/officialAccount/material/imageTxt",
          component: () => import("@/views/wechat/officialAccount/material"),
          alwaysShow: true,
          meta: {
            title: "素材管理",
            remixIcon: "book-read-line", // TODO icon未改
            noKeepAlive: true,
          },
          children: [
            {
              path: "imageTxt",
              name: "MaterialImageTxt",
              component: () =>
                import("@/views/wechat/officialAccount/material/imageTxt"),
              meta: {
                title: "图文素材",
                remixIcon: "file-text-line", // TODO icon未改
                noKeepAlive: true,
              },
              alwaysShow: true,
              // children: [
              // {
              //   path: "edit/:type/:mode",
              //   name: "MaterialEdit",
              //   hidden: true,
              //   component: () =>
              //     import(
              //       "@/views/wechat/officialAccount/material/EditMaterial"
              //     ),
              //   // import(
              //   //   "@/views/wechat/officialAccount/material/components/EditMaterial"
              //   // ),
              //   meta: {
              //     title: "编辑图文素材",
              //     remixIcon: "message-2-line", // TODO icon未改
              //     tagHidden: true,
              //   },
              // },
              // ],
            },
            {
              path: "image",
              name: "MaterialImage",
              component: () =>
                import("@/views/wechat/officialAccount/material/image"),
              meta: {
                title: "图片素材",
                remixIcon: "image-2-line", // TODO icon未改
                noKeepAlive: true,
              },
            },
            {
              path: "voice",
              name: "MaterialVoice",
              component: () =>
                import("@/views/wechat/officialAccount/material/voice"),
              meta: {
                title: "语音素材",
                remixIcon: "chat-voice-line", // TODO icon未改
                noKeepAlive: true,
              },
            },
            {
              path: "video",
              name: "MaterialVideo",
              component: () =>
                import("@/views/wechat/officialAccount/material/video"),
              meta: {
                title: "视频素材",
                remixIcon: "video-add-line", // TODO icon未改
                noKeepAlive: true,
              },
            },
            {
              path: "add/:type",
              name: "MaterialAdd",
              component: () =>
                import(
                  "@/views/wechat/officialAccount/components/EditMaterial"
                ),
              hidden: true,
              meta: {
                title: "新增素材",
                remixIcon: "message-2-line", // TODO icon未改
                tagHidden: true,
                noKeepAlive: true,
              },
            },
            {
              path: "edit/:type/:detail_id",
              name: "MaterialEdit",
              component: () =>
                import(
                  "@/views/wechat/officialAccount/components/EditMaterial"
                ),
              hidden: true,
              meta: {
                title: "编辑素材",
                remixIcon: "message-2-line", // TODO icon未改
                tagHidden: true,
                noKeepAlive: true,
              },
            },
            // {
            //   path: "edit",
            //   name: "MaterialEdit",
            //   component: () =>
            //     import("@/views/wechat/officialAccount/material/edit"),
            //   meta: {
            //     title: "图文123素材",
            //     remixIcon: "message-2-line", // TODO icon未改
            //   },
            // },
          ],
        },
      ],
    },
    {
      path: "/wechat/pay",
      name: "WechatPay",
      component: () => import("@/views/wechat/pay"),
      meta: {
        title: "微信支付",
        remixIcon: "wechat-pay-line",
        noKeepAlive: true,
      },
    },
  ],
};
