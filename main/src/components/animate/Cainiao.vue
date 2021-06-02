<template>
    <div class="blackBg">
        <div class="eye">
            <div class="cycle outside borderLine"></div>
            <div class="cycle inside mainColor"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        created() {

        },
        mounted() {

        },
        methods: {

        },
    }
</script>

<style scoped>
    @keyframes close {
        0%{
            transform: rotateX(0deg);
        }
        40%{
            transform: rotateX(0deg);    
        }
        50%{
            transform: rotateX(180deg);
        }
        60%{
            transform: rotateX(0deg);
        }
        100%{
            transform: rotateX(0deg);
        }

    }

    .blackBg {
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 100000;
        width: 100vw;
        height: 100vh;
        background: black;
    }

    .eye {
        position: absolute;
        width: 400px;
        height: 400px;
        left: 50%;
        top: 50%;
        margin: -200px;
        display: flex;
    }

    .outside {
        position: absolute;
        width: calc(80% - 100px);
        height: calc(80% - 100px);
        left: 10%;
        top: 10%;
    }

    .inside {
        position: absolute;
        width: 80px;
        height: 80px;
        left: calc(50% - 40px);
        top: calc(50% - 40px);
        animation: close 3s infinite ease-in-out;
    }

    .borderLine {
        border: 50px #fff solid;
    }

    .cycle {
        border-radius: 50%;
    }

    .mainColor {
        background-color: aliceblue;
    }

    .bgColor {
        background: black;
    }
</style>