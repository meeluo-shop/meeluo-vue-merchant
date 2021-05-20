/**
 * @author knows 1002563923@qq.com
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，pro版只支持remixIcon图标
 * hidden:true                    是否显示在菜单中显示路由（默认值：false）
 * alwaysShow:true                当只有一级子路由时是否显示父路由是否显示在菜单中显示路由（默认值：false）
 * name:"Demo"                    首字母大写，一定要与vue文件的name对应起来，用于noKeepAlive缓存控制（该项特别重要）
 * meta:{
    title:"title"                 菜单、面包屑、多标签页显示的名称
    roles:["admin","..."]   当config/settings.js中rolesControl配置开启时，用于控制角色
    remixIcon:""                  remix图标
    noKeepAlive:true              当前路由是否不缓存（默认值：false）
    affix:true                    当前路由是否固定多标签页
    badge:"New"                   badge小标签（只支持子级）
    tagHidden:true                当前路由是否不显示多标签页
  }
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layouts";
import BlankLayout from "@/layouts/BlankLayout";
import { publicPath, routerMode } from "@/config/settings";
import weChatRouter from "./weChatRouter"; // 微信菜单

Vue.use(VueRouter);
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login"),
    hidden: true,
  },
  {
    path: "/403",
    name: "403",
    component: () => import("@/views/403"),
    hidden: true,
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404"),
    hidden: true,
  },
];

export const asyncRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    meta: {
      title: "首页",
      remixIcon: "home-4-line",
      affix: true,
    },
    children: [
      {
        path: "index",
        name: "Index",
        component: () => import("@/views/index"),
        meta: {
          title: "首页",
          remixIcon: "home-4-line",
          affix: true,
        },
      },
      {
        path: "/icon",
        name: "Icon",
        component: () => import("@/views/icon"),
        hidden: true,
        meta: {
          title: "图标列表",
        },
      },
    ],
  },
  {
    path: "/store",
    name: "Store",
    component: Layout,
    redirect: "/store/index",
    alwaysShow: true,
    meta: {
      title: "门店",
      remixIcon: "store-2-line",
    },
    children: [
      {
        path: "index",
        name: "StoreIndex",
        component: () => import("@/views/store/index"),
        meta: {
          title: "门店设置",
          remixIcon: "settings-2-line",
        },
      },
      {
        path: "staff",
        name: "StoreStaff",
        component: () => import("@/views/store/staff"),
        meta: {
          title: "员工管理",
          remixIcon: "user-star-line",
        },
      },
      {
        path: "attendant",
        name: "StoreAttendant",
        component: () => import("@/views/store/attendant"),
        meta: {
          title: "客服设置",
          remixIcon: "customer-service-2-line",
        },
      },
    ],
  },
  {
    path: "/user",
    name: "User",
    component: Layout,
    redirect: "/user/index",
    alwaysShow: true,
    meta: {
      title: "用户",
      remixIcon: "user-5-line",
    },
    children: [
      {
        path: "index",
        name: "UserIndex",
        component: () => import("@/views/user/index"),
        meta: {
          title: "用户列表",
          remixIcon: "user-line",
        },
      },
      {
        path: "grade",
        name: "UserGrade",
        component: () => import("@/views/user/grade"),
        meta: {
          title: "会员等级",
          remixIcon: "vip-crown-line",
        },
      },
    ],
  },
  {
    path: "/transaction",
    name: "Transaction",
    component: Layout,
    redirect: "/transaction/recharge/",
    alwaysShow: true,
    meta: {
      title: "财务",
      remixIcon: "money-cny-box-line",
    },
    children: [
      {
        path: "recharge",
        name: "TransactionRecharge",
        redirect: "/transaction/recharge/plan",
        component: () => import("@/views/transaction/recharge"),
        meta: {
          title: "充值管理",
          remixIcon: "money-cny-circle-line",
        },
        children: [
          {
            path: "plan",
            name: "TransactionRechargePlan",
            component: () => import("@/views/transaction/recharge/plan"),
            meta: {
              title: "充值套餐",
              remixIcon: "book-2-line",
            },
          },
          {
            path: "setting",
            name: "TransactionRechargeSetting",
            component: () => import("@/views/transaction/recharge/setting"),
            meta: {
              title: "充值设置",
              remixIcon: "settings-2-line",
            },
          },
        ],
      },
      {
        path: "points",
        name: "TransactionPoints",
        redirect: "/transaction/points/setting",
        component: () => import("@/views/transaction/points"),
        meta: {
          title: "积分管理",
          remixIcon: "copper-coin-line",
        },
        children: [
          {
            path: "setting",
            name: "TransactionPointsSetting",
            component: () => import("@/views/transaction/points/setting"),
            meta: {
              title: "积分设置",
              remixIcon: "copper-diamond-line",
            },
          },
          {
            path: "detail",
            name: "TransactionPointsDetail",
            component: () => import("@/views/transaction/points/log"),
            meta: {
              title: "积分明细",
              remixIcon: "layout-masonry-line",
            },
          },
        ],
      },
      {
        path: "balanceLog",
        name: "BalanceLog",
        component: () => import("@/views/transaction/balanceLog"),
        meta: {
          title: "交易明细",
          remixIcon: "currency-line",
        },
      },
    ],
  },
  {
    path: "/shop",
    name: "Shop",
    component: Layout,
    redirect: "/shop/goods/index",
    alwaysShow: true,
    meta: {
      title: "商城",
      remixIcon: "building-line",
    },
    children: [
      // {
      //   path: "address",
      //   name: "GoodsAddress",
      //   component: () => import("@/views/address"),
      //   meta: {
      //     title: "退货地址",
      //     remixIcon: "map-pin-4-line",
      //   },
      // },
      {
        path: "/goods",
        name: "Goods",
        // component: Layout,
        redirect: "/goods/index",
        component: () => import("@/views/transaction/recharge"),
        alwaysShow: true,
        meta: {
          title: "商品管理",
          remixIcon: "shopping-bag-line",
        },
        children: [
          {
            path: "index",
            name: "GoodsIndex",
            component: () => import("@/views/goods/index"),
            meta: {
              title: "商品列表",
              remixIcon: "shopping-bag-2-line",
            },
          },
          {
            path: "category",
            name: "GoodsCategory",
            component: () => import("@/views/goods/category"),
            meta: {
              title: "商品分类",
              remixIcon: "creative-commons-nd-line",
            },
          },
        ],
      },
      {
        path: "/mallorder",
        name: "Mallorder",
        // component: Layout,
        redirect: "/mallorder/allList",
        component: () => import("@/views/transaction/recharge"),
        alwaysShow: true,
        meta: {
          title: "订单管理",
          remixIcon: "list-ordered",
        },
        children: [
          {
            path: "allList",
            name: "AllList",
            component: () => import("@/views/mallorders"),
            meta: {
              title: "商品订单",
              remixIcon: "order-play-fill",
            },
          },
          // {
          //   path: "afterSaleList",
          //   name: "afterSaleList",
          //   component: () => import("@/views/mallorders"),
          //   meta: {
          //     title: "售后订单",
          //     remixIcon: "customer-service-2-line",
          //   },
          // },
          {
            path: "orderSetting",
            name: "orderSetting",
            component: () => import("@/views/mallorders/orderSetting"),
            meta: {
              title: "流程设置",
              remixIcon: "list-settings-fill",
            },
          },
        ],
      },
      {
        path: "delivery",
        name: "Delivery",
        redirect: "/goods/delivery/index",
        component: () => import("@/views/transaction/recharge"),
        meta: {
          title: "运费管理 ",
          remixIcon: "anchor-line",
        },
        children: [
          {
            path: "index",
            name: "GoodsDeliveryIndex",
            component: () => import("@/views/delivery/index"),
            meta: {
              title: "运费模板",
              remixIcon: "aspect-ratio-line",
            },
          },
          {
            path: "setting",
            name: "GoodsDeliverySetting",
            component: () => import("@/views/delivery/setting"),
            meta: {
              title: "运费设置",
              remixIcon: "settings-6-line",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/restaurant",
    name: "Restaurant",
    component: Layout,
    redirect: "/restaurant/food/index",
    alwaysShow: true,
    meta: {
      title: "餐厅",
      remixIcon: "store-3-line",
    },
    children: [
      // {
      //   path: "address",
      //   name: "GoodsAddress",
      //   component: () => import("@/views/address"),
      //   meta: {
      //     title: "退货地址",
      //     remixIcon: "map-pin-4-line",
      //   },
      // },
      {
        path: "/food",
        name: "Food",
        // component: Layout,
        redirect: "/food/index",
        component: () => import("@/views/transaction/recharge"),
        alwaysShow: true,
        meta: {
          title: "菜品管理",
          remixIcon: "cup-line",
        },
        children: [
          {
            path: "index",
            name: "FoodIndex",
            query: { type: 20 },
            component: () => import("@/views/goods/index"),
            meta: {
              title: "菜品列表",
              remixIcon: "cake-3-line",
            },
          },
          {
            path: "category",
            name: "GoodsCategory",
            query: { type: 20 },
            component: () => import("@/views/goods/category"),
            meta: {
              title: "菜品分类",
              remixIcon: "menu-add-line",
            },
          },
        ],
      },
      {
        path: "table",
        name: "Table",
        component: () => import("@/views/table"),
        meta: {
          title: "餐桌管理",
          remixIcon: "table-2",
        },
      },
      {
        path: "orderFood",
        name: "orderFood",
        component: () => import("@/views/orderFood"),
        meta: {
          title: "前台点餐",
          remixIcon: "restaurant-line",
        },
      },
      {
        path: "/menuorder",
        name: "Menuorder",
        // component: Layout,
        redirect: "/menuorder/allList",
        component: () => import("@/views/transaction/recharge"),
        alwaysShow: true,
        meta: {
          title: "订单管理",
          remixIcon: "list-ordered",
        },
        children: [
          {
            path: "allList",
            name: "AllList",
            component: () => import("@/views/menuorders"),
            meta: {
              title: "点餐订单",
              remixIcon: "order-play-fill",
            },
          },
          {
            path: "orderSetting",
            name: "orderSetting",
            component: () => import("@/views/menuorders/orderSetting"),
            meta: {
              title: "流程设置",
              remixIcon: "list-settings-fill",
            },
          },
        ],
      },
      {
        path: "/device",
        name: "Device",
        // component: Layout,
        redirect: "/device/printer",
        component: () => import("@/views/transaction/recharge"),
        alwaysShow: true,
        meta: {
          title: "设备管理",
          remixIcon: "base-station-line",
        },
        children: [
          {
            path: "device/printer",
            name: "DevicePrinter",
            component: () => import("@/views/device/printer"),
            meta: {
              title: "打印机",
              remixIcon: "printer-line",
            },
          },
        ],
      },
      {
        path: "payTypeSetting",
        name: "MenuPayTypeSetting",
        component: () => import("@/views/menuorders/paySetting"),
        meta: {
          title: "支付方式",
          remixIcon: "paypal-line",
        },
      },
    ],
  },
  {
    path: "/game",
    name: "Game",
    component: Layout,
    redirect: "/game/list",
    alwaysShow: true,
    meta: {
      title: "游戏",
      remixIcon: "gamepad-line",
    },
    children: [
      {
        path: "list",
        name: "GameList",
        component: () => import("@/views/game/list"),
        meta: {
          title: "游戏大厅",
          remixIcon: "list-check-2",
        },
      },
      {
        path: "activity",
        name: "GameActivity",
        redirect: "/activity/list",
        component: () => import("@/views/transaction/recharge"),
        alwaysShow: true,
        meta: {
          title: "游戏活动",
          remixIcon: "game-line",
        },
        children: [
          {
            path: "list",
            name: "GameActivityList",
            component: () => import("@/views/game/activity"),
            meta: {
              title: "活动列表",
              remixIcon: "android-line",
            },
          },
          {
            path: "winning",
            name: "WinningRecords",
            component: () => import("@/views/game/winning"),
            meta: {
              title: "获奖记录",
              remixIcon: "gift-line",
            },
          },
          {
            path: "order",
            name: "GameOrderList",
            component: () => import("@/views/game/order"),
            meta: {
              title: "游戏订单",
              remixIcon: "file-list-line",
            },
          },
          {
            path: "setting",
            name: "GamePrizeSetting",
            component: () => import("@/views/game/setting"),
            meta: {
              title: "活动设置",
              remixIcon: "settings-6-line",
            },
          },
          {
            path: "invite",
            name: "GameInviteList",
            component: () => import("@/views/game/invite"),
            meta: {
              title: "邀请记录",
              remixIcon: "share-line",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/marketing",
    name: "Marketing",
    component: Layout,
    redirect: "/marketing/coupon/index",
    alwaysShow: true,
    meta: {
      title: "营销",
      remixIcon: "space-ship-line",
    },
    children: [
      {
        path: "/coupon",
        name: "Coupon",
        alwaysShow: true,
        redirect: "/coupon/index",
        component: () => import("@/views/transaction/recharge"),
        meta: {
          title: "优惠券",
          remixIcon: "coupon-3-line",
        },
        children: [
          {
            path: "index",
            name: "CouponIndex",
            component: () => import("@/views/coupon/index"),
            meta: {
              title: "优惠券列表",
              remixIcon: "coupon-2-line",
            },
          },
          {
            path: "receive",
            name: "CouponReceive",
            component: () => import("@/views/coupon/receive"),
            meta: {
              title: "领取记录",
              remixIcon: "coupon-5-line",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/design",
    name: "Design",
    component: Layout,
    redirect: "/design/page",
    alwaysShow: true,
    meta: {
      title: "设计",
      remixIcon: "layout-2-line",
    },
    children: [
      {
        path: "page",
        name: "DesignPage",
        component: () => import("@/views/design/page"),
        meta: {
          title: "页面装修",
          remixIcon: "layout-5-line",
        },
      },
      {
        path: "/page/diy",
        name: "PageDiy",
        component: () => import("@/views/diy"),
        hidden: true,
        meta: {
          title: "页面装修",
          remixIcon: "layout-5-line",
        },
      },
      {
        path: "/page/link",
        name: "PageLink",
        component: () => import("@/views/page/link"),
        meta: {
          title: "页面链接",
          remixIcon: "link",
        },
      },
      {
        path: "/page/variable",
        name: "PageVariable",
        component: () => import("@/views/page/variable"),
        meta: {
          title: "页面变量",
          remixIcon: "magic-line",
        },
      },
    ],
  },
  weChatRouter,
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

export function resetRouter() {
  store.commit("routes/resetIsInitRouter"); // 清除掉路由判断标志
  router.matcher = new VueRouter({
    base: publicPath,
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher;
}

export default router;
