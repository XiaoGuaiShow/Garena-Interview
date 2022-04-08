<template>
    <div class="hello">
        <div id="apiBox"></div>
        <div class="img_box" v-for="(img,index) in imgList" :key="index">
            <img :src="img" alt="">
        </div>
        <div v-if="showTip" id="scapeBox">
            <div>
                <img src="../assets/scape.png" alt="">
                <p style="color:#ffffff;margin-top: 40px">{{tip}}</p>
            </div>
        </div>
    </div>
</template>

<script>
  import {ajax} from '../utils/ajax';

  const img = require('../assets/img.jpg');
  const orientation = "onorientationchange" in window ? "orientationchange" : "resize";

  export default {
    name: 'HelloWorld',
    data() {
      return {
        imgList: [img, img, img, img, img, img, img, img],
        tip: '',
        showTip: false
      }
    },

    methods: {
      orientationEvent() {
        if (window.orientation === 180 || window.orientation === 0) {
          this.showTip = false;
        }
        if (window.orientation === 90 || window.orientation === -90) {
          this.showTip = true;
        }
      }
    },

    created() {
      ajax({
        url: '/mooc/data.json',
        method: 'GET',
        success: (res) => {
          this.tip = res.data.tip;
        }
      });

      this.orientationEvent();
      window.addEventListener(orientation, this.orientationEvent, false);
    },

    beforeDestroy() {
      window.removeEventListener(orientation, this.orientationEvent)
    }
  }
</script>

<style scoped>
    .img_box {
        float: left;
        width: 100%;
    }

    .img_box img {
        width: 100%;
    }

    @media only screen and (max-width: 600px) {
        .img_box {
            width: 100%;
        }
    }

    @media only screen and (min-width: 600px) {
        .img_box {
            width: 100%;
        }
    }

    @media only screen and (min-width: 768px) {
        .img_box {
            width: 50%;
        }
    }

    @media only screen and (min-width: 992px) {
        .img_box {
            width: 25%;
        }
    }

    @media only screen and (min-width: 1200px) {
        .img_box {
            width: 25%;
        }
    }

    #scapeBox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, .5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #scapeBox img {
        width: 26%;
        animation: myMove 1s infinite;
    }

    @keyframes myMove {
        0% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(90deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }
</style>
