<template>
  <div class="row-content am-cf">
    <div v-show="showPage">
      <!-- 顶部导航 -->
      <el-row>
        <el-col :span="24">
          <part-header>
            <span slot="title">页面装修</span>
            <el-button slot="right" @click="pageback">返回</el-button>
          </part-header>
        </el-col>
      </el-row>

      <el-divider></el-divider>

      <div class="widget am-cf">
        <div class="widget-body">
          <div id="app" class="work-diy dis-flex flex-x-between">
            <div id="diy-menu" class="diy-menu">
              <part-header>
                <span slot="title">组件库</span>
              </part-header>
              <div class="header-line"></div>
              <div class="navs">
                <div class="navs-group">
                  <div class="title">媒体组件</div>
                  <div class="navs-components am-cf">
                    <div class="special" @click="onAddItem('banner')">
                      <p class="item-icon">
                        <vab-remix-icon
                          icon-class="gallery-line"
                        ></vab-remix-icon>
                      </p>
                      <p>图片轮播</p>
                    </div>
                    <div class="special" @click="onAddItem('imageSingle')">
                      <p class="item-icon">
                        <vab-remix-icon
                          icon-class="image-line"
                        ></vab-remix-icon>
                      </p>
                      <p>单图组</p>
                    </div>
                    <div class="special" @click="onAddItem('window')">
                      <p class="item-icon">
                        <vab-remix-icon
                          icon-class="collage-line"
                        ></vab-remix-icon>
                      </p>
                      <p>图片橱窗</p>
                    </div>
                    <div class="special" @click="onAddItem('video')">
                      <p class="item-icon">
                        <vab-remix-icon
                          icon-class="video-line"
                        ></vab-remix-icon>
                      </p>
                      <p>视频组</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="navs">
                <div class="navs-group">
                  <div class="title">功能组件</div>
                  <div class="navs-components am-cf">
                    <div class="special" @click="onAddItem('titleLink')">
                      <p class="item-icon">
                        <vab-remix-icon icon-class="link"></vab-remix-icon>
                      </p>
                      <p>标题链接</p>
                    </div>
                    <div class="special" @click="onAddItem('notice')">
                      <p class="item-icon">
                        <vab-remix-icon
                          icon-class="volume-vibrate-line"
                        ></vab-remix-icon>
                      </p>
                      <p>公告组</p>
                    </div>
                    <div class="special" @click="onAddItem('navBar')">
                      <p class="item-icon">
                        <vab-remix-icon
                          icon-class="function-line"
                        ></vab-remix-icon>
                      </p>
                      <p>导航组</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="navs">
                <div class="navs-group">
                  <div class="title">游戏组件</div>
                  <div class="navs-components am-cf">
                    <div class="special" @click="onAddItem('singleGame')">
                      <p class="item-icon">
                        <vab-remix-icon
                          icon-class="gamepad-line"
                        ></vab-remix-icon>
                      </p>
                      <p>推荐游戏</p>
                    </div>
                    <div class="special" @click="onAddItem('game')">
                      <p class="item-icon">
                        <vab-remix-icon icon-class="game-line"></vab-remix-icon>
                      </p>
                      <p>游戏组</p>
                    </div>
                    <div class="special" @click="onAddItem('gameGoodsPrize')">
                      <p class="item-icon">
                        <vab-remix-icon icon-class="gift-line"></vab-remix-icon>
                      </p>
                      <p>商品奖品</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="navs">
                <div class="navs-group">
                  <div class="title">
                    商城{{ merchant.type === 20 ? "/餐厅" : "" }}组件
                  </div>
                  <div class="navs-components am-cf">
                    <div class="special" @click="onAddItem('goods')">
                      <p class="item-icon">
                        <vab-remix-icon
                          icon-class="shopping-bag-line"
                        ></vab-remix-icon>
                      </p>
                      <p>商品组</p>
                    </div>
                    <div
                      v-if="merchant.type === 20"
                      class="special"
                      @click="onAddItem('imageSingle', 'menuOrderButton')"
                    >
                      <p class="item-icon">
                        <vab-remix-icon
                          icon-class="cake-3-line"
                        ></vab-remix-icon>
                      </p>
                      <p>点餐按钮</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="navs">
                <div class="navs-group">
                  <div class="title">工具组件</div>
                  <div class="navs-components am-cf">
                    <div class="special" @click="onAddItem('richText')">
                      <p class="item-icon">
                        <vab-remix-icon
                          icon-class="file-text-line"
                        ></vab-remix-icon>
                      </p>
                      <p>富文本</p>
                    </div>
                    <div class="special" @click="onAddItem('blank')">
                      <p class="item-icon">
                        <vab-remix-icon
                          icon-class="fullscreen-line"
                        ></vab-remix-icon>
                      </p>
                      <p>辅助空白</p>
                    </div>
                    <div class="special" @click="onAddItem('guide')">
                      <p class="item-icon">
                        <vab-remix-icon
                          icon-class="git-commit-line"
                        ></vab-remix-icon>
                      </p>
                      <p>辅助线</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="action">
                <el-button type="primary" @click="savePageData">
                  保存页面
                </el-button>
              </div>
            </div>
            <!--手机diy容器-->
            <div class="diy-phone">
              <!-- 手机顶部标题 -->
              <div
                id="diy-page"
                class="phone-top optional"
                :class="{ selected: 'page' === selectedIndex }"
                :style="{
                  background: pageHeaderBackground,
                }"
                @click.stop="onEditer('page')"
              >
                <h4 :style="{ color: diyData.page.style.titleTextColor }">
                  {{ diyData.page.params.title }}
                </h4>
              </div>
              <div
                v-cloak
                id="phone-main"
                class="phone-main"
                :style="{
                  background: diyData.page.style.globalBackground,
                }"
              >
                <draggable
                  :list="diyData.items"
                  class="dragArea"
                  :options="{ animation: 120, filter: '.drag__nomove' }"
                  @update="onDragItemEnd"
                >
                  <template v-for="(item, index) in diyData.items">
                    <!-- diy元素: 图片轮播 -->
                    <template v-if="item && item.type === 'banner'">
                      <div
                        :key="index"
                        class="drag optional"
                        :class="{ selected: index === selectedIndex }"
                        @click.stop="onEditer(index)"
                      >
                        <div
                          class="diy-banner"
                          :style="{
                            padding:
                              item.style.paddingTop +
                              'px ' +
                              item.style.paddingLeft +
                              'px',
                          }"
                        >
                          <el-carousel
                            :interval="Number(item.params.interval)"
                            :height="`${item.style.height}px`"
                            :style="`border-radius: ${item.style.borderRadius}px`"
                          >
                            <el-carousel-item
                              v-for="(banner, index2) in item.data"
                              :key="index2"
                            >
                              <a
                                v-if="banner.linkUrl"
                                target="_blank"
                                :href="banner.linkUrl"
                              >
                                <img :src="banner.image.url" />
                              </a>
                              <img v-else :src="banner.image.url" />
                            </el-carousel-item>
                          </el-carousel>
                        </div>
                        <div class="btn-edit-del">
                          <div
                            class="btn-del"
                            @click.stop="onDeleleItem(index)"
                          >
                            删除
                          </div>
                        </div>
                      </div>
                    </template>

                    <!-- diy元素: 单图组 -->
                    <template v-else-if="item.type === 'imageSingle'">
                      <div :key="index" @click.stop="onEditer(index)">
                        <div
                          class="drag optional"
                          :class="{ selected: index === selectedIndex }"
                        >
                          <div
                            class="diy-imageSingle"
                            :style="{
                              paddingBottom: item.style.paddingTop + 'px',
                              background: item.style.background,
                            }"
                          >
                            <div
                              v-for="(imageSingle, index2) in item.data"
                              :key="index2"
                              class="item-image"
                              :style="{
                                padding:
                                  item.style.paddingTop +
                                  'px ' +
                                  item.style.paddingLeft +
                                  'px 0',
                              }"
                            >
                              <a
                                v-if="imageSingle.linkUrl"
                                target="_blank"
                                :href="imageSingle.linkUrl"
                              >
                                <img
                                  :style="`borderRadius: ${item.style.borderRadius}px`"
                                  :src="imageSingle.image.url"
                                />
                              </a>
                              <img
                                v-else
                                :style="`borderRadius: ${item.style.borderRadius}px`"
                                :src="imageSingle.image.url"
                              />
                            </div>
                          </div>
                          <div class="btn-edit-del">
                            <div
                              class="btn-del"
                              @click.stop="onDeleleItem(index)"
                            >
                              删除
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>

                    <!-- diy元素: 图片橱窗 -->
                    <template v-else-if="item.type == 'window'">
                      <div :key="index" @click.stop="onEditer(index)">
                        <div
                          class="drag optional"
                          :class="{ selected: index === selectedIndex }"
                        >
                          <div
                            class="diy-window"
                            :style="{
                              background: item.style.background,
                              padding:
                                item.style.marginTop +
                                'px ' +
                                item.style.marginLeft +
                                'px',
                            }"
                          >
                            <ul
                              v-if="item.style.layout > -1"
                              class="data-list"
                              :class="'am-avg-sm-' + item.style.layout"
                            >
                              <li
                                v-for="(window, index2) in item.data"
                                :key="index2"
                                :style="{
                                  padding:
                                    item.style.paddingTop +
                                    'px ' +
                                    item.style.paddingLeft +
                                    'px',
                                }"
                              >
                                <div class="item-image">
                                  <a
                                    v-if="window.linkUrl"
                                    target="_blank"
                                    :href="window.linkUrl"
                                  >
                                    <img
                                      :style="`borderRadius: ${item.style.borderRadius}px`"
                                      :src="window.image.url"
                                    />
                                  </a>
                                  <img
                                    v-else
                                    :style="`borderRadius: ${item.style.borderRadius}px`"
                                    :src="window.image.url"
                                  />
                                </div>
                              </li>
                            </ul>
                            <div v-else class="display">
                              <div
                                class="display-left"
                                :style="{
                                  padding:
                                    item.style.paddingTop +
                                    'px ' +
                                    item.style.paddingLeft +
                                    'px',
                                }"
                              >
                                <a
                                  v-if="item.data[0].linkUrl"
                                  target="_blank"
                                  :href="item.data[0].linkUrl"
                                >
                                  <img
                                    :style="`borderRadius: ${item.style.borderRadius}px`"
                                    :src="item.data[0].image.url"
                                  />
                                </a>
                                <img
                                  v-else
                                  :style="`borderRadius: ${item.style.borderRadius}px`"
                                  :src="item.data[0].image.url"
                                />
                              </div>
                              <div class="display-right">
                                <div
                                  v-if="item.data.length >= 2"
                                  class="display-right1"
                                  :style="{
                                    padding:
                                      item.style.paddingTop +
                                      'px ' +
                                      item.style.paddingLeft +
                                      'px',
                                  }"
                                >
                                  <a
                                    v-if="item.data[1].linkUrl"
                                    target="_blank"
                                    :href="item.data[1].linkUrl"
                                  >
                                    <img
                                      :style="`borderRadius: ${item.style.borderRadius}px`"
                                      :src="item.data[1].image.url"
                                    />
                                  </a>
                                  <img
                                    v-else
                                    :style="`borderRadius: ${item.style.borderRadius}px`"
                                    :src="item.data[1].image.url"
                                  />
                                </div>
                                <div class="display-right2">
                                  <div
                                    v-if="item.data.length >= 3"
                                    class="left"
                                    :style="{
                                      padding:
                                        item.style.paddingTop +
                                        'px ' +
                                        item.style.paddingLeft +
                                        'px',
                                    }"
                                  >
                                    <a
                                      v-if="item.data[2].linkUrl"
                                      target="_blank"
                                      :href="item.data[2].linkUrl"
                                    >
                                      <img
                                        :style="`borderRadius: ${item.style.borderRadius}px`"
                                        :src="item.data[2].image.url"
                                      />
                                    </a>
                                    <img
                                      v-else
                                      :style="`borderRadius: ${item.style.borderRadius}px`"
                                      :src="item.data[2].image.url"
                                    />
                                  </div>
                                  <div
                                    v-if="item.data.length >= 4"
                                    class="right"
                                    :style="{
                                      padding:
                                        item.style.paddingTop +
                                        'px ' +
                                        item.style.paddingLeft +
                                        'px',
                                    }"
                                  >
                                    <a
                                      v-if="item.data[3].linkUrl"
                                      target="_blank"
                                      :href="item.data[3].linkUrl"
                                    >
                                      <img
                                        :style="`borderRadius: ${item.style.borderRadius}px`"
                                        :src="item.data[3].image.url"
                                      />
                                    </a>
                                    <img
                                      v-else
                                      :style="`borderRadius: ${item.style.borderRadius}px`"
                                      :src="item.data[3].image.url"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="btn-edit-del">
                            <div
                              class="btn-del"
                              @click.stop="onDeleleItem(index)"
                            >
                              删除
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>

                    <!-- diy元素: 视频组 -->
                    <template v-else-if="item.type == 'video'">
                      <div :key="index" @click.stop="onEditer(index)">
                        <div
                          class="drag optional"
                          :class="{ selected: index === selectedIndex }"
                        >
                          <div
                            class="diy-video"
                            :style="{
                              background: item.style.background,
                              padding: `${item.style.paddingTop}px ${item.style.paddingLeft}px`,
                            }"
                          >
                            <vab-player-mp4
                              v-if="showVideo"
                              :config="
                                Object.assign(item.params, {
                                  poster: item.params.image.url,
                                })
                              "
                            />
                          </div>
                          <div class="btn-edit-del">
                            <div
                              class="btn-del"
                              @click.stop="onDeleleItem(index)"
                            >
                              删除
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>

                    <!-- diy元素: 标题链接 -->
                    <template v-else-if="item.type == 'titleLink'">
                      <div :key="index" @click.stop="onEditer(index)">
                        <div
                          class="drag optional"
                          :class="{ selected: index === selectedIndex }"
                        >
                          <div
                            class="diy-titleLink"
                            :style="{
                              display: 'flex',
                              height: `${item.style.height}px`,
                              padding: '0px ' + item.style.paddingLeft + 'px',
                              background: `url(${
                                item.style.bgImage ? item.style.bgImage.url : ''
                              })`,
                              backgroundRepeat: item.style.backgroundRepeat,
                              backgroundSize: `${item.style.backgroundWidth}px ${item.style.backgroundHeight}px`,
                              backgroundPosition: item.style.backgroundPosition,
                              backgroundColor: item.style.backgroundColor,
                              justifyContent: item.params.isCenter
                                ? 'center'
                                : 'space-between',
                            }"
                          >
                            <div
                              v-if="item.params.layout.includes('left')"
                              class="title-link-left"
                            >
                              <a
                                :href="item.data[0].link || 'void(0)'"
                                target="_blank"
                              >
                                <img
                                  v-if="item.data[0].image"
                                  :style="{
                                    height: `${item.style.height * 0.8}px`,
                                  }"
                                  :src="item.data[0].image.url"
                                />
                                <span
                                  :style="{
                                    color: item.data[0].color,
                                    fontSize: `${item.data[0].size}px`,
                                  }"
                                >
                                  {{ item.data[0].text }}
                                </span>
                              </a>
                            </div>
                            <div
                              v-if="item.params.layout.includes('right')"
                              class="title-link-right"
                            >
                              <a
                                :href="item.data[1].link || 'void(0)'"
                                target="_blank"
                              >
                                <img
                                  v-if="item.data[1].image"
                                  :style="{
                                    height: `${item.style.height * 0.7}px`,
                                  }"
                                  :src="item.data[1].image.url"
                                />
                                <span
                                  :style="{
                                    color: item.data[1].color,
                                    fontSize: `${item.data[1].size}px`,
                                  }"
                                >
                                  {{ item.data[1].text }}
                                </span>
                              </a>
                            </div>
                          </div>
                          <div class="btn-edit-del">
                            <div
                              class="btn-del"
                              @click.stop="onDeleleItem(index)"
                            >
                              删除
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>

                    <!-- diy元素: 公告组 -->
                    <template v-else-if="item.type == 'notice'">
                      <div :key="index" @click.stop="onEditer(index)">
                        <div
                          class="drag optional"
                          :class="{ selected: index === selectedIndex }"
                        >
                          <div
                            class="diy-notice dis-flex"
                            :style="{
                              margin: `${item.style.paddingTop}px ${item.style.paddingLeft}px`,
                              height: item.style.height + 'px',
                              lineHeight: item.style.height - 2 + 'px',
                              borderRadius: item.style.borderRadius + 'px',
                              background: item.style.background,
                              overflow: 'hidden',
                            }"
                          >
                            <div class="notice__text flex-box am-text-truncate">
                              <img
                                :src="item.params.image.url"
                                :style="{
                                  verticalAlign: 'middle',
                                  height: `${item.style.height * 0.7}px`,
                                }"
                              />
                              <a
                                :href="item.data[0].link"
                                :style="{
                                  verticalAlign: 'middle',
                                  color: item.style.color,
                                  fontSize: item.style.fontSize + 'px',
                                }"
                              >
                                {{ item.data[0].text }}
                              </a>
                            </div>
                          </div>
                          <div class="btn-edit-del">
                            <div
                              class="btn-del"
                              @click.stop="onDeleleItem(index)"
                            >
                              删除
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>

                    <!-- diy元素: 导航组 -->
                    <template v-else-if="item.type == 'navBar'">
                      <div :key="index" @click.stop="onEditer(index)">
                        <div
                          class="drag optional"
                          :class="{ selected: index === selectedIndex }"
                        >
                          <div
                            class="diy-navBar"
                            :style="{
                              padding: `${item.style.paddingTop}px ${item.style.paddingLeft}px`,
                              background: item.style.background,
                            }"
                          >
                            <ul
                              style="display: flex"
                              :class="
                                item.params.rowsNum === '4'
                                  ? 'am-avg-sm-4'
                                  : item.params.rowsNum === '3'
                                  ? 'am-avg-sm-3'
                                  : 'am-avg-sm-5'
                              "
                            >
                              <li
                                v-for="(navBar, index2) in item.data"
                                :key="index2"
                                class=""
                              >
                                <div class="item-image">
                                  <img
                                    :src="navBar.image.url"
                                    :style="{
                                      height: item.style.imageSize + 'px',
                                      width: item.style.imageSize + 'px',
                                    }"
                                  />
                                </div>
                                <p
                                  class="item-text am-text-truncate"
                                  :style="{
                                    color: navBar.color,
                                    fontSize: item.style.fontSize + 'px',
                                  }"
                                >
                                  {{ navBar.text }}
                                </p>
                              </li>
                            </ul>
                          </div>
                          <div class="btn-edit-del">
                            <div
                              class="btn-del"
                              @click.stop="onDeleleItem(index)"
                            >
                              删除
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>

                    <!-- diy元素: 推荐游戏 -->
                    <template v-else-if="item.type == 'singleGame'">
                      <div :key="index" @click.stop="onEditer(index)">
                        <div
                          class="drag optional"
                          :class="{ selected: index === selectedIndex }"
                          :style="{
                            padding: `${item.style.marginTop}px ${item.style.marginLeft}px`,
                          }"
                        >
                          <div class="diy-single-game" style="min-height: 40px">
                            <div
                              v-if="item.data.game"
                              class="game-item"
                              :style="{
                                background: item.style.background,
                              }"
                            >
                              <div class="game-item-image">
                                <img
                                  :style="{
                                    borderRadius:
                                      item.style.logoBorderRadius + 'px',
                                  }"
                                  :src="item.data.game.thumbnail.url || ''"
                                />
                                <div class="game-content">
                                  <p
                                    class="title"
                                    :style="{
                                      fontSize: `${item.style.titleFontSize}px`,
                                      color: `${item.style.titleFontColor}`,
                                    }"
                                  >
                                    <span style="padding-right: 4px">
                                      {{
                                        item.data.game.merchant_game
                                          ? item.data.game.merchant_game.name ||
                                            item.data.game.name
                                          : item.data.game.name
                                      }}
                                    </span>
                                    <img
                                      v-if="
                                        item.data.game &&
                                        item.data.game.activity_game
                                      "
                                      style="width: 14px; height: 14px"
                                      src="@/assets/game/gift-icon.svg"
                                    />
                                  </p>
                                  <p
                                    class="people"
                                    :style="{
                                      fontSize: `${item.style.peopleFontSize}px`,
                                      color: `${item.style.peopleFontColor}`,
                                    }"
                                  >
                                    玩家人数：{{
                                      item.data.game.merchant_game
                                        ? item.data.game.merchant_game
                                            .play_people_count ||
                                          item.data.game.play_people_count
                                        : item.data.game.play_people_count
                                    }}
                                  </p>
                                  <p
                                    class="desc"
                                    :style="{
                                      fontSize: `${item.style.descFontSize}px`,
                                      color: `${item.style.descFontColor}`,
                                    }"
                                  >
                                    {{
                                      item.data.game.merchant_game
                                        ? item.data.game.merchant_game
                                            .description ||
                                          item.data.game.description
                                        : item.data.game.description
                                    }}
                                  </p>
                                </div>
                              </div>
                              <span
                                class="play-button"
                                :style="{
                                  background: item.style.buttonBackground,
                                  color: item.style.buttonColor,
                                  fontSize: item.style.buttonFontSize + 'px',
                                  lineHeight:
                                    item.style.buttonFontSize + 16 + 'px',
                                  borderRadius: item.style.buttonRadius + 'px',
                                }"
                              >
                                {{ item.style.buttonText }}
                              </span>
                            </div>
                            <div
                              v-if="item.data.game && item.data.game.images"
                              class="game-images"
                            >
                              <div class="game-image-item">
                                <img
                                  v-if="item.data.game.images[0]"
                                  :style="{
                                    borderRadius:
                                      item.style.imgBorderRadius + 'px',
                                  }"
                                  :src="item.data.game.images[0].url"
                                />
                              </div>
                              <div class="game-image-item">
                                <img
                                  v-if="item.data.game.images[1]"
                                  :style="{
                                    borderRadius:
                                      item.style.imgBorderRadius + 'px',
                                  }"
                                  :src="item.data.game.images[1].url"
                                />
                              </div>
                              <div class="game-image-item no-mr">
                                <img
                                  v-if="item.data.game.images[2]"
                                  :style="{
                                    borderRadius:
                                      item.style.imgBorderRadius + 'px',
                                  }"
                                  :src="item.data.game.images[2].url"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="btn-edit-del">
                            <div
                              class="btn-del"
                              @click.stop="onDeleleItem(index)"
                            >
                              删除
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>

                    <!-- diy元素: 游戏组 -->
                    <template v-else-if="item.type == 'game'">
                      <div :key="index" @click.stop="onEditer(index)">
                        <div
                          class="drag optional"
                          :class="{ selected: index === selectedIndex }"
                          :style="{
                            padding: `${item.style.marginTop}px ${item.style.marginLeft}px`,
                          }"
                        >
                          <div class="diy-game" style="min-height: 40px">
                            <ul class="game-list">
                              <li
                                v-for="(info, index2) in item.data"
                                :key="index2"
                                :style="{
                                  background: item.style.background,
                                  padding: `0 ${item.style.paddingLeft}px`,
                                  borderRadius: item.style.borderRadius + 'px',
                                }"
                              >
                                <div
                                  class="game-item"
                                  :style="{
                                    padding: `${item.style.paddingTop}px 0`,
                                  }"
                                >
                                  <div class="game-item-image">
                                    <img
                                      :style="{
                                        borderRadius:
                                          item.style.imgBorderRadius + 'px',
                                      }"
                                      :src="
                                        info.game ? info.game.thumbnail.url : ''
                                      "
                                    />
                                    <div class="game-content">
                                      <p
                                        class="title"
                                        :style="{
                                          fontSize: `${item.style.titleFontSize}px`,
                                          color: `${item.style.titleFontColor}`,
                                        }"
                                      >
                                        <span style="padding-right: 4px">
                                          {{
                                            info.game
                                              ? info.game.merchant_game
                                                ? info.game.merchant_game
                                                    .name || info.game.name
                                                : info.game.name
                                              : ""
                                          }}
                                        </span>
                                        <img
                                          v-if="
                                            info.game && info.game.activity_game
                                          "
                                          style="width: 14px; height: 14px"
                                          src="@/assets/game/gift-icon.svg"
                                        />
                                      </p>
                                      <p
                                        class="people"
                                        :style="{
                                          fontSize: `${item.style.peopleFontSize}px`,
                                          color: `${item.style.peopleFontColor}`,
                                        }"
                                      >
                                        玩家人数：{{
                                          info.game
                                            ? info.game.merchant_game
                                              ? info.game.merchant_game
                                                  .play_people_count ||
                                                info.game.play_people_count
                                              : info.game.play_people_count
                                            : ""
                                        }}
                                      </p>
                                      <p
                                        class="desc"
                                        :style="{
                                          fontSize: `${item.style.descFontSize}px`,
                                          color: `${item.style.descFontColor}`,
                                        }"
                                      >
                                        {{
                                          info.game
                                            ? info.game.merchant_game
                                              ? info.game.merchant_game
                                                  .description ||
                                                info.game.description
                                              : info.game.description
                                            : ""
                                        }}
                                      </p>
                                    </div>
                                  </div>
                                  <div class="play-button">
                                    <img :src="item.style.buttonImgUrl" />
                                  </div>
                                </div>
                                <div
                                  :style="{
                                    height: item.style.borderSize + 'px',
                                    background: item.style.borderColor,
                                  }"
                                ></div>
                              </li>
                            </ul>
                          </div>
                          <div class="btn-edit-del">
                            <div
                              class="btn-del"
                              @click.stop="onDeleleItem(index)"
                            >
                              删除
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>

                    <!-- diy元素: 商品奖品 -->
                    <template v-else-if="item.type == 'gameGoodsPrize'">
                      <div :key="index" @click.stop="onEditer(index)">
                        <div
                          class="drag optional"
                          :class="{ selected: index === selectedIndex }"
                          :style="{
                            padding: `${item.style.marginTop}px ${item.style.marginLeft}px`,
                          }"
                        >
                          <div class="diy-goods" style="min-height: 40px">
                            <!-- <div v-if="item.params.column === 1">
                            <ul
                              class="goods-list am-cf"
                              :class="[
                                'display__' + item.params.display,
                                'column__' + item.params.column,
                              ]"
                            >
                              <li
                                v-for="(info, index2) in item.data"
                                :key="index2"
                                class="goods-item"
                                :style="{
                                  background: item.style.background,
                                  padding: `${item.style.paddingTop}px ${item.style.paddingLeft}px`,
                                  borderRadius: item.style.borderRadius + 'px',
                                }"
                              >
                                <template>
                                  <div class="dis-flex">
                                    <div class="goods-item_left">
                                      <img :src="info.goods.thumbnail.url" />
                                    </div>
                                    <div class="goods-item_right">
                                      <div
                                        class="goods-item_title twolist-hidden"
                                      >
                                        <span>
                                          {{ info.goods.name }}
                                        </span>
                                      </div>
                                      <div class="goods-item_desc">
                                        <div
                                          class="desc-selling_point am-text-truncate"
                                        >
                                          <span>
                                            {{ info.goods.selling_point }}
                                          </span>
                                        </div>
                                        <div
                                          class="desc-goods_sales am-text-truncate"
                                        >
                                          <span>
                                            已售{{ info.goods.sales_actual }}件
                                          </span>
                                        </div>
                                        <div class="desc_footer">
                                          <span class="price_x">
                                            ¥{{ info.goods.skus[0].price }}
                                          </span>
                                          <span class="price_y x-color-999">
                                            ¥{{ info.goods.skus[0].line_price }}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </template>
                              </li>
                            </ul>
                          </div> -->
                            <div v-if="item.params.column === 2">
                              <ul
                                v-for="(numbers, index2) in spliceNumberArray(
                                  item.data.length,
                                  2
                                )"
                                :key="index2"
                                class="goods-list am-cf"
                                :class="[
                                  'display__' + item.params.display,
                                  'column__' + item.params.column,
                                ]"
                              >
                                <li
                                  v-for="(number, index3) in numbers"
                                  :key="index3"
                                  class="goods-item"
                                  :style="{
                                    background: item.style.background,
                                    margin: `0 0 ${
                                      index2 ===
                                      Math.ceil(item.data.length / 2) - 1
                                        ? '0'
                                        : item.style.columnSpacing
                                    }px ${
                                      index3 === 0
                                        ? 0
                                        : item.style.columnSpacing
                                    }px`,
                                    padding: `${item.style.paddingTop}px ${item.style.paddingLeft}px`,
                                    borderRadius:
                                      item.style.borderRadius + 'px',
                                  }"
                                >
                                  <!-- 两列 -->
                                  <template>
                                    <div
                                      class="goods-image"
                                      :style="{
                                        borderRadius: `${item.style.borderRadius}px ${item.style.borderRadius}px 0 0`,
                                      }"
                                    >
                                      <span
                                        class="flag"
                                        :class="
                                          item.data[number].goods
                                            .prize_get_methods === 10
                                            ? 'pink'
                                            : 'yellow'
                                        "
                                      >
                                        {{
                                          item.data[number].goods
                                            .prize_get_methods === 10
                                            ? "店内领取"
                                            : "邮寄配送"
                                        }}
                                      </span>
                                      <img
                                        :src="
                                          item.data[number].goods.thumbnail.url
                                        "
                                      />
                                    </div>
                                    <div
                                      class="detail"
                                      :style="{
                                        borderRadius: `0 0 ${item.style.borderRadius}px ${item.style.borderRadius}px`,
                                      }"
                                    >
                                      <p
                                        class="goods-name twolist-hidden"
                                        :style="{
                                          fontSize: `${item.style.titleFontSize}px`,
                                          color: `${item.style.titleFontColor}`,
                                        }"
                                      >
                                        {{ item.data[number].goods.name }}
                                      </p>
                                      <p
                                        :style="{
                                          fontSize: `${item.style.linePriceFontSize}px`,
                                          color: `${item.style.linePriceFontColor}`,
                                        }"
                                      >
                                        <span
                                          class="line-price"
                                          style="padding-left: 2px"
                                        >
                                          ¥
                                          {{
                                            item.data[number].goods.skus[0]
                                              .line_price
                                          }}
                                        </span>
                                        市场价
                                      </p>
                                      <p
                                        class="detail-price"
                                        style="display: flex"
                                      >
                                        <span
                                          class="goods-price x-color-red"
                                          :style="{
                                            fontSize: `${item.style.priceFontSize}px`,
                                            color: `${item.style.priceFontColor}`,
                                          }"
                                        >
                                          <vab-remix-icon
                                            icon-class="money-cny-circle-line"
                                          ></vab-remix-icon>
                                          {{
                                            item.data[number].goods.skus[0]
                                              .price
                                          }}
                                        </span>
                                        <span
                                          :style="{
                                            background:
                                              item.style.buttonBackground,
                                            color: item.style.buttonColor,
                                            fontSize:
                                              item.style.buttonFontSize + 'px',
                                            lineHeight:
                                              item.style.buttonFontSize +
                                              8 +
                                              'px',
                                            borderRadius:
                                              item.style.buttonRadius + 'px',
                                            padding: '0px 10px',
                                            display: 'inline-block',
                                            position: 'absolute',
                                            right: '0px',
                                          }"
                                        >
                                          {{ item.style.buttonText }}
                                        </span>
                                      </p>
                                    </div>
                                  </template>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div class="btn-edit-del">
                            <div
                              class="btn-del"
                              @click.stop="onDeleleItem(index)"
                            >
                              删除
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>

                    <!-- diy元素: 商品组 -->
                    <template v-else-if="item.type == 'goods'">
                      <div :key="index" @click.stop="onEditer(index)">
                        <div
                          class="drag optional"
                          :class="{ selected: index === selectedIndex }"
                          :style="{
                            padding: `${item.style.marginTop}px ${item.style.marginLeft}px`,
                          }"
                        >
                          <div class="diy-goods" style="min-height: 40px">
                            <div v-if="item.params.column === 1">
                              <ul
                                class="goods-list am-cf"
                                :class="[
                                  'display__' + item.params.display,
                                  'column__' + item.params.column,
                                ]"
                                :style="{
                                  background: item.style.background,
                                }"
                              >
                                <li
                                  v-for="(info, index2) in item.data"
                                  :key="index2"
                                  class="goods-item"
                                  :style="{
                                    padding: `${item.style.paddingTop}px ${item.style.paddingLeft}px`,
                                    borderRadius:
                                      item.style.borderRadius + 'px',
                                    marginBottom:
                                      item.style.columnSpacing + 'px',
                                  }"
                                >
                                  <template>
                                    <div
                                      v-if="info.goods"
                                      style="display: flex"
                                    >
                                      <div class="goods-item_left">
                                        <span
                                          class="flag"
                                          :class="
                                            info.goods.prize_get_methods === 10
                                              ? 'pink'
                                              : 'yellow'
                                          "
                                        >
                                          {{
                                            info.goods.prize_get_methods === 10
                                              ? "店内领取"
                                              : "邮寄配送"
                                          }}
                                        </span>
                                        <img
                                          :style="{
                                            borderRadius: `${item.style.borderRadius}px`,
                                          }"
                                          :src="info.goods.thumbnail.url"
                                        />
                                      </div>
                                      <div class="goods-item_right">
                                        <div
                                          class="goods-item_title twolist-hidden"
                                        >
                                          <span
                                            :style="{
                                              fontSize: `${item.style.titleFontSize}px`,
                                              color: `${item.style.titleFontColor}`,
                                            }"
                                          >
                                            {{ info.goods.name }}
                                          </span>
                                        </div>
                                        <div class="goods-item_desc">
                                          <div
                                            class="desc-selling_point am-text-truncate"
                                          >
                                            <span
                                              :style="{
                                                fontSize: `${item.style.descFontSize}px`,
                                                color: `${item.style.descFontColor}`,
                                              }"
                                            >
                                              {{ info.goods.selling_point }}
                                            </span>
                                          </div>
                                          <div
                                            class="desc-goods_sales am-text-truncate"
                                          >
                                            <span
                                              :style="{
                                                fontSize: `${item.style.salesFontSize}px`,
                                                color: `${item.style.salesFontColor}`,
                                              }"
                                            >
                                              已售{{
                                                info.goods.sales_actual
                                              }}件
                                            </span>
                                          </div>
                                          <div class="desc_footer">
                                            <span
                                              class="price_x"
                                              :style="{
                                                fontSize: `${item.style.priceFontSize}px`,
                                                color: `${item.style.priceFontColor}`,
                                              }"
                                            >
                                              ¥{{ info.goods.skus[0].price }}
                                            </span>
                                            <span
                                              class="price_y x-color-999"
                                              :style="{
                                                paddingLeft: '6px',
                                                fontSize: `${item.style.linePriceFontSize}px`,
                                                color: `${item.style.linePriceFontColor}`,
                                              }"
                                            >
                                              ¥{{
                                                info.goods.skus[0].line_price
                                              }}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </template>
                                </li>
                              </ul>
                            </div>
                            <div v-if="item.params.column === 2">
                              <ul
                                v-for="(numbers, index2) in spliceNumberArray(
                                  item.data.length,
                                  2
                                )"
                                :key="index2"
                                class="goods-list am-cf"
                                :class="[
                                  'display__' + item.params.display,
                                  'column__' + item.params.column,
                                ]"
                              >
                                <li
                                  v-for="(number, index3) in numbers"
                                  :key="index3"
                                  class="goods-item"
                                  :style="{
                                    background: item.style.background,
                                    margin: `0 0 ${
                                      index2 ===
                                      Math.ceil(item.data.length / 2) - 1
                                        ? '0'
                                        : item.style.columnSpacing
                                    }px ${
                                      index3 === 0
                                        ? 0
                                        : item.style.columnSpacing
                                    }px`,
                                    padding: `${item.style.paddingTop}px ${item.style.paddingLeft}px`,
                                    borderRadius:
                                      item.style.borderRadius + 'px',
                                  }"
                                >
                                  <!-- 两列 -->
                                  <template v-if="item.data[number].goods">
                                    <div
                                      class="goods-image"
                                      :style="{
                                        borderRadius: `${item.style.borderRadius}px ${item.style.borderRadius}px 0 0`,
                                      }"
                                    >
                                      <span
                                        class="flag"
                                        :class="
                                          item.data[number].goods
                                            .prize_get_methods === 10
                                            ? 'pink'
                                            : 'yellow'
                                        "
                                      >
                                        {{
                                          item.data[number].goods
                                            .prize_get_methods === 10
                                            ? "店内领取"
                                            : "邮寄配送"
                                        }}
                                      </span>
                                      <img
                                        :src="
                                          item.data[number].goods.thumbnail.url
                                        "
                                      />
                                    </div>
                                    <div
                                      class="detail"
                                      :style="{
                                        borderRadius: `0 0 ${item.style.borderRadius}px ${item.style.borderRadius}px`,
                                      }"
                                    >
                                      <p
                                        class="goods-name twolist-hidden"
                                        :style="{
                                          fontSize: `${item.style.titleFontSize}px`,
                                          color: `${item.style.titleFontColor}`,
                                        }"
                                      >
                                        {{ item.data[number].goods.name }}
                                      </p>
                                      <p
                                        class="goods-desc twolist-hidden"
                                        :style="{
                                          height: '24px',
                                          overflow: 'hidden',
                                          fontSize: `${item.style.descFontSize}px`,
                                          color: `${item.style.descFontColor}`,
                                        }"
                                      >
                                        {{
                                          item.data[number].goods.selling_point
                                        }}
                                      </p>
                                      <p
                                        class="detail-price"
                                        style="display: flex"
                                      >
                                        <span
                                          class="goods-price x-color-red"
                                          :style="{
                                            fontSize: `${item.style.priceFontSize}px`,
                                            color: `${item.style.priceFontColor}`,
                                          }"
                                        >
                                          ¥
                                          {{
                                            item.data[number].goods.skus[0]
                                              .price
                                          }}
                                        </span>
                                        <span
                                          class="line-price"
                                          :style="{
                                            paddingLeft: '10px',
                                            fontSize: `${item.style.linePriceFontSize}px`,
                                            color: `${item.style.linePriceFontColor}`,
                                          }"
                                        >
                                          ¥
                                          {{
                                            item.data[number].goods.skus[0]
                                              .line_price
                                          }}
                                        </span>
                                      </p>
                                    </div>
                                  </template>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div class="btn-edit-del">
                            <div
                              class="btn-del"
                              @click.stop="onDeleleItem(index)"
                            >
                              删除
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>

                    <!-- diy元素: 富文本 -->
                    <template v-else-if="item.type == 'richText'">
                      <div :key="index" @click.stop="onEditer(index)">
                        <div
                          class="drag optional"
                          :class="{ selected: index === selectedIndex }"
                        >
                          <div
                            class="diy-richText"
                            :style="{
                              float: 'left',
                              background: item.style.background,
                              padding:
                                item.style.paddingTop +
                                'px ' +
                                item.style.paddingLeft +
                                'px',
                            }"
                            v-html="item.params.content"
                          ></div>
                          <div class="btn-edit-del">
                            <div
                              class="btn-del"
                              @click.stop="onDeleleItem(index)"
                            >
                              删除
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>

                    <!-- diy元素: 辅助空白 -->
                    <template v-else-if="item.type == 'blank'">
                      <div :key="index" @click.stop="onEditer(index)">
                        <div
                          class="drag optional"
                          :class="{ selected: index === selectedIndex }"
                        >
                          <div
                            class="diy-blank"
                            :style="{
                              height: item.style.height + 'px',
                              background: item.style.background,
                            }"
                          ></div>
                          <div class="btn-edit-del">
                            <div
                              class="btn-del"
                              @click.stop="onDeleleItem(index)"
                            >
                              删除
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>

                    <!-- diy元素: 辅助线 -->
                    <template v-else-if="item.type == 'guide'">
                      <div
                        :key="index"
                        class="drag optional"
                        :class="{ selected: index === selectedIndex }"
                        @click.stop="onEditer(index)"
                      >
                        <div
                          class="diy-guide"
                          :style="{
                            padding: `${item.style.paddingTop}px ${item.style.paddingLeft}px`,
                            background: item.style.background,
                          }"
                        >
                          <p
                            class="line"
                            :style="{
                              borderTopWidth: item.style.lineHeight + 'px',
                              borderTopColor: item.style.lineColor,
                              borderTopStyle: item.style.lineStyle,
                            }"
                          ></p>
                        </div>
                        <div class="btn-edit-del">
                          <div
                            class="btn-del"
                            @click.stop="onDeleleItem(index)"
                          >
                            删除
                          </div>
                        </div>
                      </div>
                    </template>
                  </template>
                </draggable>
              </div>
            </div>
            <!-- 编辑器容器 -->
            <div
              v-cloak
              id="diy-editor"
              ref="diy-editor"
              class="diy-editor form-horizontal"
            >
              <!-- 编辑器: 标题栏 -->
              <div
                v-if="selectedIndex === 'page' || selectedIndex === -1"
                id="tpl_editor_page"
              >
                <part-header>
                  <span slot="title">{{ diyData.page.name }}</span>
                </part-header>
                <div class="header-line"></div>
                <el-form class="diy-editor-form" label-width="100px">
                  <el-form-item label="页面名称">
                    <el-input
                      v-model="diyData.page.params.name"
                      autocomplete="off"
                    ></el-input>
                    <div class="remark">页面名称仅用于后台查找</div>
                  </el-form-item>
                  <el-form-item label="页面标题">
                    <el-input
                      v-model="diyData.page.params.title"
                      autocomplete="off"
                    ></el-input>
                    <div class="remark">应用顶部显示的标题</div>
                  </el-form-item>
                  <el-form-item label="页面顺序">
                    <el-input-number v-model="order" :min="0"></el-input-number>
                    <div class="remark"></div>
                  </el-form-item>
                  <!-- <el-form-item label="分享标题">
                    <el-input
                      v-model="diyData.page.params.share_title"
                      autocomplete="off"
                    ></el-input>
                    <div class="remark">转发时显示的标题</div>
                  </el-form-item> -->
                  <!-- <el-form-item label="标题栏文字">
                    <el-radio-group v-model="diyData.page.style.titleTextColor">
                      <el-radio label="dark">黑色</el-radio>
                      <el-radio label="light">白色</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="标题栏背景">
                    <el-input
                      v-model="diyData.page.style.titleBackgroundColor"
                      type="color"
                    >
                      <el-button
                        slot="append"
                        @click.stop="
                          onEditorResetColor(
                            diyData.page.style,
                            'titleBackgroundColor',
                            '#ffffff'
                          )
                        "
                      >
                        重置
                      </el-button>
                    </el-input>
                  </el-form-item> -->
                  <el-form-item label="全局背景">
                    <el-input
                      v-model="diyData.page.style.globalBackground"
                      type="color"
                    >
                      <el-button
                        slot="append"
                        @click.stop="
                          onEditorResetColor(
                            diyData.page.style,
                            'globalBackground',
                            '#ffffff'
                          )
                        "
                      >
                        重置
                      </el-button>
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>
              <template v-if="diyData.items.length && curItem">
                <!-- 编辑器: 图片轮播 -->
                <div v-if="curItem.type == 'banner'" id="tpl_editor_banner">
                  <part-header>
                    <span slot="title">{{ curItem.name }}</span>
                  </part-header>
                  <div class="header-line"></div>
                  <el-form class="diy-editor-form" label-width="80px">
                    <el-form-item label="上下边距">
                      <el-slider
                        v-model="curItem.style.paddingTop"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="左右边距">
                      <el-slider
                        v-model="curItem.style.paddingLeft"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="图片高度">
                      <el-slider
                        v-model="curItem.style.height"
                        :min="0"
                        :max="1000"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="圆角边框">
                      <el-slider
                        v-model="curItem.style.borderRadius"
                        :min="0"
                        :max="20"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="切换时间">
                      <el-slider
                        v-model="curItem.params.interval"
                        :min="1000"
                        :max="10000"
                      ></el-slider>
                      <div class="remark">
                        轮播图自动切换的间隔时间，单位：毫秒
                      </div>
                    </el-form-item>
                    <el-form-item label="背景颜色">
                      <el-input v-model="curItem.style.background" type="color">
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'background',
                              '#ffffff'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <div class="form-items">
                      <draggable
                        :list="curItem.data"
                        :options="{
                          animation: 120,
                          filter: 'input',
                          preventOnFilter: false,
                        }"
                      >
                        <div
                          v-for="(banner, index) in curItem.data"
                          :key="index"
                          class="form-item"
                        >
                          <vab-remix-icon
                            icon-class="close-line iconfont icon-shanchu item-delete"
                            @click="onEditorDeleleData(index, selectedIndex)"
                          ></vab-remix-icon>
                          <div class="item-inner">
                            <el-form-item label="选择图片">
                              <vab-image-input
                                v-model="banner.image"
                                :hide-delete="true"
                              ></vab-image-input>
                            </el-form-item>
                            <el-form-item label="跳转地址">
                              <el-input
                                v-model="banner.linkUrl"
                                autocomplete="off"
                              ></el-input>
                            </el-form-item>
                          </div>
                        </div>
                      </draggable>
                    </div>
                    <el-button
                      icon="el-icon-plus"
                      style="width: 100%"
                      type="primary"
                      @click="onEditorAddData"
                    >
                      添加一个
                    </el-button>
                  </el-form>
                </div>
                <!--编辑器: 单图组-->
                <div
                  v-if="curItem.type == 'imageSingle'"
                  id="tpl_editor_imageSingle"
                >
                  <part-header>
                    <span slot="title">{{ curItem.name }}</span>
                  </part-header>
                  <div class="header-line"></div>
                  <el-form class="diy-editor-form" label-width="80px">
                    <el-form-item label="上下边距">
                      <el-slider
                        v-model="curItem.style.paddingTop"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="左右边距">
                      <el-slider
                        v-model="curItem.style.paddingLeft"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="圆角边框">
                      <el-slider
                        v-model="curItem.style.borderRadius"
                        :min="0"
                        :max="20"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="背景颜色">
                      <el-input v-model="curItem.style.background" type="color">
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'background',
                              '#ffffff'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <div class="form-items">
                      <draggable
                        :list="curItem.data"
                        :options="{
                          animation: 120,
                          filter: 'input',
                          preventOnFilter: false,
                        }"
                      >
                        <div
                          v-for="(imageSingle, index) in curItem.data"
                          :key="index"
                          class="form-item"
                        >
                          <vab-remix-icon
                            icon-class="close-line iconfont icon-shanchu item-delete"
                            @click="onEditorDeleleData(index, selectedIndex)"
                          ></vab-remix-icon>
                          <div class="item-inner">
                            <el-form-item label="选择图片">
                              <vab-image-input
                                v-model="imageSingle.image"
                                :hide-delete="true"
                              ></vab-image-input>
                            </el-form-item>
                            <el-form-item label="跳转地址">
                              <el-input
                                v-model="imageSingle.linkUrl"
                                autocomplete="off"
                              ></el-input>
                            </el-form-item>
                            <el-form-item label="跳转小程序账号">
                              <el-input
                                v-model="imageSingle.mpAccount"
                                autocomplete="off"
                              ></el-input>
                            </el-form-item>
                            <el-form-item label="跳转小程序路径">
                              <el-input
                                v-model="imageSingle.mpPath"
                                autocomplete="off"
                              ></el-input>
                            </el-form-item>
                          </div>
                        </div>
                      </draggable>
                    </div>
                    <el-button
                      icon="el-icon-plus"
                      style="width: 100%"
                      type="primary"
                      @click="onEditorAddData"
                    >
                      添加一个
                    </el-button>
                  </el-form>
                </div>
                <!--编辑器: 图片橱窗-->
                <div v-if="curItem.type == 'window'" id="tpl_editor_window">
                  <part-header>
                    <span slot="title">{{ curItem.name }}</span>
                  </part-header>
                  <div class="header-line"></div>
                  <el-form class="diy-editor-form" label-width="96px">
                    <el-form-item label="上下内边距">
                      <el-slider
                        v-model="curItem.style.paddingTop"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="左右内边距">
                      <el-slider
                        v-model="curItem.style.paddingLeft"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="上下外边距">
                      <el-slider
                        v-model="curItem.style.marginTop"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="左右外边距">
                      <el-slider
                        v-model="curItem.style.marginLeft"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="圆角边框">
                      <el-slider
                        v-model="curItem.style.borderRadius"
                        :min="0"
                        :max="20"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="背景颜色">
                      <el-input v-model="curItem.style.background" type="color">
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'background',
                              '#ffffff'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="布局方式">
                      <el-radio-group v-model="curItem.style.layout">
                        <el-radio style="padding: 6px 0" label="2">
                          堆积两列
                        </el-radio>
                        <el-radio style="padding: 6px 0" label="3">
                          堆积三列
                        </el-radio>
                        <el-radio style="padding: 6px 0" label="4">
                          堆积四列
                        </el-radio>
                        <el-radio style="padding: 6px 0" label="-1">
                          橱窗样式
                        </el-radio>
                      </el-radio-group>
                      <div class="remark">请确保所有图片的尺寸/比例相同。</div>
                    </el-form-item>
                    <div class="form-items">
                      <draggable
                        :list="curItem.data"
                        :options="{
                          animation: 120,
                          filter: 'input',
                          preventOnFilter: false,
                        }"
                      >
                        <div
                          v-for="(item, index) in curItem.data"
                          :key="index"
                          class="form-item"
                        >
                          <vab-remix-icon
                            icon-class="close-line iconfont icon-shanchu item-delete"
                            @click="onEditorDeleleData(index, selectedIndex)"
                          ></vab-remix-icon>
                          <div class="item-inner">
                            <el-form-item label="选择图片">
                              <vab-image-input
                                v-model="item.image"
                                :hide-delete="true"
                              ></vab-image-input>
                            </el-form-item>
                            <el-form-item label="跳转地址">
                              <el-input
                                v-model="item.linkUrl"
                                autocomplete="off"
                              ></el-input>
                            </el-form-item>
                          </div>
                        </div>
                      </draggable>
                    </div>
                    <el-button
                      icon="el-icon-plus"
                      style="width: 100%"
                      type="primary"
                      @click="onEditorAddData"
                    >
                      添加一个
                    </el-button>
                  </el-form>
                </div>

                <!--编辑器: 视频组-->
                <div v-if="curItem.type == 'video'" id="tpl_editor_video">
                  <part-header>
                    <span slot="title">{{ curItem.name }}</span>
                  </part-header>
                  <div class="header-line"></div>
                  <el-form class="diy-editor-form" label-width="96px">
                    <el-form-item label="上下边距">
                      <el-slider
                        v-model="curItem.style.paddingTop"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="左右边距">
                      <el-slider
                        v-model="curItem.style.paddingLeft"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="背景颜色">
                      <el-input v-model="curItem.style.background" type="color">
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'background',
                              '#ffffff'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="视频封面">
                      <vab-image-input
                        v-model="curItem.params.image"
                        :hide-delete="true"
                        @select="rerenderVideo"
                      ></vab-image-input>
                    </el-form-item>
                    <el-form-item label="视频地址">
                      <el-input
                        v-model="curItem.params.url"
                        autocomplete="off"
                        @change="rerenderVideo"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="自动播放">
                      <el-radio-group v-model="curItem.params.autoplay">
                        <el-radio style="padding: 6px 0" :label="true">
                          是
                        </el-radio>
                        <el-radio style="padding: 6px 0" :label="false">
                          否
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-form>
                </div>

                <!--编辑器: 标题链接-->
                <div
                  v-if="curItem.type == 'titleLink'"
                  id="tpl_editor_title_link"
                >
                  <part-header>
                    <span slot="title">{{ curItem.name }}</span>
                  </part-header>
                  <div class="header-line"></div>
                  <el-form class="diy-editor-form" label-width="96px">
                    <el-form-item label="标题高度">
                      <el-slider
                        v-model="curItem.style.height"
                        :min="20"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="左右边距">
                      <el-slider
                        v-model="curItem.style.paddingLeft"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="背景颜色">
                      <el-input
                        v-model="curItem.style.backgroundColor"
                        type="color"
                      >
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'backgroundColor',
                              '#ffffff'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="背景图片">
                      <vab-image-input
                        v-model="curItem.style.bgImage"
                      ></vab-image-input>
                    </el-form-item>
                    <el-form-item v-if="curItem.style.bgImage" label="背景重复">
                      <el-radio-group v-model="curItem.style.backgroundRepeat">
                        <el-radio label="repeat">重复</el-radio>
                        <el-radio label="no-repeat">不重复</el-radio>
                        <el-radio label="repeat-x">水平重复</el-radio>
                        <el-radio label="repeat-y">垂直重复</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item v-if="curItem.style.bgImage" label="背景宽度">
                      <el-slider
                        v-model="curItem.style.backgroundWidth"
                        :min="0"
                        :max="1200"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item v-if="curItem.style.bgImage" label="背景高度">
                      <el-slider
                        v-model="curItem.style.backgroundHeight"
                        :min="0"
                        :max="300"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item v-if="curItem.style.bgImage" label="背景位置">
                      <el-radio-group
                        v-model="curItem.style.backgroundPosition"
                      >
                        <el-radio label="center center">居中</el-radio>
                        <el-radio label="top left">左上</el-radio>
                        <el-radio label="top center">中上</el-radio>
                        <el-radio label="top right">右上</el-radio>
                        <el-radio label="left center">左中</el-radio>
                        <el-radio label="right center">右中</el-radio>
                        <el-radio label="left bottom">左下</el-radio>
                        <el-radio label="center bottom">中下</el-radio>
                        <el-radio label="right bottom">右下</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="布局方式">
                      <el-checkbox-group v-model="curItem.params.layout">
                        <el-checkbox label="left">显示左侧</el-checkbox>
                        <el-checkbox label="right">显示右侧</el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="是否居中">
                      <el-radio-group v-model="curItem.params.isCenter">
                        <el-radio :label="1">居中</el-radio>
                        <el-radio :label="0">不局中</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <div class="form-items">
                      <div
                        v-if="curItem.params.layout.includes('left')"
                        class="form-item"
                      >
                        <div class="item-inner">
                          <el-form-item label="选择图标">
                            <vab-image-input
                              v-model="curItem.data[0].image"
                            ></vab-image-input>
                          </el-form-item>
                          <el-form-item label="标题文本">
                            <el-input
                              v-model="curItem.data[0].text"
                              autocomplete="off"
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="跳转地址">
                            <el-input
                              v-model="curItem.data[0].link"
                              autocomplete="off"
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="字体大小">
                            <el-slider
                              v-model="curItem.data[0].size"
                              :min="12"
                              :max="50"
                            ></el-slider>
                          </el-form-item>
                          <el-form-item label="字体颜色">
                            <el-input
                              v-model="curItem.data[0].color"
                              type="color"
                            >
                              <el-button
                                slot="append"
                                @click.stop="
                                  onEditorResetColor(
                                    curItem.data[0],
                                    'color',
                                    '#ffffff'
                                  )
                                "
                              >
                                重置
                              </el-button>
                            </el-input>
                          </el-form-item>
                        </div>
                      </div>

                      <div
                        v-if="curItem.params.layout.includes('right')"
                        class="form-item"
                      >
                        <div class="item-inner">
                          <el-form-item label="选择图标">
                            <vab-image-input
                              v-model="curItem.data[1].image"
                            ></vab-image-input>
                          </el-form-item>
                          <el-form-item label="标题文本">
                            <el-input
                              v-model="curItem.data[1].text"
                              autocomplete="off"
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="跳转地址">
                            <el-input
                              v-model="curItem.data[1].link"
                              autocomplete="off"
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="字体大小">
                            <el-slider
                              v-model="curItem.data[1].size"
                              :min="12"
                              :max="50"
                            ></el-slider>
                          </el-form-item>
                          <el-form-item label="字体颜色">
                            <el-input
                              v-model="curItem.data[1].color"
                              type="color"
                            >
                              <el-button
                                slot="append"
                                @click.stop="
                                  onEditorResetColor(
                                    curItem.data[1],
                                    'color',
                                    '#ffffff'
                                  )
                                "
                              >
                                重置
                              </el-button>
                            </el-input>
                          </el-form-item>
                        </div>
                      </div>
                    </div>
                  </el-form>
                </div>

                <!-- 编辑器: 公告组 -->
                <div v-if="curItem.type == 'notice'" id="tpl_editor_notice">
                  <part-header>
                    <span slot="title">{{ curItem.name }}</span>
                  </part-header>
                  <div class="header-line"></div>
                  <el-form class="diy-editor-form" label-width="80px">
                    <el-form-item label="上下边距">
                      <el-slider
                        v-model="curItem.style.paddingTop"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="左右边距">
                      <el-slider
                        v-model="curItem.style.paddingLeft"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="行内高度">
                      <el-slider
                        v-model="curItem.style.height"
                        :min="0"
                        :max="200"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="圆角边框">
                      <el-slider
                        v-model="curItem.style.borderRadius"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="公告图标">
                      <vab-image-input
                        v-model="curItem.params.image"
                        :hide-delete="true"
                      ></vab-image-input>
                    </el-form-item>
                    <el-form-item label="背景颜色">
                      <el-input v-model="curItem.style.background" type="color">
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'background',
                              '#ffffff'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="字体颜色">
                      <el-input v-model="curItem.style.color" type="color">
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(curItem.style, 'color', '#000')
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="字体大小">
                      <el-slider
                        v-model="curItem.style.fontSize"
                        :min="10"
                        :max="36"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="动态消息">
                      <el-tooltip
                        :content="curItem.params.newsMessage ? '开启' : '关闭'"
                        :enterable="false"
                        placement="top"
                      >
                        <el-switch
                          v-model="curItem.params.newsMessage"
                          active-color="#13ce66"
                          inactive-color="#ff4949"
                        ></el-switch>
                      </el-tooltip>
                      <div class="remark">
                        开启后除了显示固定公告外，还会展示系统生成的实时消息
                      </div>
                    </el-form-item>
                    <div class="form-items">
                      <draggable
                        :list="curItem.data"
                        :options="{
                          animation: 120,
                          filter: 'input',
                          preventOnFilter: false,
                        }"
                      >
                        <div
                          v-for="(item, index) in curItem.data"
                          :key="index"
                          class="form-item"
                        >
                          <vab-remix-icon
                            icon-class="close-line iconfont icon-shanchu item-delete"
                            @click="onEditorDeleleData(index, selectedIndex)"
                          ></vab-remix-icon>
                          <div class="item-inner">
                            <el-form-item label="公告内容">
                              <el-input
                                v-model="item.text"
                                autocomplete="off"
                              ></el-input>
                            </el-form-item>
                            <el-form-item label="跳转地址">
                              <el-input
                                v-model="item.link"
                                autocomplete="off"
                              ></el-input>
                            </el-form-item>
                          </div>
                        </div>
                      </draggable>
                    </div>
                    <el-button
                      icon="el-icon-plus"
                      style="width: 100%"
                      type="primary"
                      @click="onEditorAddData"
                    >
                      添加一个
                    </el-button>
                  </el-form>
                </div>

                <!--编辑器: 导航组-->
                <div v-if="curItem.type == 'navBar'" id="tpl_editor_navBar">
                  <part-header>
                    <span slot="title">{{ curItem.name }}</span>
                  </part-header>
                  <div class="header-line"></div>
                  <el-form class="diy-editor-form" label-width="80px">
                    <el-form-item label="上下边距">
                      <el-slider
                        v-model="curItem.style.paddingTop"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="左右边距">
                      <el-slider
                        v-model="curItem.style.paddingLeft"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="图标大小">
                      <el-slider
                        v-model="curItem.style.imageSize"
                        :min="10"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="字体大小">
                      <el-slider
                        v-model="curItem.style.fontSize"
                        :min="10"
                        :max="36"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="背景颜色">
                      <el-input v-model="curItem.style.background" type="color">
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'background',
                              '#ffffff'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="每行数量">
                      <el-radio-group v-model="curItem.params.rowsNum">
                        <el-radio style="padding: 6px 0" label="3">
                          3个
                        </el-radio>
                        <el-radio style="padding: 6px 0" label="4">
                          4个
                        </el-radio>
                        <el-radio style="padding: 6px 0" label="5">
                          5个
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <div class="form-items">
                      <draggable
                        :list="curItem.data"
                        :options="{
                          animation: 120,
                          filter: 'input',
                          preventOnFilter: false,
                        }"
                      >
                        <div
                          v-for="(item, index) in curItem.data"
                          :key="index"
                          class="form-item"
                        >
                          <vab-remix-icon
                            icon-class="close-line iconfont icon-shanchu item-delete"
                            @click="onEditorDeleleData(index, selectedIndex)"
                          ></vab-remix-icon>
                          <div class="item-inner">
                            <el-form-item label="导航图标">
                              <vab-image-input
                                v-model="item.image"
                                :hide-delete="true"
                              ></vab-image-input>
                            </el-form-item>
                            <el-form-item label="导航标题">
                              <el-input
                                v-model="item.text"
                                autocomplete="off"
                              ></el-input>
                            </el-form-item>
                            <el-form-item label="标题颜色">
                              <el-input v-model="item.color" type="color">
                                <el-button
                                  slot="append"
                                  @click.stop="
                                    onEditorResetColor(item, 'color', '#000')
                                  "
                                >
                                  重置
                                </el-button>
                              </el-input>
                            </el-form-item>
                            <el-form-item label="跳转地址">
                              <el-input
                                v-model="item.link"
                                autocomplete="off"
                              ></el-input>
                            </el-form-item>
                          </div>
                        </div>
                      </draggable>
                    </div>
                    <el-button
                      icon="el-icon-plus"
                      style="width: 100%"
                      type="primary"
                      @click="onEditorAddData"
                    >
                      添加一个
                    </el-button>
                  </el-form>
                </div>
                <!--编辑器: 推荐游戏-->
                <div
                  v-if="curItem.type == 'singleGame'"
                  id="tpl_editor_single_game"
                >
                  <part-header>
                    <span slot="title">{{ curItem.name }}</span>
                  </part-header>
                  <div class="header-line"></div>
                  <el-form class="diy-editor-form" label-width="96px">
                    <div style="padding-bottom: 18px; padding-left: 20px">
                      <el-button
                        style="width: 99%"
                        type="primary"
                        plain
                        @click="showSelectSingleGame(curItem)"
                      >
                        选择游戏
                      </el-button>
                    </div>
                    <el-form-item label="上下外边距">
                      <el-slider
                        v-model="curItem.style.marginTop"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="左右外边距">
                      <el-slider
                        v-model="curItem.style.marginLeft"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="背景颜色">
                      <el-input v-model="curItem.style.background" type="color">
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'background',
                              '#000'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="游戏图标圆角">
                      <el-slider
                        v-model="curItem.style.logoBorderRadius"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="游戏图片圆角">
                      <el-slider
                        v-model="curItem.style.imgBorderRadius"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>

                    <el-form-item label="标题字体">
                      <el-slider
                        v-model="curItem.style.titleFontSize"
                        :min="10"
                        :max="36"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="标题颜色">
                      <el-input
                        v-model="curItem.style.titleFontColor"
                        type="color"
                      >
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'titleFontColor',
                              '#000'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="描述字体">
                      <el-slider
                        v-model="curItem.style.descFontSize"
                        :min="10"
                        :max="36"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="描述颜色">
                      <el-input
                        v-model="curItem.style.descFontColor"
                        type="color"
                      >
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'descFontColor',
                              '#000'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="人数字体">
                      <el-slider
                        v-model="curItem.style.peopleFontSize"
                        :min="10"
                        :max="36"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="人数颜色">
                      <el-input
                        v-model="curItem.style.peopleFontColor"
                        type="color"
                      >
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'peopleFontColor',
                              '#000'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="按钮文字">
                      <el-input v-model="curItem.style.buttonText"></el-input>
                    </el-form-item>
                    <el-form-item label="按钮文字大小">
                      <el-slider
                        v-model="curItem.style.buttonFontSize"
                        :min="10"
                        :max="36"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="按钮文字颜色">
                      <el-input
                        v-model="curItem.style.buttonColor"
                        type="color"
                      >
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'buttonColor',
                              '#fff'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="按钮背景颜色">
                      <el-input
                        v-model="curItem.style.buttonBackground"
                        type="color"
                      >
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'buttonBackground',
                              '#000'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="按钮圆角边框">
                      <el-slider
                        v-model="curItem.style.buttonRadius"
                        :min="0"
                        :max="50"
                      ></el-slider>
                    </el-form-item>

                    <div class="form-items">
                      <div v-if="curItem.data.game" class="form-item">
                        <div class="item-inner">
                          <el-image
                            style="width: 60px"
                            :preview-src-list="[
                              curItem.data.game.thumbnail.url || null,
                            ]"
                            :src="curItem.data.game.thumbnail.url || null"
                          ></el-image>
                          <span style="vertical-align: top; padding: 10px">
                            {{ curItem.data.game.name || "" }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </el-form>
                </div>

                <!--编辑器: 游戏组-->
                <div v-if="curItem.type == 'game'" id="tpl_editor_game">
                  <part-header>
                    <span slot="title">{{ curItem.name }}</span>
                  </part-header>
                  <div class="header-line"></div>
                  <el-form class="diy-editor-form" label-width="96px">
                    <div style="padding-bottom: 18px; padding-left: 20px">
                      <el-button
                        style="width: 99%"
                        type="primary"
                        plain
                        @click="showSelectGame(curItem)"
                      >
                        添加游戏
                      </el-button>
                    </div>
                    <el-form-item label="上下外边距">
                      <el-slider
                        v-model="curItem.style.marginTop"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="左右外边距">
                      <el-slider
                        v-model="curItem.style.marginLeft"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="上下内边距">
                      <el-slider
                        v-model="curItem.style.paddingTop"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="左右内边距">
                      <el-slider
                        v-model="curItem.style.paddingLeft"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="圆角边框">
                      <el-slider
                        v-model="curItem.style.borderRadius"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="背景颜色">
                      <el-input v-model="curItem.style.background" type="color">
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'background',
                              '#000'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="边框大小">
                      <el-slider
                        v-model="curItem.style.borderSize"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="边框颜色">
                      <el-input
                        v-model="curItem.style.borderColor"
                        type="color"
                      >
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'borderColor',
                              '#000'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="按钮图片">
                      <vab-image-input
                        v-model="curItem.image"
                      ></vab-image-input>
                    </el-form-item>
                    <el-form-item label="图片圆角">
                      <el-slider
                        v-model="curItem.style.imgBorderRadius"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="标题字体">
                      <el-slider
                        v-model="curItem.style.titleFontSize"
                        :min="10"
                        :max="36"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="标题颜色">
                      <el-input
                        v-model="curItem.style.titleFontColor"
                        type="color"
                      >
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'titleFontColor',
                              '#000'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="描述字体">
                      <el-slider
                        v-model="curItem.style.descFontSize"
                        :min="10"
                        :max="36"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="描述颜色">
                      <el-input
                        v-model="curItem.style.descFontColor"
                        type="color"
                      >
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'descFontColor',
                              '#000'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="人数字体">
                      <el-slider
                        v-model="curItem.style.peopleFontSize"
                        :min="10"
                        :max="36"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="人数颜色">
                      <el-input
                        v-model="curItem.style.peopleFontColor"
                        type="color"
                      >
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'peopleFontColor',
                              '#000'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <div class="form-items">
                      <draggable
                        :list="curItem.data"
                        :options="{
                          animation: 120,
                          filter: 'input',
                          preventOnFilter: false,
                        }"
                      >
                        <div
                          v-for="(item, index) in curItem.data"
                          :key="index"
                          class="form-item"
                        >
                          <vab-remix-icon
                            icon-class="close-line iconfont icon-shanchu item-delete"
                            @click="onEditorDeleleData(index, selectedIndex)"
                          ></vab-remix-icon>
                          <div class="item-inner">
                            <el-image
                              style="width: 60px"
                              :preview-src-list="[item.game.thumbnail.url]"
                              :src="item.game.thumbnail.url"
                            ></el-image>
                            <span style="vertical-align: top; padding: 10px">
                              {{ item.game.name }}
                            </span>
                          </div>
                        </div>
                      </draggable>
                    </div>
                  </el-form>
                </div>

                <!--编辑器: 商品奖品-->
                <div
                  v-if="curItem.type == 'gameGoodsPrize'"
                  id="tpl_editor_gameGoodsPrize"
                >
                  <part-header>
                    <span slot="title">{{ curItem.name }}</span>
                  </part-header>
                  <div class="header-line"></div>
                  <el-form class="diy-editor-form" label-width="96px">
                    <div style="padding-bottom: 18px; padding-left: 20px">
                      <el-button
                        style="width: 99%"
                        type="primary"
                        plain
                        @click="showSelectPrizeGoods(curItem)"
                      >
                        添加商品奖品
                      </el-button>
                    </div>
                    <!-- <el-form-item label="分列数量">
                    <el-radio-group v-model="curItem.params.column">
                      <el-radio :label="1">单列</el-radio>
                      <el-radio :label="2">两列</el-radio>
                    </el-radio-group>
                  </el-form-item> -->
                    <el-form-item label="上下外边距">
                      <el-slider
                        v-model="curItem.style.marginTop"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="左右外边距">
                      <el-slider
                        v-model="curItem.style.marginLeft"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="上下内边距">
                      <el-slider
                        v-model="curItem.style.paddingTop"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="左右内边距">
                      <el-slider
                        v-model="curItem.style.paddingLeft"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="商品间距">
                      <el-slider
                        v-model="curItem.style.columnSpacing"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="圆角边框">
                      <el-slider
                        v-model="curItem.style.borderRadius"
                        :min="0"
                        :max="20"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="背景颜色">
                      <el-input v-model="curItem.style.background" type="color">
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'background',
                              '#000'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="标题字体">
                      <el-slider
                        v-model="curItem.style.titleFontSize"
                        :min="10"
                        :max="36"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="标题颜色">
                      <el-input
                        v-model="curItem.style.titleFontColor"
                        type="color"
                      >
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'titleFontColor',
                              '#000'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="市场价字体">
                      <el-slider
                        v-model="curItem.style.linePriceFontSize"
                        :min="10"
                        :max="36"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="市场价颜色">
                      <el-input
                        v-model="curItem.style.linePriceFontColor"
                        type="color"
                      >
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'linePriceFontColor',
                              '#000'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="销售价字体">
                      <el-slider
                        v-model="curItem.style.priceFontSize"
                        :min="10"
                        :max="36"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="销售价颜色">
                      <el-input
                        v-model="curItem.style.priceFontColor"
                        type="color"
                      >
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'priceFontColor',
                              '#000'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="按钮文字">
                      <el-input v-model="curItem.style.buttonText"></el-input>
                    </el-form-item>
                    <el-form-item label="按钮文字大小">
                      <el-slider
                        v-model="curItem.style.buttonFontSize"
                        :min="10"
                        :max="36"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="按钮文字颜色">
                      <el-input
                        v-model="curItem.style.buttonColor"
                        type="color"
                      >
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'buttonColor',
                              '#fff'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="按钮背景颜色">
                      <el-input
                        v-model="curItem.style.buttonBackground"
                        type="color"
                      >
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'buttonBackground',
                              '#000'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="按钮圆角边框">
                      <el-slider
                        v-model="curItem.style.buttonRadius"
                        :min="0"
                        :max="50"
                      ></el-slider>
                    </el-form-item>
                    <div class="form-items">
                      <draggable
                        :list="curItem.data"
                        :options="{
                          animation: 120,
                          filter: 'input',
                          preventOnFilter: false,
                        }"
                      >
                        <div
                          v-for="(item, index) in curItem.data"
                          :key="index"
                          class="form-item"
                        >
                          <vab-remix-icon
                            icon-class="close-line iconfont icon-shanchu item-delete"
                            @click="onEditorDeleleData(index, selectedIndex)"
                          ></vab-remix-icon>
                          <div class="item-inner">
                            <el-form-item label="展示奖品">
                              <el-image
                                :preview-src-list="[item.goods.thumbnail.url]"
                                :src="item.goods.thumbnail.url"
                              ></el-image>
                            </el-form-item>
                          </div>
                        </div>
                      </draggable>
                    </div>
                  </el-form>
                </div>

                <!--编辑器: 选择商品-->
                <div v-if="curItem.type == 'goods'" id="tpl_editor_goods">
                  <part-header>
                    <span slot="title">{{ curItem.name }}</span>
                  </part-header>
                  <div class="header-line"></div>
                  <el-form class="diy-editor-form" label-width="96px">
                    <div style="padding-bottom: 18px; padding-left: 20px">
                      <el-button
                        style="width: 99%"
                        type="primary"
                        plain
                        @click="showSelectGoods(curItem)"
                      >
                        添加商品
                      </el-button>
                    </div>
                    <el-form-item label="分列数量">
                      <el-radio-group v-model="curItem.params.column">
                        <el-radio :label="1">单列</el-radio>
                        <el-radio :label="2">两列</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="上下外边距">
                      <el-slider
                        v-model="curItem.style.marginTop"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="左右外边距">
                      <el-slider
                        v-model="curItem.style.marginLeft"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="上下内边距">
                      <el-slider
                        v-model="curItem.style.paddingTop"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="左右内边距">
                      <el-slider
                        v-model="curItem.style.paddingLeft"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="商品间距">
                      <el-slider
                        v-model="curItem.style.columnSpacing"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="圆角边框">
                      <el-slider
                        v-model="curItem.style.borderRadius"
                        :min="0"
                        :max="20"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="背景颜色">
                      <el-input v-model="curItem.style.background" type="color">
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'background',
                              '#000'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="标题字体">
                      <el-slider
                        v-model="curItem.style.titleFontSize"
                        :min="10"
                        :max="36"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="标题颜色">
                      <el-input
                        v-model="curItem.style.titleFontColor"
                        type="color"
                      >
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'titleFontColor',
                              '#000'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="卖点字体">
                      <el-slider
                        v-model="curItem.style.descFontSize"
                        :min="10"
                        :max="36"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="卖点颜色">
                      <el-input
                        v-model="curItem.style.descFontColor"
                        type="color"
                      >
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'descFontColor',
                              '#000'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="市场价字体">
                      <el-slider
                        v-model="curItem.style.linePriceFontSize"
                        :min="10"
                        :max="36"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="市场价颜色">
                      <el-input
                        v-model="curItem.style.linePriceFontColor"
                        type="color"
                      >
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'linePriceFontColor',
                              '#000'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="销售价字体">
                      <el-slider
                        v-model="curItem.style.priceFontSize"
                        :min="10"
                        :max="36"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="销售价颜色">
                      <el-input
                        v-model="curItem.style.priceFontColor"
                        type="color"
                      >
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'priceFontColor',
                              '#000'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>

                    <el-form-item label="销量字体">
                      <el-slider
                        v-model="curItem.style.salesFontSize"
                        :min="10"
                        :max="36"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="销量颜色">
                      <el-input
                        v-model="curItem.style.salesFontColor"
                        type="color"
                      >
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'salesFontColor',
                              '#000'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>

                    <div class="form-items">
                      <draggable
                        :list="curItem.data"
                        :options="{
                          animation: 120,
                          filter: 'input',
                          preventOnFilter: false,
                        }"
                      >
                        <div
                          v-for="(item, index) in curItem.data"
                          :key="index"
                          class="form-item"
                        >
                          <vab-remix-icon
                            icon-class="close-line iconfont icon-shanchu item-delete"
                            @click="onEditorDeleleData(index, selectedIndex)"
                          ></vab-remix-icon>
                          <div class="item-inner">
                            <el-form-item label="展示商品">
                              <el-image
                                :preview-src-list="[item.goods.thumbnail.url]"
                                :src="item.goods.thumbnail.url"
                              ></el-image>
                            </el-form-item>
                          </div>
                        </div>
                      </draggable>
                    </div>
                  </el-form>
                </div>

                <!--编辑器: 富文本-->
                <div v-if="curItem.type == 'richText'" id="tpl_editor_richText">
                  <part-header>
                    <span slot="title">{{ curItem.name }}</span>
                  </part-header>
                  <div class="header-line"></div>
                  <el-form class="diy-editor-form" label-width="96px">
                    <el-form-item label="上下边距">
                      <el-slider
                        v-model="curItem.style.paddingTop"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="左右边距">
                      <el-slider
                        v-model="curItem.style.paddingLeft"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="背景颜色">
                      <el-input v-model="curItem.style.background" type="color">
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'background',
                              '#ffffff'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                  </el-form>
                  <vab-editor
                    ref="content-editor"
                    v-model="curItem.params.content"
                    :height="300"
                  />
                </div>

                <!--编辑器: 辅助空白-->
                <div v-if="curItem.type == 'blank'" id="tpl_editor_blank">
                  <part-header>
                    <span slot="title">{{ curItem.name }}</span>
                  </part-header>
                  <div class="header-line"></div>
                  <el-form class="diy-editor-form" label-width="96px">
                    <el-form-item label="背景颜色">
                      <el-input v-model="curItem.style.background" type="color">
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'background',
                              '#ffffff'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="组件高度">
                      <el-slider
                        v-model="curItem.style.height"
                        :min="1"
                        :max="200"
                      ></el-slider>
                    </el-form-item>
                  </el-form>
                </div>

                <!--编辑器: 辅助线-->
                <div v-if="curItem.type == 'guide'" id="tpl_editor_guide">
                  <part-header>
                    <span slot="title">{{ curItem.name }}</span>
                  </part-header>
                  <div class="header-line"></div>
                  <el-form class="diy-editor-form" label-width="96px">
                    <el-form-item label="背景颜色">
                      <el-input v-model="curItem.style.background" type="color">
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'background',
                              '#ffffff'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>

                    <el-form-item label="线条样式">
                      <el-radio-group v-model="curItem.style.lineStyle">
                        <el-radio style="padding: 6px 0" label="solid">
                          实线
                        </el-radio>
                        <el-radio style="padding: 6px 0" label="dashed">
                          虚线
                        </el-radio>
                        <el-radio style="padding: 6px 0" label="dotted">
                          点状
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>

                    <el-form-item label="线条颜色">
                      <el-input v-model="curItem.style.lineColor" type="color">
                        <el-button
                          slot="append"
                          @click.stop="
                            onEditorResetColor(
                              curItem.style,
                              'lineColor',
                              '#000000'
                            )
                          "
                        >
                          重置
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="上下边距">
                      <el-slider
                        v-model="curItem.style.paddingTop"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="左右边距">
                      <el-slider
                        v-model="curItem.style.paddingLeft"
                        :min="0"
                        :max="100"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="线条高度">
                      <el-slider
                        v-model="curItem.style.lineHeight"
                        :min="1"
                        :max="20"
                      ></el-slider>
                    </el-form-item>
                  </el-form>
                </div>
              </template>
            </div>
          </div>
          <!-- 提示 -->
          <!-- <div class="tips am-margin-top-lg am-margin-bottom-sm">
          <div class="pre">
            <p>
              1.
              设计完成后点击&quot;保存页面&quot;，在小程序端页面下拉刷新即可看到效果。
            </p>
            <p>
              2. 如需填写链接地址请参考
              <a href="&lt;?= url('wxapp.page/links') ?&gt;" target="_blank">
                页面链接
              </a>
            </p>
          </div>
        </div> -->
        </div>
      </div>
    </div>
    <select-goods
      ref="selectPrizeGoods"
      :ids="goodsPrizeList.map((item) => item.goods_id)"
      :multiple-choice="true"
      @select="selectedPrizeGoods"
    ></select-goods>
    <select-goods
      ref="selectGoods"
      :multiple-choice="true"
      @select="selectedGoods"
    ></select-goods>
    <select-game
      ref="selectGame"
      :multiple-choice="true"
      @select="selectedGame"
      @cancel="cancelSelectGame"
      @showPreview="showSelectPreview"
    ></select-game>
    <select-game
      ref="selectSingleGame"
      @select="selectedSingleGame"
      @cancel="cancelSelectGame"
      @showPreview="showSelectPreview"
    ></select-game>
  </div>
