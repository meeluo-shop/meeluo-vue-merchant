<template>
  <div>
    <el-row>
      <el-col :span="24">
        <part-header>
          <span slot="title">{{ title }}</span>
          <el-button slot="right" @click="cancel">返回</el-button>
        </part-header>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row style="padding-top: 10px">
      <el-col :lg="20">
        <el-form
          ref="form"
          v-loading="listLoading"
          :label-position="labelPosition"
          label-width="160px"
        >
          <el-form-item required label="游戏名称">
            <el-input
              v-model="form.game.merchant_game.name"
              maxlength="200"
              @input="inputChange"
            ></el-input>
          </el-form-item>
          <el-form-item required label="是否启用">
            <el-radio-group v-model="form.game.merchant_game.is_active">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
            <div class="remark">禁用后，该游戏将不会显示给用户</div>
          </el-form-item>
          <el-form-item required label="游戏分类">
            <el-cascader
              v-model="categoryIds"
              disabled
              placeholder="请选择游戏分类"
              :options="categoryOptions"
              :props="{ checkStrictly: true }"
              clearable
            ></el-cascader>
          </el-form-item>
          <el-form-item required label="游戏缩略图">
            <vab-image-input v-model="gameThumbnail" disabled></vab-image-input>
          </el-form-item>
          <el-form-item v-if="gameImages.length > 0" label="游戏图片">
            <vab-image-list-input
              v-model="gameImages"
              disabled
              :max-length="6"
            ></vab-image-list-input>
          </el-form-item>
          <el-form-item required label="游戏简介">
            <el-input
              v-model.trim="form.game.merchant_game.description"
              type="textarea"
              autocomplete="off"
              rows="3"
              @input="inputChange"
            ></el-input>
          </el-form-item>

          <el-form-item required label="游戏类型">
            <el-radio-group v-model="form.game.is_winning">
              <el-radio disabled :label="1">赢奖游戏</el-radio>
              <el-radio disabled :label="0">免费游戏</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item required label="游戏规则介绍">
            <vab-editor
              ref="content-editor"
              v-model="form.game.merchant_game.rule"
              :height="300"
            />
          </el-form-item>
          <el-form-item required label="游戏挑战价格">
            <el-input-number
              v-model="form.activity.play_price"
              :min="0"
              maxlength="200"
            ></el-input-number>
            元
            <router-link to="/transaction/recharge/plan">
              <el-button class="setting-btn" type="primary" plain>
                充值管理
              </el-button>
            </router-link>
            <div class="remark">玩家每次挑战游戏的需要花费的价格</div>
          </el-form-item>
          <el-form-item required label="免费试玩次数">
            <el-input-number
              v-model="form.activity.free_num"
              maxlength="200"
            ></el-input-number>
            次
            <div class="remark">玩家每日可获得的免费挑战次数</div>
          </el-form-item>
          <el-form-item required label="公众号关注奖励次数">
            <el-input-number
              v-model="form.activity.follow_free_num"
              maxlength="200"
            ></el-input-number>
            次
            <el-button class="setting-btn" type="primary" plain>
              微信管理
            </el-button>
            <div class="remark">
              玩家首次关注公众号，并回复活动游戏名称，即可获得免费次数（未配置公众号则不会生效）
            </div>
          </el-form-item>
          <!-- <el-form-item required label="朋友圈分享奖励次数">
            <el-input-number
              v-model="form.activity.shared_free_num"
              maxlength="200"
            ></el-input-number>
            次
            <div class="remark">
              玩家每日分享一次游戏活动到朋友圈，即可获得免费次数
            </div>
          </el-form-item> -->
          <el-form-item required label="好友邀请奖励次数">
            <el-input-number
              v-model="form.activity.invited_free_num"
              maxlength="200"
            ></el-input-number>
            次
            <div class="remark">
              玩家分享游戏活动给微信好友，每有一个人参与，即可获得免费次数
            </div>
          </el-form-item>
          <el-form-item required label="好友邀请人数上限">
            <el-input-number
              v-model="form.activity.max_invited_num"
              maxlength="200"
            ></el-input-number>
            人
            <div class="remark">玩家每日邀请好友最多可获得奖励的人数</div>
          </el-form-item>
          <el-form-item v-if="form.game.unit" required label="游戏单位">
            <el-input
              v-model="form.game.unit"
              disabled
              maxlength="200"
            ></el-input>
            <div class="remark">例如：分、米、次、秒</div>
          </el-form-item>
          <el-form-item
            v-if="form.game.difficulty.length > 0"
            label="游戏推荐难度"
          >
            <el-table
              border
              :data="form.game.difficulty"
              style="margin-bottom: 12px"
            >
              <el-table-column prop="name" label="难度名称"></el-table-column>

              <el-table-column prop="remark" label="难度介绍"></el-table-column>

              <el-table-column prop="detail" label="难度范围">
                <template slot-scope="{ row }">
                  {{ Number(row.min_score).toFixed(2) }}{{ form.game.unit }} ~
                  {{ Number(row.max_score).toFixed(2) }}{{ form.game.unit }}
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item required label="游戏活动奖励">
            <el-button type="primary" @click="showAddPrize()">
              新增奖励
            </el-button>
            <el-table
              border
              :data="form.activity.prize_list"
              style="margin-bottom: 12px; margin-top: 14px"
            >
              <el-table-column prop="score" label="目标分数">
                <template slot-scope="{ row }">
                  {{ Number(row.score).toFixed(2) }}{{ form.game.unit }}
                </template>
              </el-table-column>

              <el-table-column prop="type" label="奖品类型">
                <template slot-scope="{ row }">
                  <el-tooltip
                    :content="row.type === 10 ? '商品' : '菜品'"
                    class="item"
                    effect="dark"
                    placement="top-start"
                  >
                    <el-tag :type="row.type === 10 ? 'primary' : 'success'">
                      {{ row.type === 10 ? "商品" : "菜品" }}
                    </el-tag>
                  </el-tooltip>
                </template>
              </el-table-column>

              <!-- <el-table-column prop="type" label="领奖方式">
                <template slot-scope="{ row }">
                  <el-tag
                    :type="row.get_methods === 10 ? 'primary' : 'warning'"
                  >
                    {{
                      row.type === 10
                        ? row.get_methods === 10
                          ? "店内领取"
                          : "邮寄配送"
                        : "自动发货"
                    }}
                  </el-tag>
                </template>
              </el-table-column> -->

              <el-table-column label="奖品名称">
                <template slot-scope="{ row }">
                  {{ row.prizeName }}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="150px">
                <template slot-scope="{ row }">
                  <el-button @click="showAddPrize(row)">编辑</el-button>
                  <el-button type="danger" @click="deletePrize(row)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveActivityGame">
              立即保存
            </el-button>
            <el-button type="danger" @click="cancel">取消保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <add-prize
      ref="addPrize"
      :label-position="labelPosition"
      @finish="addedPrize"
    ></add-prize>
  </div>
