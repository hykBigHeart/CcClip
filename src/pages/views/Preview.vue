<template>
  <div class="about">
    <h1 style="padding: 10px;"><b>logo</b></h1>
    <div class="container">
      <div class="hender"></div>
      <div class="core">
        <h1>视频翻译</h1>
        <span>使用自然的語音尅隆和真實的說話風格，-鍵無缝翻譯您的視频!</span>
        <div style="margin: 100px 0;">
          <el-upload action="#" list-type="picture-card" :auto-upload="false" drag @change="handleFileChange">
            <el-icon><Plus /></el-icon>
            <h4 style="color: #3A98F5; font-size: 16px;">拖放到上传</h4>
            <p style="color: gray; font-size: 12px;">档案类型：mp4、mov、WebM文件大小可连1GB</p>
            <div class="yao-qiu">要求</div>

            <template #file="{ file }">
              <div style="width: 100%;">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              </div>
              <div class="qifei">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              </div>
            </template>
          </el-upload>
        </div>
        <p>
          <el-select v-model="value" placeholder=" " style="background-color: #fff;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
            <template #prefix>选择目标语言</template>
            <template #empty>234</template>
          </el-select>
        </p>
        <p style="margin-top: 80px;">
          <el-button type="primary" style="width: 100%; height: 30px; border-radius: 5px;" @click="translated = true">翻译这个视频</el-button>
        </p>

        <div style="margin: 10px 0;" v-if="uploadedFiles.length > 0 && translated">
          <div v-for="file in uploadedFiles" :key="file.name">
            <img :src="file.url" :alt="file.name" style="margin: 10px 0; border-radius: 10px;">
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
console.log('r',route.fullPath);

import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'
const value = ref('');
const options = ref([
{label: '中文', value: 1},
{label: '英文', value: 2},
{label: '日文', value: 3}
]);

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const translated = ref(false)

const uploadedFiles = ref<any[]>([]); // 用于存储上传的文件信息

const handleRemove = (file: UploadFile) => {
  console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
  console.log(file)
}

const handleFileChange = (file: any, fileList: any[]) => {
  uploadedFiles.value = fileList.map(f => ({
    name: f.name,
    url: URL.createObjectURL(f.raw), // 创建文件的URL
  }));
}

watch(() => route.fullPath, () => {
  // 当路由路径变化时，强制刷新组件或页面
  console.log('343');
  
});

onMounted(() => {
  console.log(111);
  
  const hasRefreshed = sessionStorage.getItem('hasRefreshed');
  if (!hasRefreshed) {
    sessionStorage.setItem('hasRefreshed', 'true');
    window.location.reload();
  }
});

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
  /* background-color: pink; */
  text-align: center;
  height: 80%;
  overflow-y: auto
}
.core h1 {
  font-size: 24px;
  color:#3A98F5 ;
}
.el-select {
  width: 100%;
}
.el-input__wrapper {
  background-color: #fff;
  height: 50px;
}
/deep/ .el-input {
  height: 40px;
  /* border-radius: 40px; */
  background-color: #fff !important;
}

/deep/ [type='text']:focus {
  box-shadow: unset;
}
/deep/ .el-upload-list--picture-card {
  --el-upload-list-picture-card-size: unset;
}
/deep/ .el-upload, /deep/ .el-upload-list {
  width: 100%;
}
.yao-qiu {
  background-color: #D4E9FF;
  color: #9AABBC;
  display: inline-block;
  padding: 3px 20px;
  font-size: 12px;
  border-radius: 5px;
  margin-top: 50px
}
.qifei {
  position: absolute;
  bottom: 0px;
}
.dark body .el-input {
  background-color: #fff
}
</style>