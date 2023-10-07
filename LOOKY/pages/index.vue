<template>
  <MainLayout>
    <div class="pt-[80px] w-[calc(100%-90px)] max-w-[690px]">
      <template v-if="posts">
        <template v-for="post in posts">
          <PostMain :post="post"/>
        </template>
      </template>
      <template v-else>
        <p>No posts available</p>
      </template>
    </div>
  </MainLayout>
</template>




<script setup>
import { ref, onMounted } from 'vue';
import MainLayout from '../layouts/MainLayout.vue';

let posts = ref(null);

onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:5000/post`, {
      method: 'GET',
    })
    if (response.ok) {
      const data = await response.json();
      posts.value = data;
    }
  } catch (e) {
    console.error(e);
  }
})
</script>