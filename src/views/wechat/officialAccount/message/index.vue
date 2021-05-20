<template>
  <div class="wechat-container">
    <el-row>
      <el-col :span="24">
        <part-header>
          <span slot="title">行业类目设置</span>
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
          label-width="180px"
        >
          <el-form-item label="行业类目：" prop="wechat_id">
            <el-select
              v-model="industry"
              style="max-width: 360px; width: 100%; margin-right: 10px"
              multiple
              filterable
              allow-create
              :disabled="true"
              default-first-option
              placeholder="请设置行业类目"
            >
              <el-option
                v-for="item in currentIndustrys"
                :key="`${item.first_class} - ${item.second_class}`"
                :label="`${item.first_class} - ${item.second_class}`"
                :value="`${item.first_class} - ${item.second_class}`"
              ></el-option>
            </el-select>
            <el-button type="primary" plain @click="setCurrentIndustry">
              一键设置
            </el-button>
            <div class="remark">
              请先确保公众号行业类目为：IT科技 - 互联网|电子商务、IT科技 -
              网络游戏
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <part-header>
          <span slot="title">消息模板设置</span>
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
          label-width="180px"
        >
          <el-form-item
            v-for="temp in tempList"
            :key="temp.id"
            :label="temp.title"
          >
            <el-input
              :disabled="true"
              style="max-width: 360px"
              :value="temp.template_id"
            />
            <el-button
              type="danger"
              plain
              style="margin-left: 10px"
              @click="delTemplate(temp.template_short_id)"
            >
              删除
            </el-button>
            <div class="remark">
              关键词：[
              {{
                temp.content
                  .replace(/\{\{.*?\}\}/g, "")
                  .replace(/：/g, "")
                  .split("\n")
                  .filter((val) => !!val)
                  .join("、")
              }}
              ]
            </div>
          </el-form-item>
          <el-form-item>
            <el-button plain type="primary" @click="setMsgTemplate">
              一键设置
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    getIndustry,
    setIndustry,
    getMessageTemplate,
    setMessageTemplate,
    delMessageTemplate,
  } from "@/api/wechat";
  export default {
    name: "OfficailAccountMessage",
    data() {
      return {
        tempList: [],
        industry: [],
        currentIndustrys: [],
        labelPosition: "right",
        listLoading: true,
      };
    },
    mounted() {
      const that = this;
      window.onresize = () =>
        (() => {
          const width = document.body.clientWidth;
          if (width < 1200) {
            that.labelPosition = "top";
          } else {
            that.labelPosition = "right";
          }
        })();
      window.onresize();
    },
    async created() {
      await this.fetchData();
    },
    methods: {
      async setCurrentIndustry() {
        await setIndustry();
        await this.fetchData();
      },
      async setMsgTemplate() {
        await setMessageTemplate();
        await this.fetchData();
      },
      async delTemplate(shortId) {
        await delMessageTemplate(shortId);
        await this.fetchData();
      },
      async fetchData() {
        this.listLoading = true;
        this.currentIndustrys = [];
        const [tempResp, industryResp] = await Promise.all([
          getMessageTemplate(),
          getIndustry(),
        ]);
        this.tempList = tempResp.data;
        if (industryResp.data.primary_industry) {
          this.currentIndustrys.push(industryResp.data.primary_industry);
        }
        if (industryResp.data.secondary_industry) {
          this.currentIndustrys.push(industryResp.data.secondary_industry);
        }
        this.industry = this.currentIndustrys.map(
          (item) => `${item.first_class} - ${item.second_class}`
        );
        this.listLoading = false;
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
