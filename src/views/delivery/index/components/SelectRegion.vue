<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    width="720px"
    @close="close"
  >
    <el-checkbox-group v-model="checkedAllCity">
      <div
        v-for="province in regionData"
        :key="province.value"
        class="province-item"
      >
        <el-checkbox
          style="margin-bottom: 10px"
          :label="province.value"
          @change="(value) => selectProvince(province.value, value)"
        >
          {{ province.label }}
        </el-checkbox>
        <div class="city-list">
          <el-checkbox
            v-for="city in province.children"
            :key="city.value"
            style="margin-bottom: 10px"
            :label="city.value"
            @change="(value) => saveProvince(province.value, value)"
          >
            {{ city.label }}
          </el-checkbox>
        </div>
      </div>
    </el-checkbox-group>
    <div slot="footer" class="dialog-footer">
      <div style="text-align: left; float: left">
        <el-button type="primary" plain @click="selectAllCity">全 选</el-button>
        <el-button type="danger" plain @click="clearAllCity">清 空</el-button>
      </div>
      <div>
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import { getRegion } from "@/api/region";
  export default {
    name: "SelectRegion",
    props: {
      title: {
        type: String,
        default: "选择地区",
        required: false,
      },
    },
    data() {
      return {
        baseRegions: [],
        ruleIndex: 0,
        allRegionCode: [],
        regionData: [],
        checkedAllCity: [],
        dialogFormVisible: false,
      };
    },
    async created() {
      this.baseRegions = await getRegion();
      this.regionData = this.$baseLodash.cloneDeep(this.baseRegions);
      this.getAllRegionCode(this.regionData);
    },
    methods: {
      getSubCityCodes(provinceCode) {
        const province = this.regionData.find(
          (item) => item.value === provinceCode
        ) || { children: [] };
        return province.children.map((item) => item.value);
      },
      getAllRegionCode(regionData, deep = 2) {
        if (deep < 1) {
          return;
        }
        for (const item of regionData) {
          if (!this.allRegionCode.includes(item.value)) {
            this.allRegionCode.push(item.value);
          }
          if (item.children) {
            this.getAllRegionCode(item.children, deep - 1);
          }
        }
      },
      saveProvince(provinceCode, val) {
        if (val) {
          if (!this.checkedAllCity.includes(provinceCode)) {
            this.checkedAllCity.push(provinceCode);
          }
        } else {
          const province = this.regionData.find(
            (item) => item.value === provinceCode
          );
          if (!province) {
            return;
          }
          let has = true;
          province.children.forEach((item) => {
            if (this.checkedAllCity.includes(item.value)) {
              has = false;
            }
          });
          if (has) {
            const index = this.checkedAllCity.indexOf(provinceCode);
            if (index > -1) {
              this.checkedAllCity.splice(index, 1);
            }
          }
        }
      },
      selectProvince(provinceCode, val) {
        const subCityCodes = this.getSubCityCodes(provinceCode);
        if (val) {
          subCityCodes.forEach((code) => {
            if (!this.checkedAllCity.includes(code)) {
              this.checkedAllCity.push(code);
            }
          });
        } else {
          subCityCodes.forEach((code) => {
            const index = this.checkedAllCity.indexOf(code);
            if (index > -1) {
              this.checkedAllCity.splice(index, 1);
            }
          });
        }
      },
      selectAllCity() {
        this.checkedAllCity = [...this.allRegionCode];
      },
      clearAllCity() {
        this.checkedAllCity = [];
      },
      show(index, regions, filterRegions) {
        if (filterRegions.length) {
          this.regionData = [];
          this.baseRegions.forEach((item) => {
            if (!filterRegions.includes(item.value)) {
              return this.regionData.push(item);
            }
            let status = false;
            let temp = {
              label: item.label,
              value: item.value,
              children: [],
            };
            item.children.forEach((sub) => {
              if (!filterRegions.includes(sub.value)) {
                if (!status) {
                  this.regionData.push(temp);
                  status = true;
                }
                temp.children.push(sub);
              }
            });
          });
        } else {
          this.regionData = this.$baseLodash.cloneDeep(this.baseRegions);
        }
        this.ruleIndex = index;
        this.dialogFormVisible = true;
        this.checkedAllCity = Array.from(
          new Set(regions.split(",").filter((item) => !!item))
        );
      },
      save() {
        if (!this.checkedAllCity.length) {
          this.$baseMessage("请选择可配送区域", "error");
          return;
        }
        this.$emit("saved", this.ruleIndex, this.checkedAllCity);
        this.close();
      },
      close() {
        this.ruleIndex = 0;
        this.checkedAllCity = [];
        this.dialogFormVisible = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .province-item {
    display: inline-block;
    margin-right: 20px;

    .city-list {
      max-width: 250px;
      width: 50%;
      min-height: 70px;
      border: 1px solid #ebeef5;
      position: absolute;
      display: none;
      background: #fff;
      padding: 12px 0 0 12px;
      &::before {
        content: "";
        position: absolute;
        top: -4px;
        left: 20px;
        width: 0;
        height: 0;
        box-shadow: 1px -1px 0px #ebeef5;
        border-top: 4px solid #ffffff;
        border-right: 4px solid #ffffff;
        border-bottom: 4px solid transparent;
        border-left: 4px solid transparent;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        mix-blend-mode: multiple;
      }
    }
    &:hover .city-list {
      display: block;
      z-index: 100;
    }
  }
</style>
