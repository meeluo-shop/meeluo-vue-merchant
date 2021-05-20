<template>
  <div class="login-container">
    <el-row>
      <el-col :lg="14" :md="11" :sm="24" :xl="14" :xs="24">
        <div style="color: transparent">占位符</div>
      </el-col>
      <el-col :lg="9" :md="12" :sm="24" :xl="9" :xs="24">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          class="login-form"
          label-position="left"
        >
          <div class="title">hello !</div>
          <div class="title-tips">欢迎来到{{ title }}！</div>
          <el-form-item prop="username" style="margin-top: 40px">
            <span class="svg-container svg-container-admin">
              <vab-remix-icon icon-class="user-line"></vab-remix-icon>
            </span>
            <el-input
              v-model.trim="form.username"
              v-focus
              placeholder="请输入手机号或邮箱"
              tabindex="1"
              type="text"
            />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <vab-remix-icon icon-class="lock-line"></vab-remix-icon>
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model.trim="form.password"
              placeholder="请输入密码"
              :type="passwordType"
              tabindex="2"
              @keyup.enter.native="handleLogin"
            />
            <span
              v-if="passwordType === 'password'"
              class="show-password"
              @click="handlePassword"
            >
              <vab-remix-icon icon-class="eye-off-line"></vab-remix-icon>
            </span>
            <span v-else class="show-password" @click="handlePassword">
              <vab-remix-icon icon-class="eye-line"></vab-remix-icon>
            </span>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="form.rememberMe" style="color: white">
              记住我
            </el-checkbox>
          </el-form-item>
          <el-button
            :loading="loading"
            class="login-btn"
            type="primary"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form>
      </el-col>
      <el-col :lg="1" :md="1" :sm="24" :xl="1" :xs="24">
        <div style="color: transparent">占位符</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { isPassword } from "@/utils/validate";
  import { LoginStore } from "@/utils/storage";
  import Config from "@/config/settings";

  export default {
    name: "Login",
    directives: {
      focus: {
        inserted(el) {
          el.querySelector("input").focus();
        },
      },
    },
    data() {
      const validateUsername = (rule, value, callback) => {
        if ("" === value) {
          callback(new Error("用户名不能为空"));
        } else {
          callback();
        }
      };
      const validatePassword = (rule, value, callback) => {
        if (!isPassword(value)) {
          callback(new Error("密码不能少于6位"));
        } else {
          callback && callback();
        }
      };
      return {
        nodeEnv: process.env.NODE_ENV,
        title: this.$baseTitle,
        cookiePass: "",
        form: {
          username: "",
          password: "",
          rememberMe: true,
        },
        rules: {
          username: [
            {
              required: true,
              trigger: "blur",
              validator: validateUsername,
            },
          ],
          password: [
            {
              required: true,
              trigger: "blur",
              validator: validatePassword,
            },
          ],
        },
        loading: false,
        passwordType: "password",
        redirect: undefined,
      };
    },
    watch: {
      $route: {
        handler(route) {
          this.redirect = (route.query && route.query.redirect) || "/";
        },
        immediate: true,
      },
    },
    created() {
      document.body.style.overflow = "hidden";
      this.getStorage();
    },
    beforeDestroy() {
      document.body.style.overflow = "auto";
    },
    mounted() {},
    methods: {
      handlePassword() {
        this.passwordType === "password"
          ? (this.passwordType = "")
          : (this.passwordType = "password");
        this.$nextTick(() => {
          this.$refs.password.focus();
        });
      },
      getStorage() {
        const { username, password, rememberMe } = LoginStore.get();
        // 保存cookie里面的加密后的密码
        this.cookiePass = password === undefined ? "" : password;
        this.form = {
          username: username === undefined ? this.form.username : username,
          password: password === undefined ? this.form.password : password,
          rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
        };
      },
      handleLogin() {
        this.$refs.form.validate((valid) => {
          const user = {
            username: this.form.username,
            password: this.form.password,
            rememberMe: this.form.rememberMe,
          };
          if (valid) {
            this.loading = true;
            if (user.rememberMe) {
              LoginStore.set(user);
            } else {
              LoginStore.clear();
            }
            this.$store
              .dispatch("passport/login", user)
              .then(() => {
                const routerPath =
                  this.redirect === "/404" || this.redirect === "/403"
                    ? "/"
                    : this.redirect;
                this.$router.push(routerPath).catch(() => {});
                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
          } else {
            return false;
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .login-container {
    height: 100vh;
    background: url("~@/assets/login_images/background.jpg") center center fixed
      no-repeat;
    background-size: cover;
  }

  .login-form {
    position: relative;
    max-width: 100%;
    padding: 4.5vh;
    margin: calc((100vh - 475px) / 2) 5vw 5vw;
    overflow: hidden;
    background: url("~@/assets/login_images/login_form.png");
    background-size: 100% 100%;

    .title {
      font-size: 54px;
      font-weight: 500;
      color: $base-color-white;
    }

    .title-tips {
      margin-top: 29px;
      font-size: 26px;
      font-weight: 400;
      color: $base-color-white;
    }

    .login-btn {
      display: inherit;
      width: 220px;
      height: 50px;
      margin-top: 5px;
      border: 0;

      &:hover {
        opacity: 0.9;
      }

      .forget-passwordword {
        width: 100%;
        margin-top: 40px;
        text-align: left;

        .forget-password {
          width: 129px;
          height: 19px;
          font-size: 20px;
          font-weight: 400;
          color: rgba(92, 102, 240, 1);
        }
      }
    }

    .tips {
      margin-bottom: 10px;
      font-size: $base-font-size-default;
      color: $base-color-white;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 40px auto;
        font-size: 34px;
        font-weight: bold;
        color: $base-color-blue;
        text-align: center;
      }
    }

    .svg-container {
      position: absolute;
      top: 8px;
      left: 15px;
      z-index: $base-z-index;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    .show-password {
      position: absolute;
      top: 8px;
      right: 25px;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    ::v-deep {
      .el-form-item {
        padding-right: 0;
        margin: 20px 0;
        color: #454545;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 2px;

        &__content {
          min-height: $base-input-height;
          line-height: $base-input-height;
        }

        &__error {
          position: absolute;
          top: 100%;
          left: 18px;
          font-size: $base-font-size-small;
          line-height: 18px;
          color: $base-color-red;
        }
      }

      .el-input {
        box-sizing: border-box;

        input {
          height: 48px;
          padding-left: 45px;
          font-size: $base-font-size-default;
          line-height: 48px;
          color: $base-font-color;
          background: #f6f4fc;
          border: 0;
          caret-color: $base-font-color;
        }
      }
    }
  }
</style>
