<template>
    <div class="social-section">
        <!--PC和WAP自适应版-->
        <div id="SOHUCS" sid="{{postId}}}"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BrowseMore from '../../views/BrowseMore'

    export default {
        props: {
            type: String,
            postId: Number
        },
        data() {
            return {
                show: null
            }
        },
        components: {
            'browse-more': BrowseMore
        },
        mounted() {
            var appid = '您的appid';
            var conf = '您的appkey';
            var width = window.innerWidth || document.documentElement.clientWidth;
            if (width < 960) {
                window.document.write('<script id="changyan_mobile_js" charset="utf-8" type="text/javascript" src="http://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=' + appid + '&conf=' + conf + '"><\/script>');
            } else {
                var loadJs = function (d, a) {
                    var c = document.getElementsByTagName("head")[0] || document.head || document.documentElement;
                    var b = document.createElement("script");
                    b.setAttribute("type", "text/javascript");
                    b.setAttribute("charset", "UTF-8");
                    b.setAttribute("src", d);
                    if (typeof a === "function") {
                        if (window.attachEvent) {
                            b.onreadystatechange = function () {
                                var e = b.readyState;
                                if (e === "loaded" || e === "complete") {
                                    b.onreadystatechange = null;
                                    a()
                                }
                            }
                        } else {
                            b.onload = a
                        }
                    }
                    c.appendChild(b)
                };
                loadJs("http://changyan.sohu.com/upload/changyan.js", function () {
                    window.changyan.api.config({appid: appid, conf: conf})
                });
        }
    this.$loadScript(null, 'https://assets.changyan.sohu.com/upload/plugins/plugins.count.js', () => {
    })
    },
    beforeDestroy()
    {
        try {
// eslint-disable-next-line no-useless-escape
            const removeRep = /^http(s)?\:\/\/changyan\./
            const $head = document.getElementsByTagName('head')[0] || document.head || document.documentElement
            const $script = $head.querySelectorAll('script')
            $script.forEach((item, index) => {
                const src = item.getAttribute('src')
                if (src && removeRep.test(src)) {
                    $head.removeChild(item)
                }
            })
            for (const key in window) {
                if (/^(changyan(\d)?|cyan)/.test(key)) {
                    window[key] = undefined
                }
            }
        } catch (error) {
        }
    }
    }
</script>
