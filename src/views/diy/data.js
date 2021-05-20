export const defaultData = {
  banner: {
    name: "图片轮播",
    type: "banner",
    params: {
      interval: 2800,
    },
    style: {
      borderRadius: 4,
      height: 182,
      paddingTop: 6,
      paddingLeft: 16,
      background: "#ffffff",
    },
    data: [
      {
        imgUrl: "https://assets.meeluo.com/upload_default_image.png",
        // imgUrl: require(`@/assets/diy/upload_default_image.png`),
        linkUrl: "",
      },
      {
        imgUrl: "https://assets.meeluo.com/upload_default_image.png",
        // imgUrl: require(`@/assets/diy/upload_default_image.png`),
        linkUrl: "",
      },
    ],
  },
  imageSingle: {
    name: "单图组",
    type: "imageSingle",
    style: {
      borderRadius: 0,
      paddingTop: 0,
      paddingLeft: 0,
      background: "#ffffff",
    },
    data: [
      {
        imgUrl: "https://assets.meeluo.com/upload_default_image.png",
        linkUrl: "",
        mpAccount: "",
        mpPath: "",
      },
    ],
  },
  menuOrderButton: {
    name: "点餐按钮",
    type: "imageSingle",
    style: {
      borderRadius: 0,
      paddingTop: 0,
      paddingLeft: 16,
      background: "#ffffff",
    },
    data: [
      {
        imgUrl: "https://assets.meeluo.com/3388045433126912/679092649.png",
        linkUrl: "pages/restaurant/menu/index",
      },
    ],
  },
  window: {
    name: "图片橱窗",
    type: "window",
    style: {
      borderRadius: 0,
      paddingTop: 0,
      paddingLeft: 0,
      marginTop: 0,
      marginLeft: 0,
      background: "#ffffff",
      layout: "2",
    },
    data: [
      {
        imgUrl: "https://assets.meeluo.com/diy_window_01.jpg",
        // imgUrl: require(`@/assets/diy/diy_window_01.jpg`),
        linkUrl: "",
      },
      {
        imgUrl: "https://assets.meeluo.com/diy_window_02.jpg",
        // imgUrl: require(`@/assets/diy/diy_window_02.jpg`),
        linkUrl: "",
      },
      {
        imgUrl: "https://assets.meeluo.com/diy_window_03.jpg",
        // imgUrl: require(`@/assets/diy/diy_window_03.jpg`),
        linkUrl: "",
      },
      {
        imgUrl: "https://assets.meeluo.com/diy_window_04.jpg",
        // imgUrl: require(`@/assets/diy/diy_window_04.jpg`),
        linkUrl: "",
      },
    ],
  },
  video: {
    name: "视频组",
    type: "video",
    params: {
      id: null,
      url:
        "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400",
      poster: "https://assets.meeluo.com/diy_window_01.jpg",
      // poster: require(`@/assets/diy/video_poster.png`),
      autoplay: false,
      videoInit: true,
      volume: 1,
      pip: false,
    },
    style: {
      background: "#ffffff",
      paddingTop: 0,
      paddingLeft: 0,
    },
  },
  blank: {
    name: "辅助空白",
    type: "blank",
    style: {
      height: 20,
      background: "#ffffff",
    },
  },
  guide: {
    name: "辅助线",
    type: "guide",
    style: {
      background: "#ffffff",
      lineStyle: "solid",
      lineHeight: 1,
      lineColor: "#000000",
      paddingTop: 10,
      paddingLeft: 0,
    },
  },
  richText: {
    name: "富文本",
    type: "richText",
    params: {
      content: "<p>这里是文本的内容</p>",
    },
    style: {
      paddingTop: 0,
      paddingLeft: 0,
      background: "#ffffff",
    },
  },
  titleLink: {
    name: "标题链接",
    type: "titleLink",
    params: {
      layout: ["left", "right"],
    },
    style: {
      paddingLeft: 16,
      height: 26,
      lineHeight: 24,
      background: "#ffffff",
      backgroundImage: "",
      backgroundWidth: 209,
      backgroundHeight: 20,
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
    },
    data: [
      {
        icon: "https://assets.meeluo.com/title-2.svg",
        text: "游戏奖品免费拿！",
        size: 15,
        color: "#333",
        link: "",
      },
      {
        icon: "",
        text: "让我康康 ›",
        size: 12,
        color: "#333333",
        link: "",
      },
    ],
  },
  notice: {
    name: "公告组",
    type: "notice",
    params: {
      newsMessage: true,
      icon: "https://assets.meeluo.com/notice.svg",
    },
    style: {
      paddingLeft: 14,
      paddingTop: 4,
      height: 28,
      background: "#f7f7f7",
      color: "#555555",
      fontSize: 12,
      borderRadius: 30,
    },
    data: [
      {
        text: "“Lee” 在游戏挑战中获得“3折优惠券”！",
        link: "",
      },
      {
        text: "“学代代码救不了中国人” 在游戏挑战中获得“1.5升可乐一瓶”！",
        link: "",
      },
      {
        text: "“莫逆” 在游戏挑战中获得“海绵宝宝公仔”！",
        link: "",
      },
    ],
  },
  navBar: {
    name: "导航组",
    type: "navBar",
    params: {
      rowsNum: "5",
    },
    style: {
      paddingLeft: 2,
      paddingTop: 4,
      background: "#ffffff",
      fontSize: 13,
      imageSize: 46,
    },
    data: [
      {
        text: "导航文字1",
        color: "#333",
        imgUrl: "https://assets.meeluo.com/diy_navbar_01.png",
        // imgUrl: require(`@/assets/diy/diy_navbar_01.png`),
        link: "",
      },
      {
        text: "导航文字2",
        color: "#333",
        imgUrl: "https://assets.meeluo.com/diy_navbar_01.png",
        // imgUrl: require(`@/assets/diy/diy_navbar_01.png`),
        link: "",
      },
      {
        text: "导航文字3",
        color: "#333",
        imgUrl: "https://assets.meeluo.com/diy_navbar_01.png",
        // imgUrl: require(`@/assets/diy/diy_navbar_01.png`),
        link: "",
      },
      {
        text: "导航文字4",
        color: "#333",
        imgUrl: "https://assets.meeluo.com/diy_navbar_01.png",
        // imgUrl: require(`@/assets/diy/diy_navbar_01.png`),
        link: "",
      },
      {
        text: "导航文字5",
        color: "#000",
        imgUrl: "https://assets.meeluo.com/diy_navbar_01.png",
        // imgUrl: require(`@/assets/diy/diy_navbar_01.png`),
        link: "",
      },
    ],
  },
  game: {
    name: "游戏组",
    type: "game",
    style: {
      imgBorderRadius: 10,
      borderRadius: 8,
      paddingLeft: 0,
      paddingTop: 11,
      marginLeft: 16,
      marginTop: 6,
      borderColor: "#e8e8e8",
      borderSize: 1,
      background: "#ffffff",
      buttonImgUrl: "https://assets.meeluo.com/5d52cbd9b2713.png",
      titleFontSize: 14,
      titleFontColor: "#333",
      descFontSize: 12,
      descFontColor: "#666",
      peopleFontSize: 12,
      peopleFontColor: "#0a91ff",
    },
    data: [
      // {
      //   gameId: null,
      // }
    ],
  },
  goods: {
    name: "商品组",
    type: "goods",
    params: {
      column: 2,
    },
    style: {
      paddingLeft: 6,
      paddingTop: 6,
      marginLeft: 12,
      marginTop: 6,
      background: "#f5f5f5",
      borderRadius: 5,
      titleFontSize: 14,
      titleFontColor: "#333333",
      linePriceFontSize: 12,
      linePriceFontColor: "#acacac",
      priceFontSize: 14,
      priceFontColor: "#f7631b",
      descFontSize: 12,
      descFontColor: "#999999",
      salesFontSize: 13,
      salesFontColor: "#acacac",
      columnSpacing: 6,
    },
    data: [
      // {
      //   goodsId: null,
      // }
    ],
  },
  singleGame: {
    name: "推荐游戏",
    type: "singleGame",
    style: {
      background: "#fff",
      buttonBackground: "#0088ff",
      buttonColor: "#ffffff",
      buttonFontSize: 14,
      buttonRadius: 24,
      buttonText: "开始",
      descFontColor: "#828282",
      descFontSize: 12,
      imgBorderRadius: 4,
      logoBorderRadius: 8,
      marginLeft: 16,
      marginTop: 4,
      peopleFontColor: "#0088ff",
      peopleFontSize: 12,
      titleFontColor: "#333333",
      titleFontSize: 14,
    },
    data: {
      gameId: null,
    }, // { gameId: null }
  },
  gameGoodsPrize: {
    name: "商品奖品",
    type: "gameGoodsPrize",
    params: {
      column: 2,
    },
    style: {
      buttonText: "去挑战",
      buttonBackground: "#0a91ff",
      buttonColor: "#fff",
      buttonRadius: 20,
      buttonFontSize: 12,
      paddingLeft: 6,
      paddingTop: 6,
      marginLeft: 16,
      marginTop: 12,
      background: "#f7f7f7",
      borderRadius: 6,
      titleFontSize: 13,
      titleFontColor: "#333",
      linePriceFontSize: 12,
      linePriceFontColor: "#666666",
      priceFontSize: 13,
      priceFontColor: "#f7631b",
      columnSpacing: 8,
    },
    data: [
      // {
      //   gameId: null,
      //   couponId: null,
      //   type: "coupon", // coupon/goods
      //   goodsId: null,
      // }
    ],
  },
};

export const diyData = {
  page: {
    type: "page",
    name: "页面设置",
    params: {
      name: "页面名称",
      title: "页面标题",
      share_title: "分享标题",
    },
    style: {
      titleTextColor: "dark",
      titleBackgroundColor: "#ffffff",
      globalBackground: "#ffffff",
    },
  },
  items: [],
};
