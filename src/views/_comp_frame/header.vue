<template>

    <div>
        <div class="the-header-wrap">
            <div class="the-header px-4 py-2">

                <div class="box-links d-flex align-items-center">

                    <router-link to="/" class="logo mr-4">
                        <!--            <span class="logo-img">-->
                        <!--              &lt;!&ndash; Logo bg &ndash;&gt;-->
                        <!--            </span>-->
                        <span class="logo-text">
              RTF Farms
            </span>
                    </router-link>

<!--                    <router-link to="/jfi" class="mr-3">-->
<!--                        DGT-->
<!--                    </router-link>-->

                    <!-- <router-link to="/" class="">
                      {{lg('tutorial')}}
                    </router-link> -->
                </div>

                <div class="box-account ml-auto d-flex">

          <span>
            <!-- 登陆按钮 -->
            <button v-if="!account_default_address" @click="showPopConnect()" type="button"
                    class="btn btn-outline-primary btn-round">
              {{lg('connect_wallet')}}
            </button>

              <!-- 显示账号 -->
            <span v-else class="btn-account">
                <a :href="`https://www.truescan.network/address/${account_default_address}`" target="_blank" >
                {{account_default_address | shortAddress}}
              </a>
<!--              <a :href="`https://tronscan.io/#/address/${account_default_address}`" target="_blank"-->
<!--                 :title="'network:'+$store.state.account.node_host">-->
<!--                {{account_default_address | shortAddress}}-->
<!--              </a>-->
            </span>
          </span>

                    <headerLangSelect class="ml-3"/>
                </div>
            </div>
        </div>

        <!-- 链接 -->
        <modal name="modalPopConnect">
            <popConnect/>
        </modal>

    </div>
</template>

<script>
    import headerLangSelect from './header_lang_select.vue'
    import popConnect from '@/views/_comp_frame/pop_connect.vue'

    export default {
        name: 'frameHeader',
        components: {
            headerLangSelect,
            popConnect,
        },
        props: [],
        data() {
            return {}
        },
        computed: {
            account_default_address() {
                return this.$store.state.account.default_address
            },
        },
        watch: {},
        methods: {
            showPopConnect() {
                this.$modal.show('modalPopConnect')
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

    .the-header-wrap {
        // background-color: #fff;

        .the-header {
            max-width: 1100px;
            margin-left: auto;
            margin-right: auto;

            display: flex;
            align-items: center;
            flex-wrap: wrap;

            a {
                text-decoration: none;
                color: inherit;
            }

            .logo {
                display: flex;
                align-items: center;

                .logo-img {
                    width: 40px;
                    height: 30px;
                    background: url('/static/img/logo.svg') center center no-repeat;
                    background-size: 95%;
                    margin-right: 5px;
                    margin-bottom: -2px;
                }

                .logo-text {
                    font-size: 24px;
                }
            }

            .btn-account {
                display: inline-block;
                border-radius: 20px;
                height: 25px;
                line-height: 25px;
                background-color: rgb(85, 25, 54) !important;

                padding: 0 12px;
                color: #f8f8f8;

                &:hover {
                    color: #fff;
                }
            }
        }
    }

    @media(max-width: 789px) {
        .the-header-wrap {
            .the-header {

                // logo调整
                .logo {
                    flex-wrap: wrap;

                    .logo-img {
                        display: none;
                    }
                }

                padding-left: 8px !important;
                padding-right: 8px !important;
                align-items: normal;

                .box-links {
                    height: 26px;

                    .logo {
                        font-weight: bold;
                    }
                }

                .box-account {
                    flex-direction: column-reverse;

                    select {
                        margin-left: 0 !important;
                        margin-bottom: 15px;;
                    }
                }


            }
        }
    }
</style>
