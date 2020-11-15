<template>
    <div id="app" :key="app_key">
        <router-view/>
    </div>
</template>


<script>
    import bus from './bus.js'

    export default {
        name: '',
        data(){
            return {
                app_key: 0,
            }
        },
        watch: {
            '$store.state.app.lang'(){
                let v = this
                v.app_key += 1
            },
        },
        methods: {
            scanMetaMaskAccount(){
                let v = this
                setTimeout(function(){
                    v.action.scanMetaMaskAccount()
                },1000)
            },
        },
        created(){
            // 挂载
            bus.appvue = this
            bus.$store = this.$store

        },
        mounted(){
            // 检查tronlink安装否
            this.scanMetaMaskAccount()

            // 监听tronlink事件
            this.action.listenMetaMask()

            // 获取tron价格全局使用
            this.action.getPriceTronUSD()
        },
    }
</script>

<style lang="scss">
    @import "@/assets/css/main.scss";
</style>