</template>
<script>
  import { diyData, defaultData } from "./data";
  import {
    getGamePrizeList,
    getGameListByIds,
    getGameDetail,
  } from "@/api/game";
  import { doUpdate, doCreate, getDetail } from "@/api/page";
  import { getList as getGoodsList } from "@/api/goods";
  import { VabPlayerMp4 } from "@/extra/Player";
  import { uuid } from "@/utils/index";
  import VabImageInput from "@/extra/Upload/ImageInput";
  import VabEditor from "@/extra/Editor";
  import SelectGoods from "../goods/index/components/SelectGoods";
  import SelectGame from "../game/activity/components/SelectGame";

  export default {
    name: "DiyIndex",
    components: {
      VabEditor,
      VabImageInput,
      VabPlayerMp4,
      SelectGoods,
      SelectGame,
    },
    data() {
      return {
        merchant: this.$store.getters["passport/merchant"],
        order: 0,
        showPage: true,
        pageId: null,
        pageType: 0,
        goodsCurItem: null,
        prizeGoodsCurItem: null,
        gameCurItem: null,
        goodsPrizeList: [],
        showVideo: true,
        curItem: {},
        selectedIndex: -1,
        diyData: {
          page: {
            style: {},
            params: {},
          },
          items: [],
        },
        defaultData: {},
      };
    },
    computed: {
      pageHeaderBackground() {
        const url = require(`@/assets/diy/phone-top-${
          this.diyData.page.style.titleTextColor || "light"
        }.png`);
        return `${this.diyData.page.style.titleBackgroundColor} url(${url}) no-repeat center / contain`;
      },
    },
    watch: {
      $route: {
        handler(route) {
          this.pageId = (route.query && route.query.id) || null;
        },
        immediate: true,
      },
    },
    async mounted() {
      // 解决火狐浏览器拖动新增tab
      document.body.ondrop = function (event) {
        event.preventDefault();
        event.stopPropagation();
      };
      this.defaultData = this.$baseLodash.cloneDeep(defaultData);
      await this.fetchData(this.pageId);
      const goodsPrizeList = await getGamePrizeList({ page_size: 1000 });
      this.goodsPrizeList = goodsPrizeList.data.rows;
    },
    methods: {
      pageback() {
        this.$router.push("/design/page");
      },
      showSelectPreview() {
        this.showPage = false;
      },
      cancelSelectGame() {
        this.showPage = true;
      },
      async fetchData() {
        let rawDiyData = null;
        if (!this.pageId) {
          rawDiyData = this.$baseLodash.cloneDeep(diyData);
        } else {
          const detail = await getDetail(this.pageId);
          rawDiyData = detail.data || this.$baseLodash.cloneDeep(diyData);
          this.pageType = detail.type || 0;
          this.order = detail.order;
        }
        for (const item of rawDiyData.items) {
          this.imageDataFormat(item.type, item);
          if (item.type === "gameGoodsPrize" || item.type === "goods") {
            const { data } = await getGoodsList(
              { page_size: 500 },
              item.data.map((val) => val.goodsId)
            );
            if (data && data.rows) {
              item.data.forEach((val) => {
                const goods = data.rows.find((v) => v.id === val.goodsId);
                if (goods) {
                  val.goods = goods;
                }
              });
            }
          }
          if (item.type === "game") {
            const { data } = await getGameListByIds(
              item.data.map((val) => val.gameId)
            );
            if (data && data.rows && data.rows.length) {
              item.data.forEach((val) => {
                const game = data.rows.find((v) => v.id === val.gameId);
                if (game) {
                  val.game = game;
                }
              });
            }
          }
          if (item.type === "singleGame") {
            const { data } = await getGameDetail(item.data.gameId);
            item.data.game = data;
          }
        }
        console.log(rawDiyData);
        this.diyData = rawDiyData;
      },
      async savePageData() {
        const data = this.$baseLodash.cloneDeep(this.diyData);
        data.items.forEach((item) => {
          switch (item.type) {
            case "imageSingle":
            case "banner":
            case "window":
            case "navBar":
              item.data.forEach((val) => {
                val.imgUrl = val.image.url;
                delete val.image;
              });
              break;
            case "titleLink":
              item.style.backgroundImage = item.style.bgImage
                ? item.style.bgImage.url
                : "";
              item.data.forEach((val) => {
                val.icon = val.image ? val.image.url : "";
                delete val.image;
              });
              break;
            case "video":
              item.params.poster = item.params.image.url;
              delete item.params.image;
              break;
            case "notice":
              item.params.icon = item.params.image.url;
              delete item.params.image;
              break;
            case "game":
              item.style.buttonImgUrl = item.image.url;
              delete item.image;
              item.data.forEach((val) => delete val.game);
              break;
            case "singleGame":
              delete item.data.game;
              break;
            case "goods":
            case "gameGoodsPrize":
              item.data.forEach((val) => delete val.goods);
              break;
          }
        });
        console.log(JSON.stringify(data));
        if (!this.pageId) {
          await doCreate({
            order: this.order,
            name: data.page.params.name,
            type: this.pageType,
            data: JSON.stringify(data),
          });
          this.pageback();
          this.$baseMessage("新增页面成功", "success");
        } else {
          await doUpdate(this.pageId, {
            order: this.order,
            name: data.page.params.name,
            type: this.pageType,
            data: JSON.stringify(data),
          });
          this.$baseMessage("修改页面成功", "success");
        }
      },
      spliceNumberArray(n, m) {
        const b = [];
        for (let i = 0; i < n; i++) {
          if (i < m) {
            if (!b[0]) {
              b[0] = [];
            }
            b[0].push(i);
          } else {
            const index = Math.floor(i / m);
            if (!b[index]) {
              b[index] = [];
            }
            b[index].push(i);
          }
        }
        return b;
      },
      showSelectGoods(curItem) {
        this.goodsCurItem = curItem;
        this.$refs["selectGoods"].show();
      },
      showSelectPrizeGoods(curItem) {
        this.prizeGoodsCurItem = curItem;
        this.$refs["selectPrizeGoods"].show();
      },
      showSelectGame(curItem) {
        this.gameCurItem = curItem;
        this.$refs["selectGame"].show();
      },
      showSelectSingleGame(curItem) {
        this.gameCurItem = curItem;
        this.$refs["selectSingleGame"].show();
      },
      selectedGoods(data) {
        for (const goodsInfo of data) {
          this.goodsCurItem.data.push({
            goodsId: goodsInfo.id,
            goods: goodsInfo,
          });
        }
      },
      selectedPrizeGoods(data) {
        for (const goodsInfo of data) {
          const game =
            this.goodsPrizeList.find(
              (item) => item.goods_id === goodsInfo.id
            ) || {};
          if (!game.admin_game_id) {
            continue;
          }
          this.prizeGoodsCurItem.data.push({
            type: "goods",
            gameId: game.admin_game_id,
            goodsId: game.goods_id,
            goods: goodsInfo,
          });
        }
      },
      selectedGame(data) {
        for (const gameInfo of data) {
          this.gameCurItem.data.push({
            gameId: gameInfo.id,
            game: gameInfo,
          });
        }
      },
      async selectedSingleGame(gameInfo) {
        this.gameCurItem.data.gameId = gameInfo.id;
        this.gameCurItem.data.game = gameInfo;
        const { data } = await getGameDetail(gameInfo.id);
        this.gameCurItem.data.game.images = data ? data.images : [];
        this.$forceUpdate();
      },
      rerenderVideo() {
        this.showVideo = false;
        setTimeout(() => {
          this.showVideo = true;
        }, 100);
      },
      imageDataFormat(key, data) {
        let imageKey;
        const keys = ["banner", "imageSingle", "window", "titleLink", "navBar"];
        switch (key) {
          case "titleLink":
            imageKey = "icon";
            break;
          default:
            imageKey = "imgUrl";
        }
        if (keys.includes(key)) {
          data.data.forEach((item) => {
            if (item[imageKey]) {
              item.image = {
                url: item[imageKey],
              };
            }
          });
        }
        if (key === "video") {
          data.params.id = uuid();
          if (data.params.poster) {
            data.params.image = {
              url: data.params.poster,
            };
          }
        }
        if (key === "gameGoodsPrize") {
          data.data.forEach((item) => {
            item.goods = {
              thumbnail: {},
              skus: [{}],
            };
          });
        }
        if (key === "game") {
          data.image = {
            url: data.style.buttonImgUrl,
          };
          data.data.forEach((item) => {
            item.game = {
              thumbnail: {},
            };
          });
        }
        if (key === "notice") {
          if (data.params.icon) {
            data.params.image = {
              url: data.params.icon,
            };
          }
        }
        if (key === "titleLink") {
          if (data.style.backgroundImage) {
            data.style.bgImage = {
              url: data.style.backgroundImage,
            };
          }
        }
        return data;
      },

      /**
       * 新增Diy组件
       * @param key
       */
      onAddItem: function (key, dataKey) {
        // 复制默认diy组件数据
        let data = this.$baseLodash.cloneDeep(this.defaultData[dataKey || key]);
        // 新增到diy列表数据
        data = this.imageDataFormat(key, data);
        this.diyData.items.push(data);
        // 编辑当前选中的元素
        this.onEditer(this.diyData.items.length - 1);
      },

      onEditorResetColor: function (holder, attribute, color) {
        holder[attribute] = color;
      },

      /**
       * 拖动diy元素更新当前索引
       * @param e
       */
      onDragItemEnd: function (e) {
        this.onEditer(e.newIndex);
      },

      /**
       * 编辑当前选中的Diy元素
       * @param index
       */
      onEditer: function (index) {
        // 记录当前选中元素的索引
        this.selectedIndex = index;
        // 当前选中的元素数据
        this.curItem =
          this.selectedIndex === "page"
            ? this.diyData.page
            : this.diyData.items[this.selectedIndex];
      },

      /**
       * 删除diy元素
       * @param index
       */
      onDeleleItem: function (index) {
        this.$baseConfirm("确定要删除吗？", null, async () => {
          this.diyData.items.splice(index, 1);
          this.selectedIndex = -1;
        });
      },

      /**
       * 编辑器：删除data元素
       * @param index
       * @param selectedIndex
       */
      onEditorDeleleData: function (index, selectedIndex) {
        if (this.diyData.items[selectedIndex].data.length <= 1) {
          this.$baseMessage("至少保留一个", "error");
          return false;
        }
        this.diyData.items[selectedIndex].data.splice(index, 1);
      },

      /**
       * 编辑器：添加data元素
       */
      onEditorAddData: function () {
        // 新增data数据
        let data = this.$baseLodash.cloneDeep(defaultData[this.curItem.type]);
        data = this.imageDataFormat(this.curItem.type, data);
        this.curItem.data.push(data.data[0]);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "./diy.scss";
  .header-line {
    border-top: 1px solid #eef1f5;
  }
  .data-list {
    list-style: none;
  }
  .remark {
    font-size: 13px;
    color: #838fa1;
  }
  .diy-editor-form {
    width: 94%;
    margin-top: 20px;
  }
  .diy-titleLink {
    overflow: hidden;
    .title-link-left {
      float: left;
      display: flex;
      align-items: center;
    }
    .title-link-right {
      float: right;
      text-align: right;
      display: flex;
      align-items: center;
    }
    span,
    img {
      vertical-align: middle;
      padding-bottom: 1px;
    }
  }
</style>
