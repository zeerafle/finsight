<script setup>
import {utils, writeFile} from 'xlsx';

const props = defineProps(['analysisResults']);

const exportCsv = () => {
  const header = 'filename,Tanggal,Merchant,Jumlah\n';
    const csv = props.analysisResults.map((item) => {
      return `${item.filename},${item.transactionDate ? item.transactionDate.format('L LT') : ''},${item.merchant},Rp${item.total}`;
    }).join('\n');

    const blob = new Blob([header+csv], {type: 'text/csv;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.csv';
    a.click();
    URL.revokeObjectURL(url);
};

const exportExcel = () => {
  const data = props.analysisResults.map((item) => {
    return {
      filename: item.filename,
      Tanggal: item.transactionDate ? item.transactionDate.format('L LT') : '',
      Merchant: item.merchant,
      Jumlah: `Rp${item.total}`
    }
  })
  const worksheet = utils.json_to_sheet(data)
  const workbook = utils.book_new()
  utils.book_append_sheet(workbook, worksheet, "Sheet1")
  writeFile(workbook, 'export.xlsx', { compression: true })
}
</script>

<template>
  <div>
  <button @click="exportCsv()">Export to CSV</button>
  <button @click="exportExcel()">Export to Excel</button>
  </div>
</template>