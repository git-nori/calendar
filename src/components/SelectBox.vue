<template>
  <b-container fluid class="mt-3">
    <b-row>
      <b-col sm="4">
        <b-form-select size="sm" v-model="chartType" :options="chartOptions"></b-form-select>
      </b-col>
      <b-col sm="4" class="mt-3 mt-sm-0">
        <b-form-select size="sm" v-model="termType" :options="termOptions"></b-form-select>
      </b-col>
      <b-col sm="4" class="text-right mt-3 mt-sm-0">
        <b-button
          :disabled="isDisabledShowChart"
          @click="showChart()"
          class="mx-1"
          variant="outline-success"
          size="sm"
        >
          <b-icon icon="pie-chart-fill"></b-icon>ShowChart
        </b-button>
        <b-button @click="addEvent()" class="mx-1" variant="outline-primary" size="sm">
          <b-icon icon="calendar"></b-icon>AddEvent
        </b-button>
        <b-button
          :disabled="isDisabledExport"
          @click="exportData()"
          class="mx-1"
          variant="outline-info"
          size="sm"
        >
          <b-icon icon="download"></b-icon>Export
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "SelectBox",
  data() {
    return {
      chartType: null,
      termType: null,
      chartOptions:[
        {value: null, text: "Select chart"},
        {value: "Donuts", text: "Donuts"},
        {value: "Line", text: "Line"},
        {value: "Bar", text: "Bar"},
      ],
      termOptions: [
          { value: null, text: "Select term" },
          { value: "1w", text: "1week" },
          { value: "1m", text: "1month" },
          { value: "3m", text: "3month" },
          { value: "6m", text: "6month" }
      ]
    };
  },
  computed: {
    isDisabledShowChart() {
      // chartTypeとtermTypeが選択済みの場合showChartボタンを活性化する
      return !(this.chartType !== null && this.termType !== null);
    },
    isDisabledExport() {
      // termTypeが選択済みの場合exportボタンを活性化する
      return !(this.termType !== null);
    },
  },
  methods: {
    showChart() {
      this.$emit("showChart", {
        chartType: this.chartType,
        termType: this.termType
      });
    },
    addEvent() {
      // モーダルを表示し、Googleカレンダーにイベントを登録する
      console.log("addEvent");
    },
    exportData() {
      console.log("export");
    }
  }
};
</script>