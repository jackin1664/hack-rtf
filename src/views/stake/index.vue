<template>
    <div class="stake-page">
        <frameHeader/>
        <div class="boxed px-4 mt-5">
            <router-link to="/" class="btn btn-round btn-lg btn-outline-primary pl-5 pr-5">
                {{lg('back')}}
            </router-link>
            <!-- 信息栏 -->
            <stakeInfo ref="stake_info" v-if="token_data.id=='RTF-BNB'" :token_data="token_data"
                       :token_balance_info="token_balance_info"/>
            <stakeInfoTrue ref="stake_info" v-if="token_data.id=='BNB'" :token_data="token_data"
                           :token_balance_info="token_balance_info"/>
            <!-- 4个按钮 -->
            <div v-if="!status_show_stake_pad && !status_show_unstake_pad" class="mt-4 ui-card px-4 py-3">
                <div class="btn-set">

          <span @click="toggleStakePad()" class="btn btn-round btn-lg btn-primary">
            {{lg('stake_tokens')}}
          </span>

                    <span @click="toggleUnstakePad()" class="btn btn-round btn-lg btn-outline-primary">
            {{lg('unstake_tokens')}}
          </span>

                    <span @click="actionClaim()" class="btn btn-round btn-lg btn-outline-primary">
            {{lg('claim_rewards')}}
          </span>

                    <span @click="actionExit()" class="btn btn-round btn-lg btn-outline-primary">
            {{lg('exit_claim_and_unstake')}}
          </span>

                </div>
            </div>

            <!-- Stake 操作面板 -->
            <div v-if="status_show_stake_pad" class="mt-4 ui-card px-4 py-3">
                <h4>
                    {{lg('stake_tokens')}}
                </h4>

                <div class="input-group my-3">
                    <input v-model="input_num_stake" type="text" class="form-control form-control-lg">
                    <div class="input-group-append">
                        <span class="input-group-text">
                          <span class="btn btn-outline-primary btn-sm"
                                @click="input_num_stake = token_balance_info.num_balance.toString()">
                            Max
                          </span>
                        </span>
                    </div>
                    <div class="input-group-append">
                        <span class="input-group-text">{{token_data.token_symbol}}</span>
                    </div>
                </div>
                <div v-if="token_data.id === 'DGT-TRUE-HODL'" class="input-group my-3">
                    <input v-model="input_num_stake_true" type="text" disabled="true" class="form-control form-control-lg">
                    <div class="input-group-append">
                        <span class="input-group-text">TRUE</span>
                    </div>
                </div>
                <div>
                    <div class="btn-set">
                        <span @click="toggleStakePad()" class="btn btn-lg btn-outline-primary">
                          {{lg('cancel')}}
                        </span>
                        <span v-if="allowance == false && token_data.token_address!=''" @click="actionApprove()"
                              class="btn btn-lg btn-primary">
                                        {{approveHash?lg('approveing'):lg('approve')}}
                                    </span>
                        <span v-else @click="actionStake()" class="btn btn-lg btn-primary">
                          {{lg('stake')}}
                        </span>

                        <!--                        <span  @click="actionStake()" class="btn btn-lg btn-primary">-->
                        <!--              {{lg('stake')}}-->
                        <!--            </span>-->

                    </div>

                </div>
            </div>

            <!-- Unstake 操作面板 -->
            <div v-if="status_show_unstake_pad" class="mt-4 ui-card px-4 py-3">
                <h4>
                    {{lg('unstake_tokens')}}
                </h4>

                <div class="input-group my-3">
                    <input v-model="input_num_unstake" type="text" class="form-control form-control-lg">
                    <div class="input-group-append">
            <span class="input-group-text">
              <span class="btn btn-outline-primary btn-sm"
                    @click="input_num_unstake = token_balance_info.num_staked.toString()">
                Max
              </span>
            </span>
                    </div>
                    <div class="input-group-append">
                        <span class="input-group-text">{{token_data.token_symbol}}</span>
                    </div>
                </div>

                <div>

                    <div class="btn-set">

            <span @click="toggleUnstakePad()" class="btn btn-lg btn-outline-primary">
              {{lg('cancel')}}
            </span>

                        <span @click="actionUnstake()" class="btn btn-lg btn-primary">
              {{lg('unstake')}}
            </span>

                    </div>

                </div>
            </div>

        </div>

        <frameFooter/>
    </div>
</template>

