<template>
    <div>
        <frameHeader/>

        <div class="home-box boxed px-4 tac">
            <div>

                <div class="pt-5">
                    <h3 style="line-height: 1.4em;font-size: 32px;">
                        {{lg('web_logan')}}
                    </h3>
                </div>

<!--                <div class="my-3 mb-4 tac text-dark">-->
<!--                    {{lg('web_risk_tip')}}-->
<!--                </div>-->

                <!-- reports 审计报告-->
                <!-- <blockReports/>-->
                <!--
                                <div class="alert alert-success px-0 mt-4 mb-5">
                                    <div>
                            <span class="text-dark mr-2">
                              {{lg('total_lockup')}}:
                            </span>
                                        <span class="b t-c">
                              ${{lockup_num_sum | tofixed0 | qfw}}
                            </span>
                                    </div>
                                    <div>
                            <span class="text-dark mr-2">
                              {{lg('price')}}:
                            </span>
                                        <span class="b t-c">
                              1 JFI = {{price_list.jfi_on_tron | tofixed0 | qfw}} TRX
                              (${{price_list.jfi_on_usd | tofixed0 | qfw}})
                            </span>
                                    </div>
                                </div>
                                -->
                <div class="main-list">

                    <div
                            v-for="(item,index) of main_list"
                            :key="index"
                            class="item ui-card py-4 px-3 mb-5"

                    >

                        <!-- right label -->
                        <span class="topright-label-text" v-if="item.ui_topright_label_text">
              {{item.ui_topright_label_text}}
            </span>

                        <!-- title -->
                        <h5 v-if="!item.is_end">{{item.token}}</h5>
                        <h5 v-if="item.is_end">{{item.token}} <span class="red">CLOSE</span></h5>

                        <div class="mt-3">
                            <addressToBalance :item="item"/>
                        </div>

                        <div class="my-2">

              <span class="ui-token-pair-logo mx-auto my-4">
                <img :src="item.token_icon">
                <img :src="item.token_earn_icon">
              </span>
                        </div>

                        <div class="my-3">
                            {{lg('deposit')}} {{item.token_symbol}}
                            <br>
                            {{lg('earn')}} {{item.token_earn}}
                        </div>

                        <div>
                            <!-- <a :href="item.website_url" target="_blank">
                              {{item.website_text}}
                            </a> -->
                        </div>

                        <div>
              <span class="text-muted">
                {{lg('contract_address')}}:
              </span>
                            <a :href="`${$store.state.sitecfg.url_network_address_view}${item.reward_address}`"
                               target="_blank">
                                {{item.reward_address | shortAddress}}
                            </a>
                        </div>

                        <div class="mt-4">
                            <router-link class="btn btn-outline-primary btn-round px-5" :to="`/stake/${item.id}`">
                                {{lg('open')}}
                            </router-link>
                        </div>
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

    // import blockReports from './block_reports.vue'

    import data_main_list from '@/data/main_list.js'
    import addressToBalance from '@/views/_comp_busi/address_to_balance.vue'

    export default {
        name: 'homePage',
        components: {
            frameHeader,
            frameFooter,
            // blockReports,
            addressToBalance,
        },
        props: [],
        data() {
            return {
                main_list: data_main_list,

                lockup_num_list: {},
                lockup_num_sum: '-',
                price_list: {
                    jfi_on_tron: '-',
                    jfi_on_usd: '-',
                },
            }
        },
        computed: {},
        watch: {},
        methods: {
            calcLockupNumSum() {
                let v = this
                let sum = 0
                for (let key in v.lockup_num_list) {
                    let val = v.lockup_num_list[key]
                    sum += val
                }
                v.lockup_num_sum = (sum || '-')
            },
        },
        created() {
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
    /*@import "@/assets/css/_var.scss";*/

    .home-box {

        .main-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 40px;

            .item {
                width: 47%;
                position: relative;

                .topright-label-text {
                    display: block;
                    background-color: #ff007a;
                    color: #fff;
                    font-size: 1.7em;
                    position: absolute;
                    right: -5px;
                    top: -5px;
                    padding: 5px 15px;
                    border-radius: 12px;
                    cursor: default;

                    & ~ h5 {
                        padding-right: 40px;
                    }
                }
            }

            @media(max-width: 789px) {
                .item {
                    width: 100%;
                }
            }
        }
    }
    .red{
        color: red;
    }
</style>
