<template>
  <div>
    <el-row>
      <el-col :span="24">
        <part-header>
          <span slot="title">编辑游戏</span>
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
          label-width="120px"
        >
          <el-form-item required label="游戏名称">
            <el-input
              v-model="form.merchant_game.name"
              maxlength="200"
              @input="inputChange"
            ></el-input>
          </el-form-item>
          <el-form-item required label="是否启用">
            <el-radio-group v-model="form.merchant_game.is_active">
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
              v-model.trim="form.merchant_game.description"
              type="textarea"
              autocomplete="off"
              rows="3"
              @input="inputChange"
            ></el-input>
          </el-form-item>
          <el-form-item required label="游戏类型">
            <el-radio-group v-model="form.is_winning">
              <el-radio disabled :label="1">赢奖游戏</el-radio>
              <el-radio disabled :label="0">免费游戏</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item required label="游戏规则介绍">
            <vab-editor
              ref="content-editor"
              v-model="form.merchant_game.rule"
              :height="300"
            />
          </el-form-item>
          <el-form-item v-if="form.unit" required label="游戏单位">
            <el-input v-model="form.unit" disabled maxlength="200"></el-input>
            <div class="remark">例如：分、米、次、秒</div>
          </el-form-item>
          <el-form-item v-if="form.difficulty.length > 0" label="游戏推荐难度">
            <el-table
              border
              :data="form.difficulty"
              style="margin-bottom: 12px"
            >
              <el-table-column prop="name" label="难度名称"></el-table-column>

              <el-table-column prop="remark" label="难度介绍"></el-table-column>

              <el-table-column prop="detail" label="难度范围">
                <template slot-scope="{ row }">
                  {{ Number(row.min_score).toFixed(2) }}{{ form.unit }} ~
                  {{ Number(row.max_score).toFixed(2) }}{{ form.unit }}
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveGame">立即保存</el-button>
            <el-button type="danger" @click="cancel">取消保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getGameDetail, getGameCategoryList, doGameUpdate } from "@/api/game";
  import VabImageInput from "@/extra/Upload/ImageInput";
  import VabImageListInput from "@/extra/Upload/ImageListInput";
  import VabEditor from "@/extra/Editor";

  export default {
    name: "GameDetail",
    components: { VabEditor, VabImageInput, VabImageListInput },
    props: {},
    data() {
      return {
        gameThumbnail: null,
        gameImages: [],
        listLoading: false,
        labelPosition: "right",
        categoryIds: null,
        categoryList: [],
        categoryOptions: [],
        form: {
          thumbnail: {},
          merchant_game: {},
          images: [],
          difficulty: [],
        },
      };
    },
    watch: {
      categoryIds(ids) {
        if (ids && ids.length) {
          this.form.category_id = ids[ids.length - 1];
        }
      },
      gameThumbnail(thumbnail) {
        if (thumbnail) {
          this.form.thumbnail_id = thumbnail.id;
        }
      },
      gameImages(images) {
        this.form.image_ids = images.map((item) => item.id);
      },
    },
    methods: {
      inputChange(e) {
        this.$forceUpdate();
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
      validateForm(data) {
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
      async saveGame() {
        const data = {
          is_active: this.form.merchant_game.is_active,
          name: this.form.merchant_game.name,
          description: this.form.merchant_game.description,
          rule: this.form.merchant_game.rule,
        };
        if (!this.validateForm(data)) {
          return;
        }
        await doGameUpdate(this.form.id, data);
        this.$baseMessage("修改游戏成功", "success");
        this.$emit("fetchData");
        this.$emit("cancel");
      },
      cancel() {
        this.$emit("cancel");
      },
      async show(id) {
        this.windowResize();
        this.$refs["content-editor"].resetChangeStatus();
        const { data } = await getGameDetail(id);
        this.form = data;
        this.gameThumbnail = data.thumbnail;
        if (!this.form.merchant_game.name) {
          this.form.merchant_game.name = this.form.name;
        }
        if (!this.form.merchant_game.description) {
          this.form.merchant_game.description = this.form.description;
        }
        if (!this.form.merchant_game.rule) {
          this.form.merchant_game.rule = this.form.rule;
        }
        this.gameImages = data.images;
        const categoryList = await this.getCategoryList();
        this.categoryOptions = categoryList;
        this.categoryIds = this.getCategoryParentTree(data.category_id);
      },
      async getCategoryList() {
        const { data } = await getGameCategoryList({ page_size: 500 });
        this.categoryList = data.rows;
        const list = data.rows.map((item) => ({
          label: item.name,
          value: item.id,
          id: item.id,
          superior_id: item.superior_id,
        }));
        return this.conversion(list);
      },
      conversion(data) {
        const root = [];
        for (const item of data) {
          if (!item.superior_id) {
            root.push(item);
          }
          for (const item2 of data) {
            if (item2.superior_id === item.id) {
              if (!item.children) {
                item.children = [];
              }
              item.children.push(item2);
            }
          }
        }
        return root;
      },
      getCategoryParentTree(id, ret = []) {
        const item = this.categoryList.find((cat) => cat.id === id);
        if (item) {
          ret.unshift(id);
          if (item.superior_id) {
            return this.getCategoryParentTree(item.superior_id, ret);
          }
        }
        return ret;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .remark {
    color: #838fa1;
    font-size: 13px;
  }
</style>
