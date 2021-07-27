<template>
  <div class="toast">
      {{message}}
  </div>
</template>

<script>
import {reactive,toRefs} from 'vue'

export default {
    props:['message'],
    name:"Toast"
}

export const useToastEffect = ()=>{
    const toastData =reactive({
        toastShow: false,
        toastText: ''
    })
    const changeToast =(message)=>{
        toastData.toastShow = true;
        toastData.toastText = message;
        setTimeout(() => {
            toastData.toastShow = false;
            toastData.toastText = '';
        }, 2000);
    }
    const { toastShow ,toastText} = toRefs(toastData);
    return {toastShow ,toastText, changeToast}
}
</script>

<style lang="scss" scoped>
.toast{
    width: 3.01rem;
    height: 0.56rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: rgba(0,0,0,0.3);
    color: #fff;
    text-align: center;
    line-height: 0.56rem;
    font-size: .16rem;
    border-radius: .2rem;
}
</style>

