<script setup>
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/id'
import {ref, watch} from 'vue'

dayjs.extend(LocalizedFormat)
dayjs.extend(customParseFormat)

const prop = defineProps(['data'])
const emit = defineEmits(['analysisResultsUpdated'])
const analysisResults = ref([])

const formatNumber = (num) => {
  return num.toLocaleString('id-ID');
}

watch(() => prop.data, (value) => {
  // map each value.analysisResults to analysisResults
  analysisResults.value = value?.analysisResults.map((result) => {
    let transactionDate
    const transactionDateObject = result.result.documents[0].fields.TransactionDate;
    const transactionTimeObject = result.result.documents[0].fields.TransactionTime;

    transactionDate = transactionDateObject.value
      ? dayjs(`${transactionDateObject.value.split('T')[0]} ${transactionTimeObject.value || ''}`, 'YYYY-MM-DD HH:mm:ss')
      : dayjs(transactionDateObject.content, ['DD MMMM YYYY', 'DD MM YYYY'], 'id')

    if (!transactionDate.isValid()) {
      transactionDate = ''
    }

    return {
      filename: result.filename,
      transactionDate: transactionDate,
      merchant: result.result.documents[0].fields.MerchantName ? result.result.documents[0].fields.MerchantName.value : 'Merchant Name Not Found',
      total: result.result.documents[0].fields.Total.value
    }
  })

  emit('analysisResultsUpdated', analysisResults.value)
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
          <td>{{ item.transactionDate ? item.transactionDate.format('L LT') : '' }}</td>
          <td>{{ item.merchant }}</td>
          <td>Rp{{ formatNumber(item.total) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>