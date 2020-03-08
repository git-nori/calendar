<template>
  <b-container fluid class="mt-3">
    <b-row>
      <b-col md="4">
        <b-form-select size="sm" v-model="chartType" :options="chartOptions"></b-form-select>
      </b-col>
      <b-col md="4" class="mt-3 mt-md-0">
        <b-form-select size="sm" v-model="termType" :options="termOptions"></b-form-select>
      </b-col>
      <b-col md="4" class="text-right mt-3 mt-md-0">
        <b-button
          :disabled="isDisabledShowChart"
          @click="showChart"
          class="mx-1"
          variant="outline-success"
          size="sm"
        >
          <b-icon icon="pie-chart-fill"></b-icon>ShowChart
        </b-button>
        <b-button @click="addEvent" class="mx-1" variant="outline-primary" size="sm">
          <b-icon icon="calendar"></b-icon>AddEvent
        </b-button>
        <b-button
          :disabled="isDisabledExport"
          @click="exportData"
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
import { mapActions } from "vuex";

export default {
  name: "SelectBox",
  data() {
    return {
      chartType: null,
      termType: null,
      chartOptions: [
        { value: null, text: "Select chart" },
        { value: "Donuts", text: "Donuts" },
        { value: "Line", text: "Line" },
        { value: "Bar", text: "Bar" }
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
    }
  },
  methods: {
    ...mapActions("calendarModule", ["getData", "setChartType"]),
    showChart() {
      let timeMin = this.getTimeMin(); // 集計開始日
      this.getData({ timeMin: timeMin });
      this.setChartType({ chartType: this.chartType });
    },
    addEvent() {
      // モーダルを表示し、Googleカレンダーにイベントを登録する
      console.log("addEvent");
    },
    exportData() {
      console.log("export");
    },
    getTimeMin() {
      // googleCalendarから取得する集計開始日を算出する
      let date = new Date();
      if (this.termType.indexOf("w") != -1) {
        date.setDate(
          date.getDate() - 7 * parseInt(this.termType.replace("w", ""))
        );
      } else if (this.termType.indexOf("m") != -1) {
        date.setMonth(
          date.getMonth() - parseInt(this.termType.replace("m", ""))
        );
      }
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      return date;
    }
  }
};
</script>