<script setup>
import { ref } from 'vue';

const selectedFiles = ref([]);
const base64Files = ref([]);

const handleFilesInput = (event) => {
  selectedFiles.value = event.target.files;
  base64Files.value = [];

  Array.from(selectedFiles.value).forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      base64Files.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  });
};

async function analyzeFiles() {
  const formData = new FormData();
  Array.from(selectedFiles.value).forEach((file) => {
    formData.append('files', file);
  });

  const response = await fetch('api/analyze', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  console.log(data);
}
</script>

<template>
  <input type="file" class="file-input file-input-bordered file-input-md w-full max-w-xs" accept=".jpeg,.jpg,.png,.bmp,.tiff,.heif,.pdf" multiple @change="handleFilesInput" />
  <button class="btn btn-primary" @click="analyzeFiles">Analyze</button>
</template>

<style scoped>

</style>