<template>
  <header class="h-12 w-full flex flex-nowrap flex-row items-center justify-center   dark:border-gray-600 border-gray-300" style="background-color: #000000;">
    <div v-if="false" style="width: 100%; height: 100%;">
      <div class="flex w-1/3 pl-2 items-center">
      <div class="w20">
        <img class="h-8" :src="logoImage" alt="">
      </div>
      <span class="text-xs select-none ml-4">自动保存：2023-02-10 00:51</span>
    </div>
    <h2 class="align-middle w-1/5 text-center flex-1 select-none text-sm">
      {{ store.pageTitle }}
    </h2>
    </div>
    <div class="custom-header">
      <ElButton color="#3496FE" style="margin-left: 10px;" @click="JumpEvent"><span style="color: white;">视频翻译</span></ElButton>
      <ElButton color="#3496FE">
        <!-- <ElIcon :size="size" :color="color" class="mr-1">
          <Download />
        </ElIcon> -->
        <img style="width: 20px;" src="/public/image/icons/daochu.png" alt="">
        <span style="color: white;">导出</span>
      </ElButton>
      <el-switch
      v-if="false"
        class="mr-10"
        size="large"
        :active-icon="Moon"
        :inactive-icon="Sunny"
        :inline-prompt="inner"
        v-model="store.isDark"
        :style="switchClass"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
  import logoImage from '@/assets/ccLogo.png';
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { Download, Sunny, Moon } from '@element-plus/icons-vue';
  import { usePageState } from '@/stores/pageState';
  const store = usePageState();
  const size = ref(14);
  const color = '#fff';
  const inner = ref(true);
  const switchClass = computed(() => ({
    '--el-switch-border-color': store.isDark ? '#4B5563' : '#D1D5DB',
    '--el-color-white': store.isDark ? '#F3F4F6' : '#374151'
  }));
  
// 跳转
  const router = useRouter();

  const JumpEvent = () => {
    router.push('/preview')
  }
</script>

<style>
  .custom-header {
    position: absolute;
    right: 10px;
    background: #000000;
  }
</style>