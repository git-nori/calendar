<template>
  <div>
    <div class="text-center">
      <b-spinner v-if="!loaded" type="grow" variant="secondary" label="loading"></b-spinner>
    </div>
    <!-- chartTypeに応じたチャートを表示する -->
    <component
      :is="chartType"
      v-if="loaded && chartData.datasets.length"
      :chartData="chartData"
      :options="options"
    />
  </div>
</template>

<script>
import BarChart from "@/components/chart/BarChart.vue";
import LineChart from "@/components/chart/LineChart.vue";
import PieChart from "@/components/chart/PieChart.vue";
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      loaded: true,
      chartFuncs: {
        BarChart: this.setBarData,
        LineChart: this.setLineData,
        PieChart: this.setPieData
      },
      chartData: {
        labels: [],
        datasets: []
      },
      options: { responsive: true, maintainAspectRatio: false }
    };
  },
  components: {
    BarChart,
    LineChart,
    PieChart
  },
  computed: {
    /**
     * この書き方も可能(コンポーネント内の変数名とvuexのメソッド名が異なる場合に使用)
     * ...mapState('calendarModule', {chartType: 'chartType'})
     */
    ...mapState("calendarModule", ["chartType"]),
    ...mapGetters("calendarModule", ["filteredChartData"])
  },
  watch: {
    chartType() {
      if (this.isReadySetChartData()) {
        // チャート表示用にデータをセットする
        this.chartFuncs[this.chartType]();
      }
    },
    filteredChartData() {
      if (this.isReadySetChartData()) {
        // チャート表示用にデータをセットする
        this.chartFuncs[this.chartType]();
      }
    }
  },
  methods: {
    // 表示するチャートデータをセット可否フラグ
    isReadySetChartData() {
      return (
        this.chartFuncs[this.chartType] != null && this.filteredChartData.length
      );
    },
    setBarData() {
      console.log("setLineData");
    },
    setLineData() {
      console.log("setLineData");
    },
    setPieData() {
      // {summary: hours}の連想配列を格納
      const tempoData = this.filteredChartData.reduce((res, current) => {
        // 経過時間(h)を格納
        const startTime = new Date(current.start).getTime();
        const endTime = new Date(current.end).getTime();
        const diffHours = (endTime - startTime) / (1000 * 60 * 60);

        const element = res.find(p => p.summary === current.summary);
        if (element) {
          // 同一キーがある場合
          element.hours += diffHours;
        } else {
          res.push({
            summary: current.summary,
            hours: diffHours
          });
        }
        return res;
      }, []);

      this.chartData = {
        labels: tempoData.map(elm => elm.summary),
        datasets: [
          {
            data: tempoData.map(elm => elm.hours),
            backgroundColor: tempoData.map(() => this.getRandomColors()),
            borderColor: this.backgroundColor,
            borderWidth: 1
          }
        ]
      };

      this.options = {
        tooltips: {
          enabled: true,
          // colorBox of tooltip's label option
          displayColors: false,
          callbacks: {
            title: (tooltipItem, data) => {
              return data.labels[tooltipItem[0].index];
            },
            label: (tooltipItem, data) => {
              let selectedDatasets = data.datasets[tooltipItem.datasetIndex];
              let selectedVal = selectedDatasets.data[tooltipItem.index];
              let totalDataVal = selectedDatasets.data.reduce(
                (accumulator, elm) => accumulator + elm
              );
              return [
                "Hours: " + selectedVal + "h",
                "Percent: " + ((selectedVal / totalDataVal) * 100).toFixed(1) + "%"
              ];
            }
          }
        }
      };
    },
    getRandomColors() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgba(" + r + "," + g + "," + b + ", 0.2)";
    }
  }
};
</script>
