<template>
    <div id="map"></div>
</template>

<script>
    export default {
        data() {
            return {
                data: null,
                type: null,
                size: {
                    width: 0,
                    height: 0
                }
            }
        },
        prop: {
            chartData: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            chartType: {
                type: 'String',
                default: null
            }
        },
        mounted() {
            
        },
        methods: {
            // 可透出的重置函数
            init() {},

            // 注册组件，渲染图表
            initAntVG2Component() {
                const G2 = new this.$G2.Chart({
                    
                })
            }
        },
    }
</script>

<style scoped>
    #map {
        width: 100%;
        height: 100%;
    }
</style>