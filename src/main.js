import Vue from 'vue'
import App from './App'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
// iView UI 组件引入
import {Affix, Button, Col, Icon, Message, Modal, Notice, Progress, Rate, Row, Tag} from 'iview'

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.component('iv-row', Row);
Vue.component('iv-col', Col);
Vue.component('iv-button', Button);
Vue.component('iv-progress', Progress);
Vue.component('iv-tag', Tag);
Vue.component('iv-icon', Icon);
Vue.component('iv-affix', Affix);
Vue.component('iv-rate', Rate);

Vue.prototype.$Modal = Modal;
Vue.prototype.$Message = Message;
Vue.prototype.$Notice = Notice;
Vue.prototype.$loadScript = (script, url, callback) => {
  script = script || document.createElement('script');
  if (script.readyState) {
    // IE浏览器
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback()
      }
    }
  } else {
    // 其他浏览器
    script.onload = function () {
      callback()
    }
  }
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script)
};
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
});

const router = new VueRouter({
  routes
});

Vue.prototype.$Notice.config({
  top: 70,
  duration: 3
});
let vm = new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});

Vue.use({
  vm
});
