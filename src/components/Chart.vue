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
import timeUtils from "@/service/time/TimeUtil.js";
import "chartjs-plugin-colorschemes";

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
    ...mapState("calendarModule", ["chartType", "termType"]),
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
    setLineData() {
      // 集計開始日
      const calcStartDay = timeUtils.getTimeMin(this.termType);
      // 集計終了日(前日の23:59:59)
      const calcEndDay = timeUtils.getDate235959(
        new Date(new Date().setDate(new Date().getDate() - 1))
      );
      // 指定した日数間隔を開けた日時の配列
      const diffDaysArr = timeUtils.getDaysArray(
        calcStartDay,
        calcEndDay,
        this.getPerDay()
      );
      // summaryをキーとした各集計開始日時、終了時のDic型配列を取得
      const tempoData = this.getBaseChartDataDic();

      this.chartData = {
        labels: diffDaysArr.map(elm => timeUtils.formatDate(elm, "yy/MM/dd")),
        datasets: tempoData.map(elm => {
          // let color = this.getRandomColors();
          return {
            label: elm.summary,
            data: this.calcChartDataByTerm(diffDaysArr, elm.terms),
            // backgroundColor: color,
            // borderColor: color,
            borderWidth: 3,
            lineTension: 0,
            fill: false
          };
        })
      };

      // チャートのオプションのセット
      // responsive, tooltips, maintainAspectRatioを設定したオブジェクトをセット
      let options = this.getBaseChartOptions();
      // y軸の設定
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
        ]
      };
      this.options = options;
    },
    setPieData() {
      // summaryに対して集計したDic型配列を取得
      const tempoData = this.getBaseChartDataDic();

      this.chartData = {
        labels: tempoData.map(elm => elm.summary),
        datasets: [
          {
            data: tempoData.map(elm => elm.hours),
            // backgroundColor: tempoData.map(() => this.getRandomColors()),
            // borderColor: this.backgroundColor,
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
          const elm = res.find(p => p.summary === current.summary);

          if (this.chartType === "LineChart") {
            /**
             * [
             *  0: {summary: String, terms:[{
             *    start: int,
             *    end: int
             *  }]}
             * ]
             */
            if (elm) {
              // 同一キーがある場合
              elm.terms.push({
                start: current.start,
                end: current.end
              });
            } else {
              res.push({
                summary: current.summary,
                terms: [
                  {
                    start: current.start,
                    end: current.end
                  }
                ]
              });
            }
          } else {
            // 経過時間(h)を格納
            const diffHours =
              (new Date(current.end).getTime() -
                new Date(current.start).getTime()) /
              (1000 * 60 * 60);

            /**
             * [
             *  0: {summary: String, hours: int}
             * ]
             */
            if (elm) {
              // 同一キーがある場合
              elm.hours += diffHours;
            } else {
              res.push({
                summary: current.summary,
                hours: diffHours
              });
            }
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
          displayColors: this.chartType === "LineChart",
          callbacks: {
            title: (tooltipItem, data) => {
              if (this.chartType === "LineChart") {
                return tooltipItem.map(
                  elm => "・" + data.datasets[elm.datasetIndex].label
                );
              }
              return data.labels[tooltipItem[0].index];
            },
            label: (tooltipItem, data) => {
              let currentDataSets = data.datasets[tooltipItem.datasetIndex];
              return this.getToolTipLabelArr(
                currentDataSets,
                currentDataSets.data[tooltipItem.index]
              );
            }
            // labelColor: (tooltipItem, chart) => {
            //   return {
            //     backgroundColor:
            //       chart.data.datasets[tooltipItem.datasetIndex].borderColor
            //   };
            // }
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
    },
    // チャートに表示する日付の間隔を返す
    getPerDay() {
      const dayOfWeek = 7;
      switch (this.termType) {
        case "1w":
          return 1;
          break;
        case "1m":
          return 1 * dayOfWeek;
          break;
        case "3m":
          return 2 * dayOfWeek;
          break;
        case "6m":
          return 4 * dayOfWeek;
          break;
        default:
          break;
      }
    },
    // 各期間内の総時間数の合計を算出しListで返す
    calcChartDataByTerm(daysArr, termArr) {
      return daysArr.map((elm, i) => {
        return (
          termArr
            // 対象期間内でフィルタリング
            .filter(val => {
              const startDate = daysArr[i];
              let endDate;
              if (i !== daysArr.length - 1) {
                endDate = new Date(daysArr[i + 1]);
              } else {
                endDate = new Date(daysArr[i]);
                endDate.setHours(23);
                endDate.setMinutes(59);
                endDate.setSeconds(59);
              }

              return this.isWithinRangeDays(
                new Date(val.start),
                new Date(startDate),
                new Date(endDate)
              );
            })
            // 合算
            .reduce((res, cur) => {
              // 経過時間(h)を格納
              const diffHours =
                (new Date(cur.end).getTime() - new Date(cur.start).getTime()) /
                (1000 * 60 * 60);

              return res + diffHours;
            }, 0)
        );
      });
    },
    // 引数の日付が期間内か判定する
    isWithinRangeDays(targetDate, rangeStartDate, rangeEndDate) {
      let targetDateTime,
        rangeStartTime,
        rangeEndTime,
        startFlag = false,
        endFlag = false;

      if (!targetDate) return false;

      let isArray = function(targetObject) {
        return Object.prototype.toString.call(targetObject) === "[object Array]"
          ? true
          : false;
      };

      // 日時をミリ秒で取得する関数
      let getDateTime = function(dateObj) {
        if (!dateObj) return;

        if (typeof dateObj.getTime !== "undefined") {
          return dateObj.getTime();
        } else if (isArray(dateObj)) {
          if (dateObj.length === 3) {
            return new Date(
              dateObj[0],
              Number(dateObj[1]) - 1,
              dateObj[2]
            ).getTime();
          } else {
            return new Date(
              dateObj[0],
              Number(dateObj[1]) - 1,
              dateObj[2],
              dateObj[3],
              dateObj[4],
              dateObj[5]
            ).getTime();
          }
        }

        return;
      };

      targetDateTime = getDateTime(targetDate);
      rangeStartTime = getDateTime(rangeStartDate);
      rangeEndTime = getDateTime(rangeEndDate);

      if (!targetDateTime) return false;

      if (rangeStartDate) {
        if (rangeStartTime && targetDateTime >= rangeStartTime) {
          startFlag = true;
        }
      } else {
        startFlag = true;
      }

      if (rangeEndDate) {
        if (rangeEndTime && targetDateTime <= rangeEndTime) {
          endFlag = true;
        }
      } else {
        endFlag = true;
      }

      if (startFlag && endFlag) return true;

      return false;
    },
  }
};
</script>
