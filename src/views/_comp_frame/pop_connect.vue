<template>
    <div class="p-4 pt-5 text-center">

<!--        <div v-if="!is_installed" class="pt-5">-->
<!--      <span>-->
<!--        <img src="/static/img/logo_tronlink.svg" style="width: 50px; height: 50px;">-->
<!--      </span>-->
<!--            <h5 class="mt-4">-->
<!--                <a href="https://chrome.google.com/webstore/detail/tronlink（波宝钱包）/ibnejdfjmmkpcnlpebklmnkoeoihofec" target="_blank">-->
<!--                    {{lg('tip_download_tronlink')}}-->
<!--                </a>-->
<!--            </h5>-->
<!--        </div>-->

        <div v-if="is_installed">

            <!-- 未登录 -->
            <div v-if="!account_default_address" class="pt-5 mt-4">
                <button class="btn btn-lg btn-round btn-outline-primary px-5">
                    <b>
                        {{lg('connect')}}
                        MetaMask
                    </b>
                    <img src="/static/img/metamask-fox.svg" class="ml-3" style="width: 25px;height: 25px;margin-top: -5px;" >
                </button>
            </div>

            <!-- 已登陆 -->
            <div v-if="account_default_address" class="pt-5">
                <h5 class="mb-4">
                    {{lg('connected')}}
                </h5>
                <p>
                    {{lg('address')}}: {{account_default_address}}
                </p>
<!--                <p>-->
<!--                    {{lg('network')}}: {{$store.state.account.node_host}}-->
<!--                </p>-->
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        name: 'modalConnect',
        components: {},
        props: [],
        data() {
            return {

            }
        },
        computed: {
            is_installed(){
                return this.$store.state.app.is_metamask_installed
            },
            account_default_address(){
                return this.$store.state.account.default_address
            },
        },
        watch: {},
        methods: {

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

</style>
