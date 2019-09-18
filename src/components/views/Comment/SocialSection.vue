<template>
    <div class="social-section">
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

        },
        beforeDestroy() {

        }
    }
</script>
