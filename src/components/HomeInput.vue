<script setup>
import {ref} from 'vue';

const selectedFiles = ref([]);
const emit = defineEmits(['dataReceived']);
const isLoading = ref(false);

const handleFilesInput = (event) => {
  selectedFiles.value = event.target.files;
};

async function analyzeFiles() {
  if (isLoading.value) {
    console.log('Already loading')
    return
  }

  if (selectedFiles.value.length === 0) {
    console.log('No files selected')
    return
  }

  isLoading.value = true;
  const formData = new FormData();
  Array.from(selectedFiles.value).forEach((file) => {
    formData.append('files', file);
  });

  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    emit('dataReceived', data)
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex flex-col items-center space-y-4">
  <input accept=".jpeg,.jpg,.png,.bmp,.tiff,.heif,.pdf" class="file-input file-input-bordered file-input-md w-full max-w-xs"
         multiple type="file" @change="handleFilesInput"/>
  <button class="btn btn-primary" @click="analyzeFiles">
    <span v-if="!isLoading">Ekstrak</span>
    <span v-else class="loading loading-dots loading-md"></span>
  </button>
  </div>
</template>

<style scoped>

</style>