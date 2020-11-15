
// 全局变量

let local_lang = 'en'
// let lang_arr = ['id','ko','zh']
// for(let item of lang_arr){
//     if(window.navigator.language.indexOf(item) === 0){
//         local_lang = item
//         break
//     }
// }
let cfg = {
    dev: {
        default_lang: local_lang, // en zh id
        url_network_address_view: "https://shasta.tronscan.org/#/address/",
        url_transaction_view: "https://shasta.tronscan.org/#/transaction/",
        url_network_api: "https://api.shasta.trongrid.io/",
    },

    prod: {
        default_lang: local_lang, // en zh id
        url_network_address_view: "https://bscscan.com/address/",
        url_transaction_view: "https://bscscan.com/transaction/",
        url_network_api: "https://api.trongrid.io",
    },
};

// 输出
export default cfg.prod
