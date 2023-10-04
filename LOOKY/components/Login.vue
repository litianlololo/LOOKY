<template>
    <div class="text-center text-[28px] mb-4 font-bold">Log in</div>

    <div class="px-6 pb-1.5 text-[15px]">Email address</div>

    <div class="px-6 pb-2">
        <TextInput 
            placeholder="Email address"
            v-model:input="email"
            inputType="email"
            :autoFocus="true"
            error=""
        />
    </div>

    <div class="px-6 pb-2">
        <TextInput 
            placeholder="Password"
            v-model:input="password"
            inputType="password"
        />
    </div>
    <div class="px-6 text-[12px] text-gray-600">Forgot password?</div>

    <div class="px-6 pb-2 mt-6">
        <button 
            :disabled="(!email || !password)"
            :class="(!email || !password) ? 'bg-gray-200' : 'bg-[#F02C56]'"
            @click="login()" 
            class="w-full text-[17px] font-semibold text-white py-3 rounded-sm"
        >
            Log in
        </button>
    </div>
</template>

<script setup>
const {$userStore, $generalStore} = useNuxtApp()
import { message } from 'ant-design-vue';

let email = ref(null)
let password = ref(null)
let errors = ref(null)

const login = async () => {
  try {
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // 设置请求头为 JSON
      },
      body: JSON.stringify({ // 将请求数据序列化为 JSON 字符串
        email: email.value,
        password: password.value,
      }),
    })
    
    const data = await response.json();
    console.log(data); // 打印响应数据
    
    if(data.statusCode == 200){

        $userStore.id = data.user.id;
        $userStore.name = data.user.name;
        $userStore.bio = data.user.bio;
        $userStore.RegistrationDate = data.user.RegistrationDate;
        $userStore.email = data.user.email;
        $generalStore.isLoginOpen = false;
        //userStore.image = data.image;
        console.log($userStore.email);
    }
    else{
        message.error(data.message)
    }
  } catch (error) {
    console.log(error.json);
    // 处理登录错误
    //errors.value = "登录失败，请检查您的用户名和密码。";
  }
};
</script>