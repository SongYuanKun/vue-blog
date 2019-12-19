import Vue from 'vue'
import router from './router/index'
import store from './store/index'
import 'iview/dist/styles/iview.css'
import '@/common/stylus/index.styl'
import App from './App.vue'
import httpRequest from './utils/httpRequest'
// iView UI 组件引入
import {Affix, Button, Col, Icon, Message, Notice, Progress, Rate, Row, Tag} from 'iview'

Vue.component('iv-row', Row);
Vue.component('iv-col', Col);
Vue.component('iv-button', Button);
Vue.component('iv-progress', Progress);
Vue.component('iv-tag', Tag);
Vue.component('iv-icon', Icon);
Vue.component('iv-affix', Affix);
Vue.component('iv-rate', Rate);


Vue.prototype.$http = httpRequest;
Vue.prototype.$Message = Message;
Vue.prototype.$Notice = Notice;
const i18n = new VueI18n({
    locale: 'zh-CN',    // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
        'zh-CN': require('./common/lang/zh'),   // 中文语言包
        'en-US': require('./common/lang/en')    // 英文语言包
    }
});

Vue.use(VueI18n);

Vue.directive('title', {
    inserted: function (el) {
        document.title = el.dataset.title
    }
});

Vue.prototype.$Notice.config({
    top: 70,
    duration: 3
});
let vm = new Vue({
    router,
    store,
    el: '#app',
    i18n,
    render: h => h(App)
});

Vue.use({
    vm
});
