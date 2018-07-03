// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import axios from "axios";
import store from "./vuex/index";
import "element-ui/lib/theme-chalk/index.css";
import "@/style/reset.css";
import "viewerjs/dist/viewer.css";

//引入rem布局
import "../electrocar/static/rem.js";
Vue.prototype.ajaxUrl = "/acdnt-cert";
Vue.prototype.$ajax = axios;

Vue.use(ElementUI);
// http请求拦截器
var loadinginstace = "";
axios.interceptors.request.use(
  config => {
    console.log("config.url", config);
    // 获取二维码
    if (config.url == "/acdnt-cert/getValidaCode") {
      loadinginstace = ElementUI.Loading.service({ fullscreen: true });
    };
    // 获取列表
    if (config.url == "/list") {
      loadinginstace = ElementUI.Loading.service({ fullscreen: true });
    };
    return config;
  },
  error => {
    ElementUI.Message.error({
      message: "加载超时"
    });
    return Promise.reject(error);
  }
);
// http响应拦截器
axios.interceptors.response.use(
  data => {
    // 响应成功关闭loading

    if (loadinginstace) {
      loadinginstace.close();
      loadinginstace = "";
    }
    if (data.data.rescode == 300) {
      router.push("/");
    }
    return data;
  },
  error => {
    console.log(error);
    // loadinginstace.close()
    ElementUI.Message.error({
      message: "加载失败"
    });
    return Promise.reject(error);
  }
);

Vue.config.productionTip = false;
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App),
  template: "<App/>",
  components: { App }
});
