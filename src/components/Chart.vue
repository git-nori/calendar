<template>
  <div>
    <div v-if="!loaded" class="text-center">
      <b-spinner type="grow" variant="secondary" label="loading"></b-spinner>
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
      options: {}
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
      // summaryに対して集計したDic型配列を取得
      const tempoData = this.getBaseChartDataDic();

      // 表示するチャートデータのセット
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

      // チャートのオプションのセット
      // responsive, tooltips, maintainAspectRatioを設定したオブジェクトをセット
      let options = this.getBaseChartOptions();
      // 凡例の表示
      options["legend"] = { display: false };
      // x, y軸の設定
      options["scales"] = {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: (value, index, values) => {
                return value + "h";
              }
            },
            gridLines: { display: true }
          }
        ],
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
              // x軸の表示ラベル
              callback: (label, index, labels) => {
                return label.length < 6 ? label : label.slice(0, 6) + "...";
              }
            },
            gridLines: { display: false }
          }
        ]
      };
      this.options = options;
    },
    setLineData() {},
    setPieData() {
      // summaryに対して集計したDic型配列を取得
      const tempoData = this.getBaseChartDataDic();

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

      // チャートのオプションのセット
      // responsive, tooltips, maintainAspectRatioを設定したオブジェクトをセット
      this.options = this.getBaseChartOptions();
    },
    getRandomColors() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgba(" + r + "," + g + "," + b + ", 0.2)";
    },
    // チャート生成に必要なDic型データを返す
    getBaseChartDataDic() {
      function compareSummarys(a, b) {
        if (a.summary.toUpperCase() < b.summary.toUpperCase()) {
          return 1;
        } else if (a.summary.toUpperCase() > b.summary.toUpperCase()) {
          return -1;
        }
        return 0;
      }

      // テーブルのデータに合わせるため、項目名順にソート
      return [...this.filteredChartData]
        .sort(compareSummarys)
        .reduce((res, current) => {
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
    },
    // チャート表示のオプションを返す
    getBaseChartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          // ラベルに対してのboxの表示
          displayColors: false,
          callbacks: {
            title: (tooltipItem, data) => {
              return data.labels[tooltipItem[0].index];
            },
            label: (tooltipItem, data) => {
              let currentDataSets = data.datasets[tooltipItem.datasetIndex];
              return this.getToolTipLabelArr(
                currentDataSets,
                currentDataSets.data[tooltipItem.index]
              );
            }
          }
        }
      };
    },
    // ツールチップに表示する項目の配列を返す
    getToolTipLabelArr(curDatasets, curVal) {
      let arr = ["Hours: " + curVal + "h"];

      switch (this.chartType) {
        case "BarChart":
          break;
        case "LineChart":
          break;
        case "PieChart":
          let totalDataVal = curDatasets.data.reduce(
            (accumulator, elm) => accumulator + elm
          );
          arr.push(
            "Percent: " + ((curVal / totalDataVal) * 100).toFixed(1) + "%"
          );
          break;
        default:
          break;
      }
      return arr;
    }
  }
};
</script>
