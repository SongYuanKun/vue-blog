<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        created() {
            setTimeout(() => {
                window.L2Dwidget.init({
                    pluginRootPath: 'static/live2dw/',
                    pluginJsPath: 'lib/',
                    pluginModelPath: 'live2d-widget-model-shizuku/assets/',
                    tagMode: false,
                    debug: false,
                    model: {jsonPath: '/static/live2dw/live2d-widget-model-shizuku/assets/shizuku.model.json'},
                    display: {position: 'right', width: 150, height: 300},
                    mobile: {show: true},
                    log: false
                })
            }, 1000)
        }
    }
</script>

<style>
    @import "assets/css/reset.css";
</style>
