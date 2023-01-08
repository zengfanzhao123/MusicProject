<template>
     <div id="loading1">
        <div class="demo1"></div>
        <div class="demo1"></div>
        <div class="demo1"></div>
        <div class="demo1"></div>
        <div class="demo1"></div>
    </div>
</template>

<script>
export default {
    name:'loadingIndex',
}
</script>

<style lang="css" scoped>
        .demo1 {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: #68b2ce;
            float: left;
            margin: 0 5px;
            animation: demo1 linear 1s infinite;
            -webkit-animation: demo1 linear 1s infinite;
        }


        .demo1:nth-child(1) {
            animation-delay: 0s;
        }


        .demo1:nth-child(2) {
            animation-delay: 0.15s;
        }


        .demo1:nth-child(3) {
            animation-delay: 0.3s;
        }


        .demo1:nth-child(4) {
            animation-delay: 0.45s;
        }


        .demo1:nth-child(5) {
            animation-delay: 0.6s;
        }


        @keyframes demo1 {


            0%,
            60%,
            100% {
                transform: scale(1);
            }


            30% {
                transform: scale(2.5);
            }
        }


        @-webkit-keyframes demo1 {


            0%,
            60%,
            100% {
                transform: scale(1);
            }


            30% {
                transform: scale(2.5);
            }
        }
</style>