<script>
    import frameHeader from '@/views/_comp_frame/header.vue'
    import frameFooter from '@/views/_comp_frame/footer.vue'

    import stakeInfo from './stake_info.vue'
    import stakeInfoTrue from './stake_info_true.vue'

    import data_main_list from '@/data/main_list.js'
    import Decimal from 'decimal.js'

    const swapPoolAbi = require('@/data/tswap_pool_abi.json');
    const rewardsPoolAbi = require('@/data/rewards_pool_abi.json');
    const rewardsTruePoolAbi = require('@/data/rewards_true_pool_abi.json');
    export default {
        name: 'stakePage',
        components: {
            frameHeader,
            frameFooter,
            stakeInfo,
            stakeInfoTrue,
        },
        props: [],
        data() {
            return {

                //
                status_show_stake_pad: false,
                input_num_stake: '',
                input_num_stake_true:'',
                //
                status_show_unstake_pad: false,
                input_num_unstake: '',

                // token_balance_info
                token_balance_info: {
                    num_balance: '',
                    num_staked: '',
                    num_reward: '',
                },
                allowance: false,
                approveHash: '',
                timer: ''
            }
        },
        computed: {
            token_data() {
                let v = this
                let temp = null
                for (let item of data_main_list) {
                    if (item.id.toLowerCase() === v.$route.params.id.toLowerCase()) {
                        temp = item
                    }
                }
                return JSON.parse(JSON.stringify(temp))
            },
        },
        watch: {
            // input_num_stake(val){
            //     let v = this
            //
            //     if(val){
            //         let v = this
            //         v.input_num_stake_true = new Decimal(val).mul(v.token_data.need_true_ratio).toFixed()
            //     }else{
            //         v.input_num_stake_true = ''
            //     }
            // }
        },
        methods: {
            toggleStakePad() {
                let v = this
                v.input_num_stake = ''
                v.status_show_stake_pad = !v.status_show_stake_pad
            },

            toggleUnstakePad() {
                let v = this
                v.input_num_unstake = ''
                v.status_show_unstake_pad = !v.status_show_unstake_pad
            },

            // stake
            async actionStake() {
                let v = this
                let num = v.input_num_stake

                let reward_address = v.token_data.reward_address

                // let token_address = v.token_data.token_address


                // let addresses = await window.ethereum.enable()
                // let addresses = await v.myWeb3.eth.accounts;
                // var local_address = addresses[0]
                var local_address = await v.action.getAddress()

                if (v.token_data.id === 'BNB') {
                    //调用合约执行
                    let reward_contract = new v.myWeb3.eth.Contract(rewardsTruePoolAbi, reward_address)
                    let stakeNum = new Decimal(num).mul(Math.pow(10, v.token_data.token_decimals)).toFixed()
                    console.log('stakeNum', stakeNum)
                    const reward_stakeData = reward_contract.methods.stake().encodeABI()
                    console.log('reward_stakeData', reward_stakeData)

                    const rewardReceipt = await v.myWeb3.eth.sendTransaction({
                        from: local_address,
                        to: reward_address,
                        value: stakeNum,
                        data: reward_stakeData
                    })
                    console.log('rewardReceipt', rewardReceipt);
                } else if(v.token_data.id === 'RTF-BNB') {
                    //调用合约执行
                    let reward_contract = new v.myWeb3.eth.Contract(rewardsPoolAbi, reward_address)
                    let stakeNum = new Decimal(num).mul(Math.pow(10, v.token_data.token_decimals)).toFixed()
                    console.log('stakeNum', stakeNum)
                    const reward_stakeData = reward_contract.methods.stake(stakeNum).encodeABI()
                    console.log('reward_stakeData', reward_stakeData)

                    const rewardReceipt = await v.myWeb3.eth.sendTransaction({
                        from: local_address,
                        to: reward_address,
                        value: 0,
                        data: reward_stakeData
                    })
                    console.log('rewardReceipt', rewardReceipt);
                }
                this.refreshStakeInfo()
            },
            // unstake
            async actionUnstake() {
                let v = this
                let num = v.input_num_unstake

                let reward_address = v.token_data.reward_address

                // let addresses = await window.ethereum.enable()
                // let addresses = await v.myWeb3.eth.accounts;
                // var local_address = addresses[0]
                var local_address = await v.action.getAddress()

                //调用合约执行
                let reward_contract = new v.myWeb3.eth.Contract(rewardsPoolAbi, reward_address)
                let stakeNum = new Decimal(num).mul(Math.pow(10, v.token_data.token_decimals)).toFixed()
                console.log('stakeNum', stakeNum)
                const reward_stakeData = reward_contract.methods.withdraw(stakeNum).encodeABI()
                console.log('reward_stakeData', reward_stakeData)

                const rewardReceipt = await v.myWeb3.eth.sendTransaction({
                    from: local_address,
                    to: reward_address,
                    value: 0,
                    data: reward_stakeData
                })
                console.log('rewardReceipt', rewardReceipt);

                this.refreshStakeInfo()
                // let tronweb = window.tronWeb
                //
                // tronweb.contract().at(reward_address).then(function (rewardContract) {
                //
                //     let stakeNum = ethers.utils.parseUnits(num, v.token_data.token_decimals);
                //
                //     rewardContract.withdraw(stakeNum).send().then(function (res) {
                //         console.log('螃蟹')
                //         console.log(res)
                //     })
                // })

            },

            // actionClaim
            async actionClaim() {
                let v = this

                let reward_address = v.token_data.reward_address

                // let addresses = await window.ethereum.enable()
                // let addresses = await v.myWeb3.eth.accounts;
                // var local_address = addresses[0]
                var local_address = await v.action.getAddress()
                //调用合约执行
                let reward_contract = new v.myWeb3.eth.Contract(rewardsPoolAbi, reward_address)
                const reward_stakeData = reward_contract.methods.getReward().encodeABI()
                console.log('reward_stakeData', reward_stakeData)

                const rewardReceipt = await v.myWeb3.eth.sendTransaction({
                    from: local_address,
                    to: reward_address,
                    value: 0,
                    data: reward_stakeData
                })
                console.log('rewardReceipt', rewardReceipt);

                this.refreshStakeInfo()

                // let tronweb = window.tronWeb
                //
                // tronweb.contract().at(reward_address).then(function (rewardContract) {
                //
                //     rewardContract.getReward().send().then(function (res) {
                //         console.log('Claim')
                //         console.log(res)
                //     })
                // })
            },

            // actionExit
            async actionExit() {
                let v = this

                let reward_address = v.token_data.reward_address

                // let addresses = await window.ethereum.enable()
                // let addresses = await v.myWeb3.eth.accounts;
                // var local_address = addresses[0]
                var local_address = await v.action.getAddress()
                //调用合约执行
                let reward_contract = new v.myWeb3.eth.Contract(rewardsPoolAbi, reward_address)
                const reward_stakeData = reward_contract.methods.exit().encodeABI()
                console.log('reward_stakeData', reward_stakeData)

                const rewardReceipt = await v.myWeb3.eth.sendTransaction({
                    from: local_address,
                    to: reward_address,
                    value: 0,
                    data: reward_stakeData
                })
                console.log('rewardReceipt', rewardReceipt);

                this.refreshStakeInfo()

                // let tronweb = window.tronWeb
                //
                // tronweb.contract().at(reward_address).then(function (rewardContract) {
                //
                //     rewardContract.exit().send().then(function (res) {
                //         console.log('exit')
                //         console.log(res)
                //     })
                // })
            },

            async actionApprove() {
                let v = this
                let reward_address = v.token_data.reward_address
                let token_address = v.token_data.token_address
                // let addresses = await window.ethereum.enable()
                // let addresses = await v.myWeb3.eth.accounts;
                // var local_address = addresses[0]
                var local_address = await v.action.getAddress()

                //approve
                let contract = new v.myWeb3.eth.Contract(swapPoolAbi, token_address)
                const approveData = contract.methods.approve(reward_address, '10000000000000000000000000').encodeABI();
                console.log('approvedata', approveData)

                // const receipt = await v.myWeb3.eth.sendTransaction({
                //     from: local_address,
                //     to: token_address,
                //     value: 0,
                //     data: approveData
                // })
                // console.log('receipt', receipt);

                v.myWeb3.eth.sendTransaction({
                    from: local_address,
                    to: token_address,
                    value: 0,
                    data: approveData
                })
                    .on('transactionHash', function (hash) {
                        //hash
                        console.log(`hash: ` + hash)
                        v.approveHash = hash;
                        v.timer = setInterval(v.checkApproved, 1000);
                        //server order
                    }).on('receipt', function (receipt) {
                    //receipt
                    console.log(receipt)
                }).on('error', function (receipt) {
                    //receipt
                    console.log(receipt)
                })
            },

            async checkApproved() {
                console.log(`check approving`)
                let v = this
                if (v.token_data.token_address === '') {
                    return false;
                }
                // let addresses = await window.ethereum.enable()
                // let addresses = await v.myWeb3.eth.accounts;
                // var local_address = addresses[0]
                var local_address = await v.action.getAddress()
                let contract = new v.myWeb3.eth.Contract(swapPoolAbi, v.token_data.token_address)
                contract.methods.allowance(local_address, v.token_data.reward_address).call(function (error, result) {
                    if (result != 0) {
                        v.allowance = true;
                        //清空检测事件
                        v.approveHash = '';
                        clearInterval(v.timer);
                    }
                });
            },

            async refreshStakeInfo(){
                console.log(`refresh datas`)
                this.$refs.stake_info.getAllData()
            }
        },
        created() {
            console.log('ethers.utils.bigNumberify(1000)')

            // 更新tron价格
            this.action.getPriceTronUSD()
            //授权操作
            this.checkApproved()
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
    .stake-page {
        .btn-set {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            .btn {
                min-width: 48%;
                margin-top: 10px;
                margin-bottom: 10px;
            }
        }

        // 样式覆盖
        .input-group {
            input {
                border-right: none !important;
            }

            .input-group-text {
                background-color: transparent !important;
                font-size: 18px;


                &:last-child {
                    border-left: none !important;
                }
            }
        }
    }

    @media(max-width: 789px) {
        .stake-page {

            // 上提页面
            .boxed {
                margin-top: 0 !important;
            }

            .btn-set {
                .btn {
                    width: 100%;
                }
            }
        }
    }
</style>
