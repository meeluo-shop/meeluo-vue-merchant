/**
 * @author knows 1002563923@qq.com
 * @description vue.config.js全局配置
 */
const path = require("path");
const {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  title,
  abbreviation,
  devPort,
  providePlugin,
  build7z,
  copyright,
} = require("./src/config/settings");
const webpackBarName = title;
const webpackBanner = ` build: ${title} \n copyright: ${copyright} \n time: `;
const { version, author } = require("./package.json");
const Webpack = require("webpack");
const WebpackBar = require("webpackbar");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const dayjs = require("dayjs");
const date = dayjs().format("YYYY_M_D");
const time = dayjs().format("YYYY-M-D HH:mm:ss");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["html", "js", "css", "svg"];
process.env.VUE_APP_TITLE = title || "谜鹿商户管理平台";
process.env.VUE_APP_AUTHOR = author || "knows";
process.env.VUE_APP_UPDATE_TIME = time;
process.env.VUE_APP_VERSION = version;

const resolve = (dir) => {
  return path.join(__dirname, dir);
};

module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  devServer: {
    hot: true,
    port: devPort,
    open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
    // 注释掉的地方是前端配置代理访问后端的示例
    // proxy: {
    //   [baseURL]: {
    //     target: `http://你的后端接口地址`,
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ["^/" + baseURL]: "",
    //     },
    //   },
    // },
  },
  configureWebpack() {
    return {
      resolve: {
        alias: {
          "@": resolve("src"),
          "*": resolve(""),
        },
      },
      plugins: [
        new Webpack.ProvidePlugin(providePlugin),
        new WebpackBar({
          name: webpackBarName,
        }),
      ],
    };
  },
  chainWebpack(config) {
    config.resolve.symlinks(true);
    config.module
      .rule("svg")
      .exclude.add(resolve("src/ui/icon/remixIcon"))
      .add(resolve("src/ui/icon/colorfulIcon"))
      .end();

    config.module
      .rule("remixIcon")
      .test(/\.svg$/)
      .include.add(resolve("src/ui/icon/remixIcon"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "remix-icon-[name]" })
      .end();

    config.module
      .rule("colorfulIcon")
      .test(/\.svg$/)
      .include.add(resolve("src/ui/icon/colorfulIcon"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "colorful-icon-[name]" })
      .end();

    config.when(process.env.NODE_ENV === "development", (config) => {
      config.devtool("source-map");
    });

    config.when(process.env.NODE_ENV !== "development", (config) => {
      config.performance.set("hints", false);
      config.devtool("none");
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "vue-admin-beautiful-pro-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial",
          },
          elementUI: {
            name: "vue-admin-beautiful-pro-element-ui",
            priority: 20,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
          },
        },
      });
      config
        .plugin("banner")
        .use(Webpack.BannerPlugin, [`${webpackBanner}${time}`])
        .end();
      config
        .plugin("compression")
        .use(CompressionWebpackPlugin, [
          {
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: new RegExp(
              "\\.(" + productionGzipExtensions.join("|") + ")$"
            ),
            threshold: 8192,
            minRatio: 0.8,
          },
        ])
        .end();
    });

    if (build7z) {
      config.when(process.env.NODE_ENV === "production", (config) => {
        config
          .plugin("fileManager")
          .use(FileManagerPlugin, [
            {
              onEnd: {
                delete: [`./${outputDir}/video`, `./${outputDir}/data`],
                archive: [
                  {
                    source: `./${outputDir}`,
                    destination: `./${outputDir}/${abbreviation}_${outputDir}_${date}.7z`,
                  },
                ],
              },
            },
          ])
          .end();
      });
    }
  },
  runtimeCompiler: true,
  productionSourceMap: false,
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      scss: {
        additionalData(content, loaderContext) {
          const { resourcePath, rootContext } = loaderContext;
          const relativePath = path.relative(rootContext, resourcePath);
          if (
            relativePath.replace(/\\/g, "/") !== "src/config/variables.scss"
          ) {
            return '@import "~@/config/variables.scss";' + content;
          }
          return content;
        },
      },
    },
  },
};
