<template>
  <HeaderContainer />
  <div class="flex flex-1 overflow-hidden">
    <ResourcesContainer @activeChange="activeHandler" />
    <div class="flex flex-1 flex-col overflow-hidden">
      <div class="flex flex-1 flex-row flex-nowrapf">
        <ItemList
          :activeKey="state.activeItem.key"
          :defaultCollapse="store.hideSubMenu"
          :title="state.activeItem.title"
          @collapseChange="changeCollapse"
        />
        <p style="background-color: black; color: black">1</p>
        <CanvasPlayer />
        <p style="background-color: black; color: black">1</p>
        <AttributeContainer />
      </div>
      <p style="background-color: black; color: black">1</p>
      <TrackContainer />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, nextTick } from 'vue';
  import AttributeContainer from '@/components/container/AttributeContainer.vue';
  import CanvasPlayer from '@/components/container/CanvasPlayer.vue';
  import HeaderContainer from '@/components/container/HeaderContainer.vue';
  import ResourcesContainer from '@/components/container/ResourcesContainer.vue';
  import TrackContainer from '@/components/container/TrackContainer.vue';
  import { initHotKey } from '@/utils/initHotKey';
  import ItemList from '@/components/ItemList.vue';
  import { usePageState } from '@/stores/pageState';
  import { menuData } from '@/data/baseMenu';
  const store = usePageState();
  const defaultActiveIndex = ref(0);
  let state = reactive({
    activeItem: menuData[defaultActiveIndex.value]
  });

  function activeHandler(activeItem: any) {
    state.activeItem = reactive(activeItem);
  }

  function changeCollapse(newCollpase: boolean) {
    nextTick(() => {
      store.hideSubMenu = newCollpase;
    });
  }
  initHotKey();
</script>
