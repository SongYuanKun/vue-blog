<template>
    <div class="timeline-content">
        <iv-row>
            <iv-col :lg="17" :md="24" :sm="24" :xs="24">
                <div class="layout-left">
                    <timeline-header></timeline-header>
                    <div :key="year.year" v-for="year in timelineList" v-if="year.months.length > 0">
                        <archive-list-time-title :count="year.count" :date="year.year"></archive-list-time-title>
                        <div :key="month.month" v-for="month in year.months" v-if="month.posts.length > 0">
                            <archive-list-time-title :count="month.count" :date="month.month + '月'"
                                                     :dateType="'month'"></archive-list-time-title>
                            <archive-list-cell :key="post.title" :post="post"
                                               v-for="post in month.posts"></archive-list-cell>
                        </div>
                    </div>
                </div>
            </iv-col>
            <iv-col :lg="7" :md="0" :sm="0" :xs="0">
                <div class="layout-right">
                    <recommend></recommend>
                    <tag-wall style="margin-top: 15px;"></tag-wall>
                </div>
            </iv-col>
        </iv-row>
    </div>
</template>

<script type="text/ecmascript-6">
    import TimeLineHeader from '../views/TimeLine/TimeLineHeader'
    import ArchiveListCell from '../views/Archive/ArchiveListCell'
    import ArchiveListTimeTitle from '../views/Archive/ArchiveListTimeTitle'
    import Recommend from '../views/Recommend'
    import TagWall from '../views/TagWall'

    export default {
        data() {
            return {
                timelineList: []
            }
        },
        components: {
            'timeline-header': TimeLineHeader,
            'archive-list-time-title': ArchiveListTimeTitle,
            'archive-list-cell': ArchiveListCell,
            'recommend': Recommend,
            'tag-wall': TagWall
        },
        created() {
            this.listTimeline()
        },
        methods: {
            listTimeline() {
                this.$http({
                    url: this.$http.adornUrl('timeline'),
                    method: 'get',
                    params: this.$http.adornParams()
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.timelineList = data.data
                    }
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .timeline-content
        width auto
        @media only screen and (max-width: 768px)
            margin 5px 5px 10px 5px
        @media screen and (min-width: 768px)
            margin 10px 10px 20px 10px
        @media screen and (min-width: 992px)
            margin 15px 35px 50px 35px
        @media screen and (min-width: 1200px)
            width 1200px
            margin 15px auto 0
            margin-bottom 50px

        .layout-left, .layout-right
            padding 0
            @media only screen and (max-width: 768px)
                padding 0
            @media screen and (min-width: 768px)
                padding 0
            @media screen and (min-width: 992px)
                padding 0 10px
            @media screen and (min-width: 1200px)
                padding 0 10px
</style>
