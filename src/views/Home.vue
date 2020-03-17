<template>
  <div>
    <select-box></select-box>
    <b-container fluid class="mt-4">
      <b-row class="mx-md-3">
        <b-col md="6">
          <chart></chart>
        </b-col>
        <b-col md="6 mt-md-1 mt-3">
          <chart-data-table></chart-data-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import SelectBox from "@/components/SelectBox.vue";
import Chart from "@/components/Chart.vue";
import ChartDataTable from "@/components/ChartDataTable.vue";

export default {
  name: "Home",
  components: {
    SelectBox,
    Chart,
    ChartDataTable
  },
};
</script>