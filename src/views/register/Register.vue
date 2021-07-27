<template>
  <div class="wrapper">
    <img class="wrapper__img"
         src="http://www.dell-lee.com/imgs/vue3/user.png">
    <div class="wrapper__input">
      <input v-model="username"
             class="wrapper__input__content"
             type="text"
             placeholder="请输入用户名"
             name=""
             id="">
    </div>
    <div class="wrapper__input">
      <input v-model="password"
             class="wrapper__input__content"
             type="password"
             placeholder="请输入密码"
             name=""
             id="">
    </div>
    <div class="wrapper__input">
      <input v-model="ensurement"
             class="wrapper__input__content"
             type="password"
             placeholder="确认密码"
             name=""
             id="">
    </div>
    <div @click="handleRegisterClick"
         class="wrapper__register-button">注册</div>
    <div @click="handleLoginClick"
         class="wrapper__register-link">已有账号去登录</div>
    <Toast v-if="toastShow"
           :message='toastText' />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request.js'
import Toast, { useToastEffect } from '../../components/Toast.vue'

const useRegisterEffect = (changeToast) => {
  const data = reactive({
    username: '',
    password: '',
    ensurement: ''
  });
  const router = useRouter();
  const handleRegisterClick = async () => {
    const { username, password, ensurement } = data;
    const flag = (username != '') && (password != '') && (ensurement != '');
    if (flag) {
      try {
        const result = await post('/api/user/register', {
          username: data.username,
          password: data.password
        })
        // console.log(result)
        if (result.errno === 0) {
          router.push({ name: 'Login' })
        } else {
          changeToast('注册失败')
        }
      }
      catch (error) {
        changeToast('请求失败')
      }
    } else {
      changeToast('请输入注册信息')
    }
  };
  const { username, password, ensurement } = toRefs(data);
  return { username, password, ensurement, handleRegisterClick }
}

const useLoginEffect = () => {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push({ name: 'Login' })
  }
  return { handleLoginClick }
}

export default {
  name: 'Register',
  components: { Toast },
  setup () {
    const { toastShow, toastText, changeToast } = useToastEffect();
    const { username, password, ensurement, handleRegisterClick } = useRegisterEffect(changeToast);
    const { handleLoginClick } = useLoginEffect();
    return {
      toastShow, toastText, changeToast,
      username, password, ensurement, handleRegisterClick,
      handleLoginClick
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    width: 0.66rem;
    height: 0.66rem;
    margin: 0 auto 0.4rem auto;
  }
  &__input {
    box-sizing: border-box;
    width: 2.98rem;
    height: 0.48rem;
    background: #f9f9f9;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;
    border-radius: 0.06rem;
    margin: 0 auto 0.16rem auto;
    padding: 0 0 0 0.12rem;
    &__content {
      font-size: 0.16rem;
      line-height: 0.43rem;
      width: 100%;
      border: none;
      background: none;
      outline: none;
      ::placeholder {
        font-size: 0.16rem;
        color: rgba(0, 0, 0, 0.5);
        line-height: 0.24rem;
      }
    }
  }
  &__register-button {
    line-height: 0.48rem;
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    border-radius: 0.04rem;
    font-size: 0.16rem;
    color: #ffffff;
    text-align: center;
  }
  &__register-link {
    text-align: center;
    font-size: 0.14rem;
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>