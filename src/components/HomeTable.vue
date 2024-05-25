<script setup>
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/id'
import {ref, watch} from 'vue'

dayjs.extend(LocalizedFormat)
dayjs.extend(customParseFormat)

const prop = defineProps(['data'])
const analysisResults = ref([])

const formatNumber = (num) => {
  return num.toLocaleString('id-ID');
}

watch(() => prop.data, (value) => {
  // map each value.analysisResults to analysisResults
  analysisResults.value = value?.analysisResults.map((result) => {
    let transactionDate
    const transactionDateValue = result.result.documents[0].fields.TransactionDate.value;
    const transactionTimeValue = result.result.documents[0].fields.TransactionTime.value;
    const transactionDateContent = result.result.documents[0].fields.TransactionDate.content;

    transactionDate = transactionDateValue
      ? dayjs(`${transactionDateValue.split('T')[0]} ${transactionTimeValue || ''}`, 'YYYY-MM-DD HH:mm:ss')
      : dayjs(transactionDateContent, ['DD MMMM YYYY', 'DD MM YYYY'], 'id')

    if (!transactionDate.isValid()) {
      transactionDate = ''
    }

    return {
      filename: result.filename,
      transactionDate: transactionDate,
      merchant: result.result.documents[0].fields.MerchantName.value || '',
      total: result.result.documents[0].fields.Total.value
    }
  })
})
</script>

<template>
<div>
  <div v-show="prop.data" class="overflow-x-auto">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>Tanggal</th>
          <th>Merchant</th>
          <th>Jumlah</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in analysisResults" :key="item.filename">
          <td>{{ item.transactionDate }}</td>
          <td>{{ item.merchant }}</td>
          <td>Rp{{ formatNumber(item.total) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<style scoped>

</style>