<template>
    <UploadError :errorType="errorType" />

    <UploadLayout>
        <div class="w-full mt-[80px] md-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4">
            <div>
                <div class="text-[23px] font-semibold">Upload video</div>
                <div class="text-gray-400 mt-1">Post a video to your account</div>
            </div>

            <div class="mt-8 md:flex gap-6">

                <label v-if="!fileDisplay" for="fileInput" @drop.prevent="onDrop" @dragover.prevent="$event" class="
                    md:mx-0
                    mx-auto
                    mt-4
                    mb-6
                    flex 
                    flex-col 
                    items-center 
                    justify-center 
                    w-full 
                    max-w-[260px] 
                    h-[470px] 
                    text-center 
                    p-3 
                    border-2 
                    border-dashed 
                    border-gray-300 
                    rounded-lg 
                    hover:bg-gray-100 
                    cursor-pointer
                    ">
                    <Icon name="majesticons:cloud-upload" size="40" color="#b3b3b1" />
                    <div class="mt-4 text-[17px]">Select video to upload</div>
                    <div class="mt-1.5 text-gray-500 text-[13px]">Or drag and drop a file</div>
                    <div class="mt-12 text-gray-400 text-sm">MP4</div>
                    <div class="mt-2 text-gray-400 text-[13px]">Up to 30 minutes</div>
                    <div class="mt-2 text-gray-400 text-[13px]">Less than 2 GB</div>
                    <div class="px-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-[#F02C56] rounded-sm">
                        Select file
                    </div>
                    <input ref="file" type="file" id="fileInput" hidden accept=".mp4" @input="onChange" />
                </label>

                <div v-else class="
                        md:mx-0
                        mx-auto
                        mt-4
                        md:mb-12
                        mb-16
                        flex 
                        items-center 
                        justify-center 
                        w-full 
                        max-w-[260px] 
                        h-[540px] 
                        p-3 
                        rounded-2xl
                        cursor-pointer
                        relative
                    ">
                    <div class="bg-black h-full w-full" />
                    <img class="absolute z-20 pointer-events-none" src="~/assets/images/mobile-case.png">
                    <img class="absolute right-4 bottom-6 z-20" width="90" src="~/assets/images/tiktok-logo-white.png">
                    <video autoplay loop muted class="absolute rounded-xl object-cover z-10 p-[13px] w-full h-full"
                        :src="fileDisplay" />

                    <div
                        class="absolute -bottom-12 flex items-center justify-between z-50 rounded-xl border w-full p-2 border-gray-300">
                        <div class="flex items-center truncate">
                            <Icon name="clarity:success-standard-line" size="16" class="min-w-[16px]" />
                            <div class="text-[11px] pl-1 truncate text-ellipsis">{{ fileData.name }}</div>
                        </div>
                        <button @click="clearVideo" class="text-[11px] ml-2 font-semibold">
                            Change
                        </button>
                    </div><!---->
                </div>
                <div class="mt-4 mb-6">
                    <div class="flex bg-[#F8F8F8] py-4 px-6">
                        <div>
                            <Icon class="mr-4" size="20" name="mdi:box-cutter-off" />
                        </div>
                        <div>
                            <div class="text-semibold text-[15px] mb-1.5">Divide videos and edit</div>
                            <div class="text-semibold text-[13px] text-gray-400">
                                You can quickly divide videos into multiple parts, remove redundant parts and turn landscape
                                videos into portrait videos
                            </div>
                        </div>
                        <div class="flex justify-end max-w-[130px] w-full h-full text-center my-auto">
                            <button class="px-8 py-1.5 text-white text-[15px] bg-[#F02C56] rounded-sm">
                                Edit
                            </button>
                        </div>
                    </div>
                    <div class="mt-5">
                        <div class="flex items-center justify-between">
                            <div class="mb-1 text-[15px]">Caption</div>
                            <div class="text-gray-400 text-[12px]">{{ caption.length }}/150</div>
                        </div>
                        <input v-model="caption" maxlength="150" type="text" class="
                                w-full
                                border
                                p-2.5
                                rounded-md
                                focus:outline-none
                            ">
                    </div>

                    <div class="flex gap-3">
                        <button @click="discard()"
                            class="px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray-100 rounded-lg">
                            Discard
                        </button>
                        <button :disabled="!$userStore.id" :class="!$userStore.id ? 'bg-gray-200' : 'bg-[#F02C56]'"
                            @click="createPost()"
                            class="px-10 py-2.5 mt-8 border text-[16px] text-white bg-[#F02C56] rounded-lg">
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </UploadLayout>
</template>

<script setup>
const { $userStore, $generalStore } = useNuxtApp()
import UploadLayout from '~/layouts/UploadLayout.vue';
import { message } from 'ant-design-vue';

let file = ref(null)
let fileDisplay = ref(null)
let errorType = ref(null)
let caption = ref('')
let fileData = ref(null)
let errors = ref(null)
let isUploading = ref(false)

watch(() => caption.value, (caption) => {
    if (caption.length >= 150) {
        errorType.value = 'caption'
        return
    }
    errorType.value = null
})

//拖动上传
const onDrop = (e) => {
    errorType.value = ''
    file.value = e.dataTransfer.files[0];
    fileData.value = e.dataTransfer.files[0]

    let extention = file.value.name.substring(file.value.name.lastIndexOf('.') + 1);

    if (extention !== 'mp4') {
        errorType.value = 'file'
        return
    }

    fileDisplay.value = URL.createObjectURL(e.dataTransfer.files[0])
}
//点击上传
const onChange = () => {
    fileDisplay.value = URL.createObjectURL(file.value.files[0])
    fileData.value = file.value.files[0]
}
const discard = () => {
    file.value = null
    fileDisplay.value = null
    fileData.value = null
    caption.value = null
}
const clearVideo = () => {
    file.value = null
    fileDisplay.value = null
    fileData.value = null
}

const createPost = async () => {
  try {
    const formData = new FormData();
    formData.append('Content', caption.value);
    formData.append('PosterID', $userStore.id);
    formData.append('file', file.value);
    if(!file.value)
        console.log("File Empty");
    else
        console.log(file.value);
    const response = await fetch('http://localhost:5000/post/createpost', {
      method: 'POST',
      body: formData, // 使用 formData 作为请求体
    });
    const data = await response.json();
    console.log(data); // 打印响应数据
    // 处理响应
    if (response.ok) {
        message.ok("发布成功");
      // 请求成功，执行相关操作
    } else {
      // 请求失败，处理错误
      message.error(data.message);
    }
  } catch (e) {
    console.error(e);
  }
};
</script>
