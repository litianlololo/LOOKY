<template>
    <div class="text-center text-[28px] mb-4 font-bold">Sign up</div>

    <div class="px-6 pb-2">
        <TextInput 
            placeholder="Full name"
            v-model:input="name"
            inputType="text"
            :autoFocus="true"
            error=""
        />
    </div>

    <div class="px-6 pb-2">
        <TextInput 
            placeholder="Email address" 
            v-model:input="email"
            inputType="email"
            error=""
        />
    </div>

    <div class="px-6 pb-2">
        <TextInput 
            placeholder="Password"
            v-model:input="password"
            inputType="password"
            error=""
        />
    </div>

    <div class="px-6 pb-2">
        <TextInput 
            placeholder="Confirm password"
            v-model:input="confirmPassword"
            inputType="password"
            error=""
        />
    </div>
    <div class="px-6 text-[12px] text-gray-600">Forgot password?</div>

    <div class="px-6 pb-2 mt-6">
        <button 
            :disabled="(!name || !email || !password || !confirmPassword)"
            :class="(!name || !email || !password || !confirmPassword) ? 'bg-gray-200' : 'bg-[#F02C56]'"
            @click="register()" 
            class="w-full text-[17px] font-semibold text-white bg-[#F02C56] py-3 rounded-sm"
        >
            Sign up
        </button>
    </div>
</template>

<script setup>
const { $userStore, $generalStore } = useNuxtApp() 

let name = ref(null)
let email = ref(null)
let password = ref(null)
let confirmPassword = ref(null)
let errors = ref(null)

const register = async () => {
  try {
    const response = await fetch('http://localhost:5000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // 设置请求头为 JSON
      },
      body: JSON.stringify({ // 将请求数据序列化为 JSON 字符串
        name: name.value, 
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