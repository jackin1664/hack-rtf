<template>
    <div class="the-footer-wrap px-4">
        <a href="https://twitter.com/Rocket_Fin" target="_blank">
            <i class="fab fa-twitter"></i>
        </a>
        <a href="https://t.me/RTFinance" target="_blank">
            <i class="fab fa-telegram"></i>
        </a>
    </div>
</template>

<script>

    export default {
        name: 'frameFooter',
        components: {},
        props: [],
        data() {
            return {

            }
        },
        computed: {},
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
    .the-footer-wrap{
        // max-width: 1100px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 30px;

        position: absolute;
        bottom: 20px;
        left: 10px;

        a{
            margin-right: 30px;
            font-size: 26px;
            color: inherit;
            opacity: 0.8;
            &:hover{
                opacity: 1;
            }
        }
    }
</style>
