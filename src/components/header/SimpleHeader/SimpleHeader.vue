<template>
    <div class="simple-header">
        <transition name="slide-fade">
            <div id="mobile-bar" v-show="show">
                <a class="menu-button" ref="menubutton"></a>
                <router-link class="logo" to="/"></router-link>
            </div>
        </transition>
        <transition name="slide-fade">
            <div id="header" v-show="show">
                <router-link id="logo" to="/">
                    <img src="../../../assets/logo.png">
                    <span class="title">HUSKY STUDIO</span>
                    <span class="motto">乐队排练 X 录音编曲 X 乐器培训 X 乐器销售</span>
                </router-link>
                <ul id="nav">
                    <li>
                        <form action="/articles/search" id="search-form">
      <span class="algolia-autocomplete" style="position: relative; display: inline-block; direction: ltr;">
        <input
                @keyup.enter="submit" aria-autocomplete="list" aria-expanded="false" aria-owns="algolia-autocomplete-listbox-0"
                autocomplete="off" class="search-query st-default-search-input aa-input"
                dir="auto" id="search-query-nav" name="keywords" role="combobox" spellcheck="false"
                style="position: relative; vertical-align: top;" type="text" v-model="keywords">
        <pre
                aria-hidden="true"
                style="position: absolute; visibility: hidden; white-space: pre; font-family: system-ui; font-size: 12px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; word-spacing: 0px; letter-spacing: normal; text-indent: 0px; text-rendering: auto; text-transform: none;"></pre>
        <span
                class="aa-dropdown-menu" id="algolia-autocomplete-listbox-0" role="listbox"
                style="position: absolute; top: 100%; z-index: 100; display: none; left: 0px; right: auto;"><div
                class="aa-dataset-1"></div></span></span>
                        </form>
                    </li>

                    <li><a class="nav-link contribute" href="/articles"> {{$t("simpleHeader.article")}}</a></li>
                    <li><a class="nav-link contribute" href="/timeline">时光轴</a></li>
                    <li><a class="nav-link contribute" href="/article/1">关于</a></li>
                </ul>
            </div>
        </transition>
        <sidebar :articleCategoryList="articleCategoryList" :bookCategoryList="bookCategoryList"
                 ref="sidebar"></sidebar>
    </div>

</template>

<script type="text/ecmascript-6">
    import SideBar from '@/components/header/SimpleHeader/SideBar'
    import {treeDataTranslate} from '@/utils'

    export default {
        components: {
            'sidebar': SideBar
        },
        data() {
            return {
                show: true,
                articleCategoryList: [],
                bookCategoryList: [],
                keywords: ''
            }
        },
        created() {
            this.listCategory()
            this.keywords = this.$route.query.keywords
        },
        mounted: function () {
            this.$nextTick(function () {
                this.initMobileMenu()
            })
            // 给页面绑定滑轮滚动事件
            if (document.addEventListener) { // firefox
                document.addEventListener('DOMMouseScroll', this.watchScroll, false)
            }
            // 滚动滑轮触发scrollFunc方法  //ie 谷歌
            window.onmousewheel = document.onmousewheel = this.watchScroll
        },
        methods: {
            initMobileMenu() {
                // 显示手机端的菜单
                var sidebar = this.$refs.sidebar
                this.$refs.menubutton.addEventListener('click', function () {
                    sidebar.toggleSideBar()
                })
            },
            watchScroll(e) {
                e = e || window.event
                if (e.wheelDelta) {
                    if (e.wheelDelta > 0 && this.show === false) { // 当滑轮向上滚动
                        this.show = true
                    }
                    if (e.wheelDelta < 0 && this.show === true) { // 当滑轮向下滚动
                        this.show = false
                    }
                } else if (e.detail) {
                    if (e.detail < 0 && this.show === false) { // 当滑轮向上滚动
                        this.show = true
                    }
                    if (e.detail > 0 && this.show === true) { // 当滑轮向下滚动
                        this.show = false
                    }
                }
            },
            listCategory() {
                this.$http({
                    url: this.$http.adornUrl('category/select'),
                    method: 'get',
                    params: this.$http.adornParams()
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        data.data.forEach(category => {
                            if (category.type === 0) {
                                this.articleCategoryList.push(category)
                            } else if (category.type === 1) {
                                this.bookCategoryList.push(category)
                            }
                        })
                        this.articleCategoryList = treeDataTranslate(this.articleCategoryList)
                        this.bookCategoryList = treeDataTranslate(this.bookCategoryList)
                    }
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "stylus/header.styl";
    // 添加导航栏显示动画
    .slide-fade-enter-active, .slide-fade-leave-active {
        transition: all .8s ease;
    }

    .slide-fade-leave-to, .slide-fade-enter {
        /* .slide-fade-leave-active for below version 2.1.8 */
        transform: translateY(-70px);
        opacity: 0;
    }
</style>
