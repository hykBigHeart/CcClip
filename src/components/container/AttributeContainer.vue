<template>
  <div
    class="select-none relative pl-2"
    style="width: 450px; min-height: 350px;"
    >
    <!-- :style="attrWidth" -->
    <!-- <SplitLine
      class="top-0 left-0 bottom-0"
      direction="vertical"
      :limitSize="limitSize"
      disabled
      v-model:newWidth="pageStore.attrWidth"
    /> -->
    <span class="pl-2 inline-block w-full h-10 mb-2 leading-10   dark:border-gray-600 border-gray-300" style="background-color: #2A292E; font-size: 12px; color: #C3C2C7;">
      <p v-if="!selectTrackOptionsConfig.length">草稿参数</p>
      <p v-else>
        <span style="margin-right: 10px; color: #3C95F5">文本</span>
        <span>朗读</span>
      </p>
    </span>

    <div v-if="!selectTrackOptionsConfig.length">
  
      <div class="parameter">
        <el-descriptions
          title=""
          :column="1"
          :size="size"
        >
          <el-descriptions-item label="草稿名称：">7月30号</el-descriptions-item>
          <el-descriptions-item label="保存位置：">C:\Windows\System32\cmd.exe</el-descriptions-item>
          <el-descriptions-item label="比例：" :span="2">适应</el-descriptions-item>
          <el-descriptions-item label="分辨率：">适应</el-descriptions-item>
          <el-descriptions-item label="草稿帧率：">30.00帧/秒</el-descriptions-item>
          <el-descriptions-item label="导入管道：">保留在原有位置</el-descriptions-item>
        </el-descriptions>
  
        <span class="pl-2 inline-block w-full h-10 mb-2 leading-10 dark:border-gray-600 border-gray-300 right-bottom" style="background-color: #2A292E; font-size: 12px; color: #C3C2C7;">
          <p class="edit-btn">修改</p>
        </span>
      </div>
    </div>

    <!-- <div v-show="selectTrackOptionsConfig.length === 0" class="w-full h-full flex flex-col justify-center items-center">
      <AttrEmptyIcon />
      <span class="text-sm">点击轨道进行编辑</span>
    </div> -->
    <div v-if="selectTrackOptionsConfig.length > 0" class="absolute top-0 left-3 right-2 bottom-0 overflow-hidden" style="top: 40px;">
      <AttrContainer :attrData="selectTrackOptionsConfig" :trackId="trackStore.selectResource?.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import AttrContainer from '@/components/item/formItem/AttrContainer.vue';
  import { useTrackState } from '@/stores/trackState';
  import SplitLine from '@/components/SplitLine.vue';
  import { usePageState } from '@/stores/pageState';
  import { computed, reactive, ref } from 'vue';
  import type { ComponentSize } from 'element-plus'

const size = ref<ComponentSize>('default')
  const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  }
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  }
})

  const pageStore = usePageState();
  const trackStore = useTrackState();

  const TrackOptionsConfig: Record<string, any> = {};
  // 将data下的配置导入
  const attributeFiles = import.meta.glob('@/data/options/*.ts', { eager: true });
  for (const path in attributeFiles) {
    const name = path.match(/(?<=\/)(\w+)(?=\.ts)/) || [];
    TrackOptionsConfig[name[0]] = (attributeFiles[path] as { Options: Record<string, any> }).Options;
  }

  const selectTrackOptionsConfig = computed(() => {
    const optionsConfig = trackStore.selectResource && TrackOptionsConfig[trackStore.selectResource.type];
    return optionsConfig ? optionsConfig.attributes : [];
  });
  const attrWidth = computed(() => ({
    width: `${pageStore.attrWidth}px`
  }));
  const limitSize = reactive({
    minWidth: 300,
    maxWidth: 600
  });
</script>

<style>
.parameter {
  min-height: 300px;
}
  .el-descriptions__body {
    background-color: #1B1B1B;
    
  }
  .el-descriptions__body .el-descriptions__table:not(.is-bordered) .el-descriptions__cell {
      font-size: 12px;
    }

    .right-bottom {
      position: absolute;
      bottom: 0;
      margin: 0;
    }
    .edit-btn {
      display: inline;
      background-color: #4F5056;
      padding: 3px 10px;
      cursor: pointer;
      border-radius: 3px;
      margin-left: 80%;
    }
</style>