<template>
    <div class="hotRead">
        <panel :title="'最热阅读'">
            <div slot="content" class="content">
                <div class="top" v-if="topHotRead">
                    <a :href="'/article/' + topHotRead.id">
                        <p class="title">{{topHotRead.title}}</p>
                        <div class="tags">
                            <iv-tag :color="index | mapTagColor" v-for="(tag , index)  in topHotRead.tagList"
                                    :key="tag.id">{{tag.name}}
                            </iv-tag>
                        </div>
                        <p class="info">
                            <span class="time">{{topHotRead.createTime | socialDate }}</span>
                            <span class="likes"><a><iv-icon type="heart"></iv-icon> {{topHotRead.likeNum}} </a></span>
                            <span class="comments"><a><iv-icon type="compose"></iv-icon> {{topHotRead.commentNum}} </a></span>
                            <span class="readings"><a><iv-icon type="eye"></iv-icon> {{topHotRead.readNum}} </a></span>
                        </p>
                        <!--<div class="img">-->
                        <!--<img :src="topHotRead.cover" alt="">-->
                        <!--</div>-->
                        <p class="desc">{{topHotRead.description | textLineBreak(60)}}</p>
                    </a>
                </div>
                <ul class="others">
                    <li v-for="hotRead in hotReadList" :key="hotRead.id">
                        <a :href="'/' + hotRead.urlType + '/' +hotRead.id">
                            <p class="title">{{hotRead.title}}</p>
                            <p class="info">
                                <span class="time">{{hotRead.createTime | socialDate }}</span>
                                <span class="likes"><a><iv-icon type="heart"></iv-icon> {{hotRead.likeNum}} </a></span>
                                <span class="comments"><a><iv-icon type="compose"></iv-icon> {{hotRead.commentNum}} </a></span>
                                <span class="readings"><a><iv-icon type="eye"></iv-icon> {{hotRead.readNum}} </a></span>
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
        </panel>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapTagColor, mixin} from '../../utils/index'
    import Panel from '../utils/Panel'

    export default {
        data() {
            return {
                hotReadList: [],
                topHotRead: {}
            }
        },
        mixins: [mixin],
        created() {
            this.listHotRead()
        },
        methods: {
            listHotRead() {
                this.$http({
                    url: this.$http.adornUrl('article/hotReads'),
                    method: 'get'
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.hotReadList = data.data.content;
                        this.topHotRead = this.hotReadList.shift()
                    }
                })
            },
            mapTagColor(index) {
                return mapTagColor(index)
            }

        },
        components: {
            'panel': Panel
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/index.styl";

    .hotRead
        .content
            padding 5px 20px

        .top, .others
            a
                display block
                overflow hidden

                .tags
                    margin-bottom 10px

                .title
                    text-align justify
                    color $color-gradually-gray-41
                    font-size 16px
                    line-height 23px
                    margin-bottom 5px

                .info
                    margin 5px 0 0

                    span
                        font-size 13px
                        line-height 18px
                        font-weight 100
                        color $color-secondary-info

                        + span
                            float right
                            margin-left 10px

                    a
                        display inline-block
                        color: #777
                        cursor pointer

                        &:hover
                            color $color-main-primary
                            text-decoration underline

                .img
                    padding-bottom: 40%
                    width: 100%
                    height: 0
                    margin 5px 0
                    overflow hidden

                    img
                        width 100%
                        transition: All 0.4s ease-in-out
                        transform: scale(1.0)
                        zoom: 1.0

                .desc
                    text-align justify
                    color $color-secondary-info
                    font-size 13px
                    line-height 20px
                    margin 5px 0 0

                &:hover
                    .title
                        color $color-main-primary

                    img
                        transition: All 0.4s ease-in-out
                        transform: scale(1.05)
                        zoom: 1.05

        .others
            li
                list-style-type none
                margin-top 10px
                padding-top 10px
                border-top 1px solid $color-border

</style>
