<template>
  <div>
    <el-row>
      <el-col :span="24">
        <part-header>
          <span slot="title">{{ title }}</span>
        </part-header>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row style="padding-top: 10px">
      <el-col :lg="18">
        <el-form
          ref="form"
          v-loading="listLoading"
          :label-position="labelPosition"
          :model="form"
          label-width="180px"
          :rules="rules"
        >
          <el-form-item label="模板名称" prop="name">
            <el-input
              v-model="form.name"
              placeholder="例：全国包邮"
              maxlength="100"
            ></el-input>
          </el-form-item>
          <el-form-item label="计费方式" prop="method">
            <el-radio-group v-model="form.method">
              <el-radio :label="10">按件计费</el-radio>
              <el-radio :label="20">按重量计费</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="模板顺序" prop="order">
            <el-input-number
              v-model.trim="form.order"
              :min="0"
              :max="100000000"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="配送区域及运费">
            <template v-for="(rule, index) in form.rules">
              <el-table :key="index" :data="[rule]" border style="width: 100%">
                <el-table-column prop="regions" label="可配送区域">
                  <template slot-scope="scope">
                    <span v-if="scope.row.regions">
                      <el-tag
                        v-for="item in getProvinceRegionNames(
                          scope.row.regions
                        )"
                        :key="item"
                        style="margin: 0 4px 4px 0"
                      >
                        {{ item }}
                      </el-tag>
                    </span>
                    <span v-else>
                      <el-tag type="info" style="margin: 0 4px 4px 0">
                        无
                      </el-tag>
                    </span>
                  </template>
                </el-table-column>
              </el-table>
              <el-table
                :key="index + '_2'"
                :data="[rule]"
                border
                style="width: 100%; border-top: 0"
              >
                <el-table-column
                  prop="first"
                  :label="form.method === 10 ? '首件（个）' : '首重（kg）'"
                >
                  <template>
                    <el-input v-model="form.rules[index].first"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="first_fee" label="运费（元）">
                  <template>
                    <el-input v-model="form.rules[index].first_fee"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="additional"
                  :label="form.method === 10 ? '续件（个）' : '续重（kg）'"
                >
                  <template>
                    <el-input v-model="form.rules[index].additional"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="additional_fee" label="续费（元）">
                  <template>
                    <el-input
                      v-model="form.rules[index].additional_fee"
                    ></el-input>
                  </template>
                </el-table-column>
              </el-table>
              <el-table
                :key="index + '_3'"
                :data="[rule]"
                border
                style="width: 100%; border-top: 0; margin-bottom: 16px"
              >
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      style="padding: 9px 12px 9px 10px"
                      @click="selectRegions(index, scope.row.regions)"
                    >
                      <i class="el-icon-location-outline"></i>
                      设置可配送区域
                    </el-button>
                    <el-button
                      type="success"
                      style="padding: 9px 12px 9px 10px"
                      @click="addRule"
                    >
                      <i class="el-icon-circle-plus-outline"></i>
                      新增区域及运费
                    </el-button>
                    <el-button
                      v-if="index !== 0"
                      type="danger"
                      style="padding: 9px 12px 9px 10px"
                      @click="removeRule(index)"
                    >
                      <i class="el-icon-delete"></i>
                      删除当前区域
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveRules">立即保存</el-button>
            <el-button type="danger" @click="cancelRules">取消保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <region ref="region" title="选择可配送区域" @saved="saveRegions"></region>
  </div>
</template>

<script>
  import { detail, doCreate, doUpdate } from "@/api/delivery";
  import { getRegion } from "@/api/region";
  import Region from "./SelectRegion";
  export default {
    name: "DeliveryEdit",
    components: { Region },
    props: {},
    data() {
      return {
        regionData: [],
        handleWidth: 200,
        listLoading: false,
        labelPosition: "right",
        title: "",
        type: 1,
        form: {
          name: "",
          method: 10,
          order: 0,
          rules: [
            {
              regions: "",
              first: 1,
              additional: 0,
              first_fee: 0,
              additional_fee: 0,
            },
          ],
        },
        rules: {
          name: [
            { required: true, trigger: "blur", message: "请输入模板名称" },
          ],
        },
      };
    },
    async created() {
      this.regionData = await getRegion();
    },
    mounted() {
      const that = this;
      window.onresize = () =>
        (() => {
          const width = document.body.clientWidth;
          if (width < 1000) {
            that.labelPosition = "top";
          } else {
            that.labelPosition = "right";
          }
          if (width < 600) {
            that.handleWidth = 100;
          } else if (width < 700) {
            that.handleWidth = 120;
          } else if (width < 1000) {
            that.handleWidth = 180;
          } else {
            that.handleWidth = 200;
          }
        })();
      window.onresize();
    },
    methods: {
      cancelRules() {
        this.$emit("cancel");
      },
      async saveRules() {
        if (this.type === 1) {
          await doCreate(this.form);
          this.$baseMessage("添加运费模板成功", "success");
        } else {
          await doUpdate(this.form.id, this.form);
          this.$baseMessage("修改运费模板成功", "success");
        }
        this.$emit("fetchData");
        this.$emit("cancel");
      },
      addRule() {
        this.form.rules.push({
          regions: "",
          first: 1,
          additional: 0,
          first_fee: 0,
          additional_fee: 0,
        });
      },
      removeRule(index) {
        this.form.rules.splice(index, 1);
      },
      saveRegions(index, regionCodes) {
        this.form.rules[index].regions = regionCodes.join(",");
      },
      selectRegions(index, regions) {
        let filterRegions = [];
        if (index > 0) {
          this.form.rules.forEach((rule, key) => {
            if (key === index) {
              return;
            }
            const regions = rule.regions.split(",");
            filterRegions = Array.from(new Set(filterRegions.concat(regions)));
          });
        }
        this.$refs["region"].show(index, regions || "", filterRegions);
      },
      async showEdit(row) {
        if (!row) {
          this.title = "添加运费模板";
          this.type = 1;
          this.form = this.$options.data().form;
        } else {
          this.title = "编辑运费模板";
          this.type = 2;
          const { data } = await detail(row.id);
          this.form = data;
        }
      },
      getRegionName(regionCode, regionData, deep = 3) {
        if (deep < 1) {
          return false;
        }
        for (const item of regionData) {
          if (item.value === regionCode) {
            return item.label;
          }
          if (item.children) {
            const ret = this.getRegionName(regionCode, item.children, deep - 1);
            if (ret) {
              return ret;
            }
          }
        }
        return false;
      },
      getProvinceRegionNames(regions) {
        const regionList = Array.from(
          new Set(regions.split(",").filter((item) => !!item))
        );
        return regionList
          .map((item) => this.getRegionName(item, this.regionData, 1))
          .filter((item) => !!item);
      },
    },
  };
</script>
