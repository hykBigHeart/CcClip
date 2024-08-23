<template>
    <!-- class="flex flex-col transition-all duration-200 overflow-x-hidden border-r dark:border-gray-600 border-gray-300" -->
  <div
    :class="collapse ? 'w-0' : 'w-500'"
  >
    <div class="container">
      <div class="left">
        <el-tree
          style="max-width: 600px"
          node-key="id"
          :data="treeData"
          :props="defaultProps"
          :default-expanded-keys="defaultExpandedKeys"
          @node-click="handleNodeClick"
        />
      </div>
      <div v-if="title == '素材库'" class="right">
        <div class="upload-box">
          <h1>导入</h1>
          <p>视频、音讯、图片</p>
        </div>
      </div>
    </div>



    <div v-if="title != '素材库'" class="min-h-full w-80 flex flex-col overflow-hidden dark:border-gray-600 border-gray-300">
      <!-- <div class="h-10   dark:border-gray-600 border-gray-300">
        <span class="inline leading-10 pl-3 select-none">{{ title }}</span>
        <ElIcon :size="16" class="mr-3 mt-1 float-right cursor-pointer p-2 box-content" @click="switchCollapse">
          <Fold />
        </ElIcon>
      </div> -->
      <div class="overflow-auto flex-1 pb-10">
        <template v-for="(subData, index) of listData" :key="`${index}-${subData.type}`">
          <SubList :type="subData.type" :listData="subData" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Fold } from '@element-plus/icons-vue';
  import { computed, ref, watch } from 'vue';
  import SubList from '@/components/SubList.vue';
  import { getData } from '@/api/mock';
  import { useRequest } from 'vue-hooks-plus';
import { Tree } from 'element-plus/es/components/tree-v2/src/types';
  const props = defineProps({
    activeKey: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    defaultCollapse: {
      type: Boolean,
      default: false
    }
  });

const defaultExpandedKeys = ref([1])
  let treeData: Tree[] = [
    {
      label: '片头素材',
      id: 1,  
      children: [
        {
          label: '默认素材库',
          id: 11,  
        },
        {
          label: '自定义导入',
          id: 12,  
        },
      ],
    },
    {
      label: '云素材',
      id: 2,  

      children: [
        {
          label: '默认素材库',
      id: 21,  

        },
        {
          label: '自定义导入',
      id: 22,  

        },
      ],
    },
    {
      label: '素材库',
      id: 3,  

      children: [
        {
          label: '默认素材库',
      id: 31,  

        },
        {
          label: '自定义导入',
      id: 32,  

        },
      ],
    },
  ]
  watch(()=> props.title, newVal => {
    console.log('newVal', newVal);
    if (newVal === '素材库') {
      treeData = [
        {
          label: '片头素材',
          id: 1,  
          children: [
            {
              label: '默认素材库',
              id: 11,  
            },
            {
              label: '自定义导入',
              id: 12,  
            },
          ],
        },
        {
          label: '云素材',
          id: 2,  

          children: [
            {
              label: '默认素材库',
          id: 21,  

            },
            {
              label: '自定义导入',
          id: 22,  

            },
          ],
        },
        {
          label: '素材库',
          id: 3,  

          children: [
            {
              label: '默认素材库',
          id: 31,  

            },
            {
              label: '自定义导入',
          id: 32,  

            },
          ],
        },
      ]
      defaultExpandedKeys.value = [1]
    }
    else if (newVal === '文本') {
      treeData = [
        {
          label: '新建文本',
          id: 21,  
          children: [
            {
              label: '默认素材库',
              id: 211,  
            }
          ],
        },
        {
          label: '花字',
          id: 21,  
          children: [
            {
              label: '默认素材库',
              id: 211,  
            }
          ],
        },
        {
          label: '文字模板',
          id: 21,  
          children: [
            {
              label: '默认素材库',
              id: 211,  
            }
          ],
        },
        {
          label: '本地字幕',
          id: 21,  
          children: [
            {
              label: '默认素材库',
              id: 211,  
            }
          ],
        },
      ]
      defaultExpandedKeys.value = []
    }
  });


  const defaultProps = {
    children: 'children',
    label: 'label',
  }

  const handleNodeClick = (data: Tree) => {
    console.log(data)
  }

  const emit = defineEmits({
    collapseChange(newCollapse: boolean) {
      return newCollapse !== null;
    }
  });
  const { data: listData, refresh } = useRequest(() => getData(props.activeKey));
  watch(() => props.activeKey, () => {
    refresh();
  });

  const title = computed(() => props.title);
  const collapse = ref(props.defaultCollapse);
  function switchCollapse() {
    collapse.value = !collapse.value;
  }
  watch(collapse, newValue => {
    emit('collapseChange', newValue);
  });
  watch(() => props.defaultCollapse, newValue => {
    collapse.value = newValue;
  });
</script>

<style>
.container {
  display: flex;
  height: 100%;
  flex: .8;
}

.w-500 {
  width: 450px;
  height: 100%;
  display: flex;
}

.left {
  background-color: #252527;
  height: 100%;
  min-width: 120px;
  .el-tree {
    font-size: 12px;
    background-color: #252527;
    color: #CFCFD3
  }
  .el-tree-node__content:hover, .el-tree-node:focus>.el-tree-node__content {
    background-color: #252527;
    color: #3C95F5;
  }
}

.right {
  position: relative;
  width: 100%;
  .upload-box {
    cursor: pointer;
    text-align: center;
    border: 1px dashed #393939;
    padding: 30px 0;
    width: 200px;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    h1 {
      font-size: 13px;
    }
    p {
      font-size: 10px;
      color: #535353;
    }
  }
}
</style>