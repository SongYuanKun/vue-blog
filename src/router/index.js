import Vue from 'vue'
import Router from 'vue-router'
import {LoadingBar} from 'iview'
import Index from '../components/index/Index'
// 公共区域
// import CommonHeader from '../components/header/CommonHeader';
import SimpleHeader from '../components/header/SimpleHeader/SimpleHeader'
import CommonFooter from '../components/footer/CommonFooter'
// 首页
import HomeContent from '../components/content/HomeContent'
import ArticleContent from '../components/content/ArticleContent'
import BookNoteContent from '../components/content/BookNoteContent'
import BookContent from '../components/content/BookContent'
import ArticleListContent from '../components/content/ArticleListContent'
import BookListContent from '../components/content/BookListContent'
import TimeLineContent from '../components/content/TimeLineContent'
import SearchResultContent from '../components/content/SearchResultContent'
import PageNotFound from '../components/views/PageNotFound'
import Demo from "../components/content/Demo";

Vue.use(Router)

let router = new Router({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index,
            children: [
                {
                    path: '/',
                    name: 'index',
                    components: {
                        header: SimpleHeader,
                        content: HomeContent,
                        footer: CommonFooter
                    },
                    meta: {
                        title: '哈士奇工作室 | 乐队排练 X 录音编曲 X 乐器培训 X 乐器销售'
                    }
                },
                {
                    path: 'article/:articleId',
                    name: 'article',
                    components: {
                        header: SimpleHeader,
                        content: ArticleContent,
                        footer: CommonFooter
                    }
                },
                {
                    path: 'articles',
                    name: 'articles',
                    components: {
                        header: SimpleHeader,
                        content: ArticleListContent,
                        footer: CommonFooter
                    },
                    meta: {
                        title: '博文列表 | 哈士奇工作室 | 乐队排练 X 录音编曲 X 乐器培训 X 乐器销售'
                    }
                },
                {
                    path: 'demo',
                    name: 'demo',
                    components: {
                        content: Demo
                    },
                    meta: {
                        title: '博文列表 | 哈士奇工作室 | 乐队排练 X 录音编曲 X 乐器培训 X 乐器销售'
                    }
                },
                {
                    path: 'articles/category/:id',
                    name: 'articles/category',
                    components: {
                        header: SimpleHeader,
                        content: ArticleListContent,
                        footer: CommonFooter
                    },
                    meta: {
                        title: '博文列表 | 哈士奇工作室 | 乐队排练 X 录音编曲 X 乐器培训 X 乐器销售'
                    }
                },
                {
                    path: 'articles/search',
                    name: 'search',
                    components: {
                        header: SimpleHeader,
                        content: SearchResultContent,
                        footer: CommonFooter
                    },
                    meta: {
                        title: '博文搜索 | 哈士奇工作室 | 乐队排练 X 录音编曲 X 乐器培训 X 乐器销售'
                    }
                },
                {
                    path: 'bookNote/:bookNoteId',
                    name: 'bookNote',
                    components: {
                        header: SimpleHeader,
                        content: BookNoteContent,
                        footer: CommonFooter
                    }
                },
                {
                    path: 'book/:bookId',
                    name: 'book',
                    components: {
                        header: SimpleHeader,
                        content: BookContent,
                        footer: CommonFooter
                    }
                },
                {
                    path: 'books',
                    name: 'books',
                    components: {
                        header: SimpleHeader,
                        content: BookListContent,
                        footer: CommonFooter
                    },
                    meta: {
                        title: '阅读 | 哈士奇工作室 | 乐队排练 X 录音编曲 X 乐器培训 X 乐器销售'
                    }
                },
                {
                    path: 'books/category/:id',
                    name: 'books/category',
                    components: {
                        header: SimpleHeader,
                        content: BookListContent,
                        footer: CommonFooter
                    },
                    meta: {
                        title: '阅读 | 哈士奇工作室 | 乐队排练 X 录音编曲 X 乐器培训 X 乐器销售'
                    }
                },
                {
                    path: 'timeline',
                    name: 'timeline',
                    components: {
                        header: SimpleHeader,
                        content: TimeLineContent,
                        footer: CommonFooter
                    },
                    meta: {
                        title: '时间轴 | 哈士奇工作室 | 乐队排练 X 录音编曲 X 乐器培训 X 乐器销售'
                    }
                },
                {
                    path: '404',
                    name: '404',
                    components: {
                        header: SimpleHeader,
                        content: PageNotFound,
                        footer: CommonFooter
                    },
                    meta: {
                        title: '页面找不到 | 哈士奇工作室 | 乐队排练 X 录音编曲 X 乐器培训 X 乐器销售'
                    }
                }
            ]
        },
        {
            path: '*',
            component: PageNotFound
        }
    ]
})

// 配置加载进度条
LoadingBar.config({
    color: '#5cb85c',
    failedColor: '#f0ad4e',
    height: 2
})

router.beforeEach((to, from, next) => {
    LoadingBar.start()
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

router.afterEach((to, from, next) => {
    LoadingBar.finish()
    window.scrollTo(0, 0)
})

export default router
