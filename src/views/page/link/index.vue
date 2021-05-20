<template>
  <div class="page-link-container">
    <el-row>
      <el-col :span="24">
        <part-header>
          <span slot="title">页面链接</span>
        </part-header>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row style="padding-top: 10px">
      <ul>
        <li class="link-item">
          <div class="row page-name">应用首页</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">pages/index/index</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">pages/index/index</span>
            </div>
          </div>
        </li>

        <li class="link-item">
          <div class="row page-name">用户授权页面</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">pages/auth/index</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">pages/auth/index</span>
            </div>
          </div>
        </li>

        <li class="link-item">
          <div class="row page-name">用户中心页面</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">pages/ucenter/index</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">pages/ucenter/index</span>
            </div>
          </div>
        </li>
        <li class="link-item">
          <div class="row page-name">餐厅首页</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">pages/restaurant/index</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">pages/restaurant/index</span>
            </div>
          </div>
        </li>
        <li class="link-item">
          <div class="row page-name">点餐页面</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">pages/restaurant/menu/index</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">pages/restaurant/menu/index</span>
            </div>
          </div>
        </li>
        <li class="link-item">
          <div class="row page-name">商城首页</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">pages/shop/index</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">pages/shop/index</span>
            </div>
          </div>
        </li>

        <li class="link-item">
          <div class="row page-name">购物车页面</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">pages/cart/index</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">pages/cart/index</span>
            </div>
          </div>
        </li>

        <li class="link-item">
          <div class="row page-name">游戏首页</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">pages/game/index/index</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">pages/game/index/index</span>
            </div>
          </div>
        </li>

        <li class="link-item">
          <div class="row page-name">游戏详情页面</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">pages/game/detail/index</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              参数：
              <span class="x-color-green">id</span>
              <span class="x-color-gray">&nbsp;游戏ID</span>
              <span class="x-color-red">&nbsp;--必填</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">
                pages/game/detail/index?id=44552884521961
              </span>
            </div>
          </div>
        </li>

        <li class="link-item">
          <div class="row page-name">关注公众号页面</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">pages/game/subscribe/index</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">pages/game/subscribe/index</span>
            </div>
          </div>
        </li>

        <li class="link-item">
          <div class="row page-name">游戏列表页面</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">pages/game/list/index</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              参数：
              <span class="x-color-green">isWinning</span>
              <span class="x-color-gray">&nbsp;是否为赢奖游戏，1是，0否</span>
              <span class="x-color-red">&nbsp;--必填</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">
                pages/game/list/index?isWinning=1
              </span>
            </div>
          </div>
        </li>

        <li class="link-item">
          <div class="row page-name">商品列表页面</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">pages/goods/list/index</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              参数：
              <span class="x-color-green">search</span>
              <span class="x-color-gray">&nbsp;搜索到产品名称</span>
              <span class="x-color-green">&nbsp;--选填</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              参数：
              <span class="x-color-green">categoryId</span>
              <span class="x-color-gray">&nbsp;商品分类id</span>
              <span class="x-color-green">&nbsp;--选填</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              参数：
              <span class="x-color-green">type</span>
              <span class="x-color-gray">
                &nbsp;商品类型，10商品，20菜品，默认10
              </span>
              <span class="x-color-green">&nbsp;--选填</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">
                pages/goods/list/index?search=空调&amp;categoryId=5296329986350&amp;type=10
              </span>
            </div>
          </div>
        </li>

        <li class="link-item">
          <div class="row page-name">商品详情页面</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">pages/goods/detail/index</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              参数：
              <span class="x-color-green">id</span>
              <span class="x-color-gray">&nbsp;商品ID</span>
              <span class="x-color-red">&nbsp;--必填</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">
                pages/goods/detail/index?id=44552884521961
              </span>
            </div>
          </div>
        </li>

        <li class="link-item">
          <div class="row page-name">商品分类页面</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">pages/goods/category/index</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              参数：
              <span class="x-color-green">type</span>
              <span class="x-color-gray">
                &nbsp;商品类型，10商品，20菜品，默认10
              </span>
              <span class="x-color-green">&nbsp;--选填</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">
                pages/goods/category/index?type=10
              </span>
            </div>
          </div>
        </li>

        <li class="link-item">
          <div class="row page-name">游戏奖品列表页面</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">pages/goods/prize/index</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">pages/goods/prize/index</span>
            </div>
          </div>
        </li>

        <li class="link-item">
          <div class="row page-name">游戏获奖记录页面</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">pages/winning/record/index</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">pages/winning/record/index</span>
            </div>
          </div>
        </li>

        <li class="link-item">
          <div class="row page-name">用户收货地址页面</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">pages/address/list/index</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">pages/address/list/index</span>
            </div>
          </div>
        </li>

        <li class="link-item">
          <div class="row page-name">用户商城订单列表页面</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">pages/order/list/index</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">pages/order/list/index</span>
            </div>
          </div>
        </li>

        <li class="link-item">
          <div class="row page-name">用户点餐订单列表页面</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">
                pages/restaurant/menu/order/list/index
              </span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">
                pages/restaurant/menu/order/list/index
              </span>
            </div>
          </div>
        </li>

        <li class="link-item">
          <div class="row page-name">用户我的钱包页面</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">pages/wallet/index/index</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">pages/wallet/index/index</span>
            </div>
          </div>
        </li>

        <li class="link-item">
          <div class="row page-name">用户会员中心页面</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">pages/vip/index</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">pages/vip/index</span>
            </div>
          </div>
        </li>

        <li class="link-item">
          <div class="row page-name">用户充值页面</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">
                pages/wallet/recharge/index/index
              </span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">
                pages/wallet/recharge/index/index
              </span>
            </div>
          </div>
        </li>

        <li class="link-item">
          <div class="row page-name">用户付款页面</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">pages/wallet/pay/qrcode/index</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">pages/wallet/pay/qrcode/index</span>
            </div>
          </div>
        </li>

        <li class="link-item">
          <div class="row page-name">联系客服页面</div>
          <div class="row am-cf">
            <div class="am-fl">
              地址：
              <span class="x-color-green">pages/attendant/index</span>
            </div>
          </div>
          <div class="row am-cf">
            <div class="am-fl">
              例如：
              <span class="x-color-gray-">pages/attendant/index</span>
            </div>
          </div>
        </li>
      </ul>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "PageLinkList",
    data() {
      return {};
    },
    created() {},
  };
</script>
<style lang="scss" scoped>
  .page-link-container {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .link-item {
      border-bottom: 1px dashed #eee;
      font-size: 13px;
      color: #333;
      line-height: 25px;
      padding: 10px 15px;

      .page-name {
        color: #1890ff;
        font-size: 14px;
      }

      .x-color-green {
        color: #13ce66;
      }

      .x-color-gray {
        color: #828282;
      }

      .x-color-red {
        color: #f00;
      }
    }
  }
</style>
