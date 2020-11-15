<template>
    <div>

        <div>
            {{lg('total_Amount')}}： {{ total_amount | tofixed0 | qfw}} {{total_symbol}}
        </div>

        <div v-if="total_amount_true">
            {{ total_amount_true | tofixed0 | qfw}} TRUE
        </div>

        <div class="mb-1">
            {{lg('total_lockup')}}：
            <span>${{b_balance | tofixed0 | qfw}}</span>
            {{b_name}}
        </div>

        <div>
            {{lg('total_APY')}}： {{ apy | bfh }}
        </div>
        <!--
          <div>
         {{lg('total_Price')}}： 1 JFI = {{ jfi_price_trx | tofixed0 | qfw}} TRX(${{ jfi_price_usd | tofixed2 | qfw}})
       </div>
        -->
    </div>
</template>

<script>
    const rewardsPoolAbi = require('@/data/rewards_pool_abi.json');
    // import Decimal from 'decimal.js'
    export default {
        name: 'addressToBalance',
        components: {},
        props: [
            // 入参为item（data/main_list 中的一个项目）
            'item',
        ],
        data() {
            return {
                // a: the 1st token
                a_balance: '',
                a_name: '',

                // b: the 2ed token
                b_balance: '',
                b_name: '',

                // apy: 例： 0.12
                apy: '-',
                total_symbol:'',
                total_amount: 0,
                total_amount_true:0,

                jfi_price_trx: '',
                jfi_price_usd: '',
            }
        },
        computed: {
            account_default_address() {
                return this.$store.state.account.default_address
            },
            price_tron_usd() {
                return this.$store.state.token_price.tron_on_usd
            },

            config() {
                let v = this
                let json = Object.assign({}, v.cfg || {})
                return json
            },
        },
        watch: {
            //检测到获取了地址
            account_default_address(){
                this.run()
            },
            price_tron_usd(val) {
                if (val) {
                    this.run()
                }
            },
        },
        methods: {

            // 锁仓：对父组件[加和]赋值
            calcLockupSum(keyid, num) {
                let v = this
                v.$parent.lockup_num_list[keyid] = num
                v.$parent.calcLockupNumSum()
            },

            async run() {
                let v = this

                console.log('true price:' + v.price_tron_usd)
                // let address = v.item.reward_address

                //let price_tron_usd = v.price_tron_usd

                v.jfi_price_trx = parseFloat(1)
                v.jfi_price_usd = parseFloat(v.jfi_price_trx) * parseFloat(v.price_tron_usd)

                console.log('dgt-true', v.jfi_price_trx)
                console.log('true-usdt', v.price_tron_usd)
                console.log('dgt-usdt', v.jfi_price_usd)

                // JFI价格：对父组件赋值
                v.$parent.price_list.jfi_on_tron = v.jfi_price_trx
                v.$parent.price_list.jfi_on_usd = v.jfi_price_usd
                // JFI价格：对父组件赋值 end

                let reward_address = v.item.reward_address
                if (v.item.id === 'RTF-BNB') {
                    //获取池子锁仓总量
                    let rewardContract = new v.myWeb3.eth.Contract(rewardsPoolAbi, reward_address);
                    rewardContract.methods.totalSupply().call().then(function (balance) {

                        let totalSupply = balance / Math.pow(10, 18)
                        v.a_balance = totalSupply
                        v.total_amount = totalSupply
                        v.total_symbol = 'RTF-BNB LP'
                        v.b_balance = (totalSupply / 0.03199) * 2 * v.price_tron_usd * 0.9

                        // 锁仓：对父组件[加和]赋值
                        v.calcLockupSum(v.item.id, v.b_balance)
                        //每天产出量
                        let daily_mint = 1
                        //计算总价值
                        let daily_value = daily_mint * parseFloat(v.jfi_price_trx) * parseFloat(v.price_tron_usd)
                        console.log('daily_value:' + daily_value)
                        let apy = (daily_value / v.b_balance) * 365
                        v.apy = apy
                    })
                }
                if (v.item.id === 'BNB') {
                    //获取池子锁仓总量
                    v.myWeb3.eth.getBalance(reward_address).then(function (balance) {
                        let totalSupply = balance / Math.pow(10, 18)
                        v.total_amount = totalSupply
                        v.total_symbol = 'BNB'
                        v.a_balance = totalSupply
                        //池子总价值
                        v.b_balance = totalSupply * v.price_tron_usd

                        // 锁仓：对父组件[加和]赋值
                        v.calcLockupSum(v.item.id, v.b_balance)
                        //每天产出量
                        let daily_mint = 1
                        //计算总价值
                        let daily_value = daily_mint * parseFloat(v.jfi_price_trx) * parseFloat(v.price_tron_usd)
                        console.log('daily_value:' + daily_value)
                        let apy = (daily_value / v.b_balance) * 365
                        v.apy = apy
                    })
                }
                v.a_name = v.item.id
            },
        },
        created() {
            this.run()
        },
        //mounted() {},
        //beforeDestroy() {},
        //update() {},
        //activited() {},
        //beforeRouteUpdate() {},
        //filters: {},
    };
</script>

<style lang="scss" scoped>

</style>