</template>

<script>
  import {
    updateActivity,
    doGameUpdate,
    createActivity,
    getGameDetail,
    getGameActivityDetail,
  } from "@/api/game";
  import VabImageInput from "@/extra/Upload/ImageInput";
  import VabImageListInput from "@/extra/Upload/ImageListInput";
  import VabEditor from "@/extra/Editor";
  import AddPrize from "./AddPrize";

  export default {
    name: "ActivityEdit",
    components: { AddPrize, VabEditor, VabImageInput, VabImageListInput },
    props: {},
    data() {
      return {
        gameThumbnail: null,
        gameImages: [],
        categoryIds: [],
        categoryOptions: [],
        listLoading: false,
        labelPosition: "right",
        type: 1,
        title: "",
        form: {
          game: {
            category: {},
            thumbnail: {},
            merchant_game: {},
            images: [],
            difficulty: [],
          },
          activity: {
            free_num: 3,
            play_price: 0,
            follow_free_num: 3,
            shared_free_num: 3,
            invited_free_num: 1,
            max_invited_num: 20,
            prize_list: [],
          },
        },
      };
    },
    watch: {
      gameThumbnail(thumbnail) {
        if (thumbnail) {
          this.form.game.thumbnail_id = thumbnail.id;
        }
      },
      gameImages(images) {
        this.form.game.image_ids = images.map((item) => item.id);
      },
    },
    methods: {
      inputChange(e) {
        this.$forceUpdate();
      },
      deletePrize(row) {
        let key = -1;
        this.form.activity.prize_list.forEach((item, index) => {
          if (item.score === row.score && item.type === row.type) {
            key = index;
          }
        });
        if (key >= 0) {
          this.form.activity.prize_list.splice(key, 1);
        }
      },
      showAddPrize(prize) {
        this.$refs["addPrize"].show(this.form, prize);
      },
      windowResize() {
        const that = this;
        window.onresize = () =>
          (() => {
            const width = document.body.clientWidth;
            if (width < 1000) {
              that.labelPosition = "top";
            } else {
              that.labelPosition = "right";
            }
          })();
        window.onresize();
      },
      cancel() {
        this.$emit("cancel");
      },
      addedPrize(prize, prizeInfo, id) {
        let prizeName = prizeInfo.name;
        prizeName = prizeInfo.name;
        // if (prize.type === 10) {
        //   prizeName = prizeInfo.name;
        // } else if (prize.type === w0) {
        //   prizeName =
        //     prizeInfo.type === 10
        //       ? `满${prizeInfo.min_price}元减${prizeInfo.reduce_price}元券`
        //       : `满${prizeInfo.min_price}元打${prizeInfo.discount}折券`;
        // }
        for (const index in this.form.activity.prize_list) {
          if (id && this.form.activity.prize_list[index].id === id) {
            this.form.activity.prize_list.splice(index, 1);
          }
        }
        this.form.activity.prize_list.push({
          id,
          ...prize,
          goods: prizeInfo,
          prizeName,
        });

        this.form.activity.prize_list.sort((a, b) => a.score - b.score);
      },
      async showCreate(game) {
        this.type = 1;
        this.title = "新增游戏活动";
        this.categoryOptions = [
          {
            label: game.category.name,
            value: game.category.id,
          },
        ];
        this.form.activity.prize_list = [];
        this.windowResize();
        const { data } = await getGameDetail(game.id);
        this.form.game = data;
        this.categoryIds = [data.category_id];
        this.gameThumbnail = data.thumbnail;
        this.gameImages = data.images;
        if (!this.form.game.merchant_game.name) {
          this.form.game.merchant_game.name = data.name;
        }
        if (!this.form.game.merchant_game.description) {
          this.form.game.merchant_game.description = data.description;
        }
        if (!this.form.game.merchant_game.rule) {
          this.form.game.merchant_game.rule = data.rule;
        }
      },
      async showEdit(row) {
        this.type = 2;
        this.title = "编辑游戏活动";
        this.categoryOptions = [
          {
            label: row.admin_game.category.name,
            value: row.admin_game.category.id,
          },
        ];
        this.windowResize();
        const { data } = await getGameActivityDetail(row.id);
        this.form.id = row.id;
        data.admin_game.category = row.admin_game.category;
        this.form.game = data.admin_game;
        this.categoryIds = [data.admin_game.category_id];
        this.gameThumbnail = data.admin_game.thumbnail;
        this.gameImages = data.admin_game.images;
        if (!this.form.game.merchant_game.name) {
          this.form.game.merchant_game.name = data.admin_game.name;
        }
        if (!this.form.game.merchant_game.description) {
          this.form.game.merchant_game.description =
            data.admin_game.description;
        }
        if (!this.form.game.merchant_game.rule) {
          this.form.game.merchant_game.rule = data.admin_game.rule;
        }
        data.game_prize_list.forEach((item) => {
          item.prizeName = item.goods ? item.goods.name : "";
          // if (item.type === 10) {
          //   item.prizeName = item.goods.name;
          // } else if (item.type === 20) {
          //   item.prizeName =
          //     item.coupon.type === 10
          //       ? `满${item.coupon.min_price}元减${item.coupon.reduce_price}元券`
          //       : `满${item.coupon.min_price}元打${item.coupon.discount}折券`;
          // }
        });
        this.form.activity = {
          free_num: data.free_num,
          play_price: data.play_price,
          follow_free_num: data.follow_free_num,
          shared_free_num: data.shared_free_num,
          invited_free_num: data.invited_free_num,
          max_invited_num: data.max_invited_num,
          prize_list: data.game_prize_list.sort((a, b) => a.score - b.score),
        };
      },
      validateActivityForm(data) {
        const msgType = "error";
        if (data.free_num < 0) {
          this.$baseMessage("请输入免费试玩次数", msgType);
          return false;
        }
        if (data.play_price < 0) {
          this.$baseMessage("请输入游戏挑战价格", msgType);
          return false;
        }
        if (data.follow_free_num < 0) {
          this.$baseMessage("请输入公众号关注奖励次数", msgType);
          return false;
        }
        if (data.shared_free_num < 0) {
          this.$baseMessage("请输入朋友圈分享奖励次数", msgType);
          return false;
        }
        if (data.invited_free_num < 0) {
          this.$baseMessage("请输入好友邀请奖励次数", msgType);
          return false;
        }
        if (data.max_invited_num < 0) {
          this.$baseMessage("请输入好友邀请人数上限", msgType);
          return false;
        }
        if (data.prize_list.length <= 0) {
          this.$baseMessage("请添加游戏活动奖励", msgType);
          return false;
        }
        return true;
      },
      validateGameForm(data) {
        const msgType = "error";
        if (!data.name) {
          this.$baseMessage("请输入游戏名称", msgType);
          return false;
        }
        if (!data.description) {
          this.$baseMessage("请输入游戏简介", msgType);
          return false;
        }
        if (!data.rule) {
          this.$baseMessage("请输入游戏规则介绍", msgType);
          return false;
        }
        return true;
      },
      async saveActivityGame() {
        const data = {
          is_active: this.form.game.merchant_game.is_active,
          name: this.form.game.merchant_game.name,
          description: this.form.game.merchant_game.description,
          rule: this.form.game.merchant_game.rule,
        };
        if (!this.validateGameForm(data)) {
          return;
        }
        if (!this.validateActivityForm(this.form.activity)) {
          return;
        }
        await doGameUpdate(this.form.game.id, data);
        if (this.type === 1) {
          await createActivity({
            admin_game_id: this.form.game.id,
            ...this.form.activity,
          });
          this.$baseMessage("创建游戏活动成功", "success");
        } else {
          await updateActivity(this.form.id, {
            admin_game_id: this.form.game.id,
            ...this.form.activity,
          });
          this.$baseMessage("修改游戏活动成功", "success");
        }
        this.$emit("fetchData");
        this.$emit("cancel");
      },
    },
  };
</script>

<style lang="scss" scoped>
  .setting-btn {
    margin-left: 16px;
  }
  .remark {
    color: #838fa1;
    font-size: 13px;
  }
</style>
