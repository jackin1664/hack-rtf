<template>

    <select
            class=""
            v-model="lang_type"
            @change="setAppLang()"
    >
        <option v-for="(val,key) of options" :key="key" :value="key" style="color: #333;">
            {{val}}
        </option>

    </select>
</template>

<script>
    // 组件说明，根据传入的 type ，可以有不同的输出展示
    // type 为 clicklist 时，时个列表。默认则为 select 框。


    export default {
        name: 'langSelect',
        props: [
            'type',
        ],
        data(){
            return{
                lang_type: '',

                options:{
                    // id: 'Indonesia',
                    en: 'English',
                    ko: '한국어',
                    // zh_t: '繁体中文',
                    zh: '简体中文',
                },
            }
        },
        methods:{
            setAppLang(str){
                let v = this
                if(str){
                    v.lang_type = str
                }
                window.lang = v.lang_type

                v.$store.commit('lang',v.lang_type)
            },
        },
        created(){
            this.lang_type = this.$store.state.app.lang
        },
    }
</script>

<style lang="scss" scoped>
    select{
        -webkit-appearance: none;
        border-radius: 20px;
        padding: 0 15px;
        outline: none;
        text-align: center;
        border: 1px solid #ccc;
    }
</style>
