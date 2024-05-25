<script setup>
import HomeInput from "@/components/HomeInput.vue";
import HomeTable from "@/components/HomeTable.vue";
import {ref} from "vue";
import HomeExport from "@/components/HomeExport.vue";

const analyzedData = ref(null);
const analysisResults = ref([]);
</script>

<template>
  <HomeInput @dataReceived="analyzedData = $event"/>
  <HomeTable :data="analyzedData" @analysisResultsUpdated="analysisResults = $event"/>
  <HomeExport v-show="analyzedData" :analysisResults="analysisResults"/>
</template>