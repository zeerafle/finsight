<script setup>
import HomeInput from "@/components/HomeInput.vue";
import HomeTable from "@/components/HomeTable.vue";
import HomeExport from "@/components/HomeExport.vue";
import {ref} from "vue";

const analyzedData = ref(null);
const analysisResults = ref([]);
</script>

<template>
  <div class="flex flex-col gap-4">
  <div class="flex items-center flex-col md:flex-row">
    <div class="flex flex-col gap-2 text-primary font-bold text-2xl mb-2">
      <p>Punya bukti pembayaran atau nota?</p>
      <p>Digital atau Kertas?</p>
      <p>Scan semua disini untuk langsung hitung totalnya</p>
    </div>
    <HomeInput @dataReceived="analyzedData = $event"/>
  </div>
  <HomeTable :data="analyzedData" @analysisResultsUpdated="analysisResults = $event"/>
  <HomeExport v-show="analyzedData" :analysisResults="analysisResults"/>
  </div>
</template>