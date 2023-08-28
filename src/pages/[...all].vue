<script setup lang="ts">
const router = useRouter();
function goPath(type: number) {
  if (type === 1) {
    router.push("/");
  } else {
    router.go(-1);
  }
}
</script>
<template>
  <div class="error_page_area">
    <div class="error_content_area">
      <h1>404</h1>
      <p>You are lost this page</p>
      <p class="cotent_text">
        you've reached the edge of universe.The Page you've requested , can't
        befound. Don't Worry , you can return to previous page.
      </p>
      <button class="cotent_btn" @click="goPath(1)">GO HOME</button>
      <button class="cotent_btn" @click="goPath(-1)">BACK</button>
    </div>
    <div class="astronaut">
      <img
        src="../assets/notFound/astronaut.png"
        class="astronaut_img"
        alt=""
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@font-face {
  font-family: dogica;
  src: url(../assets/font/dogica.ttf);
}
.error_page_area {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url(../assets/notFound/bg.png);
  background-attachment: fixed;
  background-size: cover;
  .astronaut {
    transform: rotate(0deg) translate(0, -18%);
    animation-name: PAnimation;
    animation-direction: alternate;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-duration: 3s;
  }
  .error_content_area {
    width: 40vw;
    font-family: dogica;
    z-index: 1;
    h1 {
      font-size: 5vw;
      margin-bottom: 30px;
    }
    p {
      font-size: 1vw;
      margin: 10px 0;
      line-height: 2vw;
    }
    .cotent_btn {
      width: 10vw;
      height: 50px;
      border-radius: 30px;
      margin-top: 10px;
      cursor: pointer;
      transition: 0.3s;
      background-color: #fff;
      color: #000;
      border: 2px solid #000;
      font-size: 1vw;
      &:hover {
        background-color: #000;
        color: #fff;
      }
    }
  }
}
@media (min-width: 1024px) {
  .error_page_area {
    position: relative;
    display: flex;
    .astronaut {
      position: absolute;
      left: 50%;
      top: 50%;
    }
    .error_content_area {
      width: 40vw;
      position: absolute;
      left: 10%;
      top: 40%;
      transform: translateY(-50%);
    }
    .cotent_btn {
      margin-right: 4px;

      &:nth-last-child(1) {
        margin: 0;
      }
    }
  }
}
@media (max-width: 1024px) {
  .error_page_area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .error_content_area {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 10vh;
      h1 {
        font-size: 10vw;
        margin-bottom: 30px;
      }
      p {
        font-size: 3vw;
        line-height: 6vw;
      }
      .cotent_text {
        display: none;
      }
      .cotent_btn {
        width: 30vw;
      }
    }
  }
  .astronaut {
    width: 100%;
    display: flex;
    justify-content: center;
    .astronaut_img {
      width: 70%;
      height: 80%;
      transform: translateY(40%);
    }
  }
}

@keyframes PAnimation {
  0% {
    transform: rotate(0deg) translate(0, -15%);
  }
  100% {
    transform: rotate(10deg) translate(0, -18%);
  }
}
</style>
