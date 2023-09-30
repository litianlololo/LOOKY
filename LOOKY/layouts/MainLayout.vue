<template>
    <TopNav />
    <div 
        :class="route.fullPath === '/' ? 'max-w-[1140px]' : ''" 
        class="flex justify-between mx-auto w-full "
    >
        <div>
            <SideNavMain />
        </div>
        <slot/>
    </div>
</template>

<script setup>
const route = useRoute()
</script>
