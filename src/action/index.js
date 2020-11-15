import bus from '../bus.js'
import Vue from "vue";

export default {

    // 读取MetaMask，更新账号等
    async scanMetaMaskAccount(){
        //以太坊web3
        const Web3 = require('web3');
        if(window.tweb3 && window.tethereum && (window.tethereum.chainId == '0x38' || window.tethereum.chainId == '56')){
            Vue.prototype.myWeb3 =  new Web3(window.tweb3.currentProvider);
        }else if (window.web3 && window.ethereum && (window.ethereum.chainId == '0x38' || window.ethereum.chainId == '56')){
            Vue.prototype.myWeb3 =  new Web3(window.web3.currentProvider);
        }
        let ether
        if(window.tethereum){
            ether = window.tethereum
        }else{
            ether = window.ethereum
        }

        if(ether){
            // 检测是否安装tronlink
            bus.appvue.$store.commit("setAppKey", {
                'is_metamask_installed': true,
            });
            let address
            // 收集账号状态
            if(window.tethereum){
                address = await window.tethereum.enable()
            }else{
                address = await window.ethereum.enable()
            }

            let account_json = {
                default_address: address[0] || '',
                // node_host: tw.fullNode.host || '',
            };
            // UI优化:收起链接tronlink的面板
            if(account_json.default_address){
                bus.appvue.$modal.hide("modalPopConnect")
            }
            // 提交账号状态给全局
            bus.appvue.$store.commit("setAccountKey", account_json)
        }
    },

    listenMetaMask(){
        let me = this
        window.addEventListener("message", function(e) {
            let d = e.data
            if(d.isMetaMask){
                // 重新读取账号
                me.scanMetaMaskAccount()

                // UI：交易成功的提示
                if (e.data.message && e.data.message.action == "tabReply") {

                    console.log("tabReply event", e.data.message);

                    let tx = e.data.message.data.data.txID;
                    if(tx){
                        let html = `<a href="${bus.appvue.$store.state.sitecfg.url_transaction_view}${tx}" target="_blank">${tx}</a>`;
                        bus.appvue.$toasted.show(html);
                    }

                    // 刷新钱包余额
                    setTimeout(function(){
                        // 页面存在时请求
                        if(bus.stakeinfovue){
                            bus.stakeinfovue.getAllData()
                        }
                    },6000)

                }
            }
        });
    },

    getPriceTronUSD(){
        fetch('https://api.coingecko.com/api/v3/simple/price?ids=true-chain&vs_currencies=USD').then(function(res){
        // fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD').then(function(res){
            res.json().then(function(res){
                console.log(res)
                let num = res['true-chain'].usd
                bus.appvue.$store.commit("setTokenPriceKey",{
                    tron_on_usd: num
                    // tron_on_usd: num
                });
            })
        })
    },
    async getAddress(){
        if(window.tethereum){
            let addresses = await window.tethereum.enable()
            return addresses[0]
        }else{
            let addresses = await window.ethereum.enable()
            return addresses[0]
        }
    }
}
