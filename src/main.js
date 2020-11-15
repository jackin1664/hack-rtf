import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

// init tronweb
import TronWeb from "tronweb";

// 配置
import sitecfg from "./sitecfg.js"
const fullNode = sitecfg.url_network_api;
const solidityNode = sitecfg.url_network_api;
const eventServer = sitecfg.url_network_api;
const privateKey = "0000000000000000000000000000000000000000000000000000000000000001";
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
//以太坊web3
const Web3 = require('web3');

if(window.tweb3 && (window.tethereum.chainId == '0x38' || window.tethereum.chainId == '56')){
    Vue.prototype.myWeb3 =  new Web3(window.tweb3.currentProvider);
}else if (window.web3 && (window.ethereum.chainId == '0x38' || window.ethereum.chainId == '56')){
    Vue.prototype.myWeb3 =  new Web3(window.web3.currentProvider);
}

//挂载
Vue.prototype.tronWebRead = tronWeb;
// init tronweb end

// 挂载action
import action from "./action/index"
Vue.prototype.action = action


// 多语言处理
window.lang = sitecfg.default_lang || 'en'
import web_lang from "./lang/lang.js";
window.web_lang = web_lang;
import langMethods from './lang/index.js'
Vue.prototype.lg = langMethods.lg
Vue.prototype.lgRefer = langMethods.lgRefer

// filter
import filter from './filter/'
for(let key in filter){
    Vue.filter(key, filter[key])
}

// modal插件
import vmodal from "vue-js-modal";
Vue.use(vmodal);
// Toast插件
import Toasted from 'vue-toasted';
Vue.use(Toasted, {
    theme: "outline",
    position: "bottom-left",
    duration: 5000,
});
// Vue.use(Toasted, Options)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
