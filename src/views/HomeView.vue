<script setup>
import HomeInput from "@/components/HomeInput.vue";
import HomeTable from "@/components/HomeTable.vue";
import {ref} from "vue";

const analyzedData = ref(null);
</script>

<template>
  <HomeInput @dataReceived="analyzedData = $event"/>
  <HomeTable :data="analyzedData"/>
</template>