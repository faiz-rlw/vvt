<script setup lang="ts">
import { useValidateForm } from "@/composables/useValidateForm";
let rules = {
    username: [{ required: true, message: "请输入账号" }],
    password: [{ required: true, message: "请输入密码" }],
    code: [{ required: true, message: "请输入验证码" }],
  },
  formData = ref({
    username: "",
    password: "",
    code: "",
    uuid: "",
  }),
  codeImg = ref("");
function getCode() {
  // 获取账号密码登录的uuid 和 验证码
}
onMounted(() => {
  getCode();
});

function login() {
  useValidateForm(formData, rules)
    .then(() => {})
    .catch(() => {});
}
</script>
<template>
  <div class="login_page">
    <div class="login_area">
      <form class="login_wrapper">
        <h1>登录</h1>
        <div class="login_form">
          <div class="form_item">
            <span>账号</span>
            <input
              v-model="formData.username"
              type="text"
              placeholder="请输入"
              class="input_item"
            />
          </div>
          <div class="form_item">
            <span>密码</span>
            <input
              v-model="formData.password"
              type="password"
              autocomplete="off"
              placeholder="请输入"
              class="input_item"
            />
          </div>
          <div class="form_item">
            <span>验证码</span>
            <div class="input_flex">
              <input
                v-model="formData.code"
                type="text"
                placeholder="请输入"
                class="input_item"
                @keyup.enter="login"
              />
              <img :src="codeImg" alt="验证码" @click="getCode" />
            </div>
          </div>
          <button type="button" class="login_btn" @click="login">登 录</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login_page {
  width: 100vw;
  height: 100vh;
  background-color: #1d4359;
  .login_area {
    .login_wrapper {
      h1 {
        text-align: center;
      }
      .login_form {
        .form_item {
          margin: 20px 0;
          span {
            display: block;
            margin: 5px 8px;
            font-weight: 100;
          }
          .input_flex {
            display: flex;
            img {
              margin-left: 16px;
              width: 30%;
              height: 63px;
            }
          }
          .input_item {
            flex: 1;
            width: 100%;
            border-radius: 10px;
            padding: 10px 14px;
            letter-spacing: 0.2em;
            font-size: 20px;
            font-weight: 200;
            &:focus {
              outline: none;
            }

            &::placeholder {
              letter-spacing: normal;
            }
          }
        }
        .login_btn {
          width: 100%;
          border-radius: 40px;
          color: #fff;
          border: 0;
          font-weight: 100;
          margin-top: 10px;
          cursor: pointer;
        }
      }
    }
  }
}
/*一般大于手机的尺寸CSS*/
@media (min-width: 1024px) {
  .login_area {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 85%;
    height: 90%;
    background: url("../assets/login/login_two.jpg") no-repeat;
    background-size: 90% 100%;
    background-color: #fff;
    border-radius: 20px;
    .login_wrapper {
      width: 25vw;
      position: absolute;
      right: 12%;
      top: 50%;
      transform: translateY(-50%);
      h1 {
        text-align: center;
        font-size: 45px;
        color: rgb(81, 100, 115);
        margin-bottom: 40px;
      }
      .login_form {
        margin: 10px 0;
        .form_item {
          span {
            color: rgb(81, 100, 115);
          }
          .input_item {
            height: 60px;
            border: 1px solid #d7dfe5;

            &::placeholder {
              font-size: 16px;
              color: #d7dfe5;
            }
          }
        }
        .login_btn {
          height: 50px;
          background-color: rgb(59, 72, 89);
          font-size: 20px;
        }
      }
    }
  }
}
/*手机端CSS*/
@media (max-width: 1023px) {
  .login_page {
    .login_area {
      width: 100vw;
      height: 100vh;
      background: url("../assets/login/login_bg_phone.png") no-repeat;
      background-size: 100% 100%;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      .login_wrapper {
        width: 70%;
        height: 60%;
        padding-top: 15%;
        h1 {
          font-size: 30px;
          color: #fff;
        }
        .login_form {
          .form_item {
            margin: 10px 0;
            span {
              color: rgb(113, 129, 141);
            }
            .input_item {
              height: 30px;
              border: 1px solid rgb(113, 129, 141);
              background-color: transparent;
              color: #fff;
              font-size: 12px;

              &::placeholder {
                font-size: 12px;
                color: #d7dfe5;
              }
            }
          }
          .login_btn {
            height: 40px;
            background-color: rgb(235, 95, 93);
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
<route lang="yaml">
meta:
  layout: blank
</route>
