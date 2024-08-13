<template>
  <div class="about">
    <h1><b>logo</b></h1>
    <div class="container">
      <div class="hender"></div>
      <div class="core">
        <h1>视频翻译</h1>
        <span>使用自然的語音尅隆和真實的說話風格，-鍵無缝翻譯您的視频!</span>
        <p>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref('');
const options = ref([{label: 'zhangsan', value: 1}]);
</script>

<style scoped>
.about {
  background-color: #fff;
  width: 100%;
  height: 100vh;
}
.about h1 {
  color: #3A98F5;
}
.container {
  width: 100%;
  height: 100vh
}
.hender {
  width: 100%;
  height: 100px;
  background: linear-gradient(#DAECFC, #fff);
}
.core {
  width: 50%;
  margin: auto;
  background-color: pink;
  text-align: center;
}
.core h1 {
  font-size: 20px;
  color:#3A98F5 ;
}
</style>