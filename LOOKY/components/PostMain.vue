<template>
    <div id="PostMain" class="flex border-b py-6">
        <div class="cursor-pointer">
            <img class="rounded-full max-h-[60px]" width="60" src="https://picsum.photos/id/8/300/320" />
        </div>
        <div class="pl-3 w-full px-4">
            <div class="flex items-center justify-between pb-0.5">
                <button>
                    <span class="font-bold hover:underline cursor-pointer">
                        {{ post.PosterID }}
                    </span>
                </button>
                <button
                    class="border text-[15px] px-[21px] py-0.5 border-[#F02C56] text-[#F02C56] hover:bg-[#ffeef2] font-semibold rounded-md">
                    Follow
                </button>
            </div>
            <div class="text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]">{{post.Content}}</div>
            <div class="text-[14px] text-gray-500 pb-0.5">#fun #cool #SuperAwesome</div>
            <div class="text-[14px] pb-0.5 flex items-center font-semibold">
                <Icon name="mdi:music" size="17" />
                <div class="px-1">original sound - AWESOME</div>
                <Icon name="mdi:heart" size="20" />
            </div>

            <div class="mt-2.5 flex">
                <div
                    class="relative min-h-[480px] max-h-[580px] max-w-[260px] flex items-center bg-black rounded-xl cursor-pointer"
                    ref="videoContainer"
                    >
                    <video 
                        ref="video"
                        loop
                        muted
                        class="rounded-xl object-cover mx-auto h-full"
                        :src="'http://localhost:5000/upload/' + post.VideoURL"
                    />
                    <img 
                        class="absolute right-2 bottom-8" 
                        width="90" 
                        src="~/assets/images/tiktok-logo-white.png"
                    >
                </div>
                <div class="relative mr-[75px]">
                    <div class="absolute bottom-0 pl-2">
                        <div class="pb-4 text-center">
                            <button class="rounded-full bg-gray-200 p-2 cursor-pointer">
                                <Icon 
                                    name="mdi:heart" 
                                    size="25" 
                                />
                            </button>
                            <span class="text-xs text-gray-800 font-semibold">{{post.LikesCount}}</span>
                        </div>

                        <div class="pb-4 text-center">
                            <div class="rounded-full bg-gray-200 p-2 cursor-pointer">
                                <Icon name="bx:bxs-message-rounded-dots" size="25"/>
                            </div>
                            <span class="text-xs text-gray-800 font-semibold">{{post.CommentsCount}}</span>
                        </div>

                        <div class="text-center">
                            <div class="rounded-full bg-gray-200 p-2 cursor-pointer">
                                <Icon name="ri:share-forward-fill" size="25"/>
                            </div>
                            <span class="text-xs text-gray-800 font-semibold">{{post.ShareCount}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const { post } = defineProps(['post']);

let video = ref(null);
let videoContainer = ref(null);
let observer = null;

onMounted(() => {
  // 创建 Intersection Observer
  observer = new IntersectionObserver(handleIntersection, {
    root: null, // 使用默认的根元素，即视口
    threshold: 0.5, // 当视频元素至少 50% 可见时触发回调
  });

  // 监听 videoContainer 元素
  observer.observe(videoContainer.value);

  // 自定义回调函数处理交叉观察结果
  function handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 元素进入视口
        video.value.play(); // 播放视频
      } else {
        // 元素离开视口
        video.value.pause(); // 暂停视频
      }
    });
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect(); // 停止观察器
  }
});
</script>