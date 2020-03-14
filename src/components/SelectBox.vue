<template>
  <b-container class="mt-3">
    <b-row>
      <b-col md="4">
        <!-- chartTypeの切り替えで表示するコンポーネントを切り替える -->
        <b-form-select
          size="sm"
          :value="chartType"
          :options="chartOptions"
          @change="setChartType({ chartType: $event })"
        ></b-form-select>
      </b-col>
      <b-col md="4" class="mt-3 mt-md-0">
        <b-form-select
          size="sm"
          :value="termType"
          :options="termOptions"
          @change="setTermType({ termType: $event })"
        ></b-form-select>
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
          class="ml-1"
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
import { mapActions, mapState } from "vuex";
import timeUtils from "@/service/time/TimeUtil.js";

export default {
  name: "SelectBox",
  data() {
    return {
      chartOptions: [
        { value: null, text: "Select chart" },
        { value: "PieChart", text: "Pie" },
        { value: "LineChart", text: "Line" },
        { value: "BarChart", text: "Bar" }
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
    ...mapState("calendarModule", ["chartType", "termType"]),
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
    ...mapActions("calendarModule", ["getData", "setChartType", "setTermType"]),
    showChart() {
      // 集計開始日
      const timeMin = timeUtils.getTimeMin(this.termType);
      // 集計終了日をセット(前日の23:59:59)
      const timeMax = timeUtils.getDate235959(
        new Date(new Date().setDate(new Date().getDate() - 1))
      );
      this.getData({ timeMin: timeMin, timeMax: timeMax });
      this.setChartType({ chartType: this.chartType });
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