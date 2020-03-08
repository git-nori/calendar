<template>
  <div>
    <div class="text-center">
      <b-spinner v-if="!loaded" type="grow" variant="secondary" label="loading"></b-spinner>
    </div>
    <!-- chartTypeに応じたチャートを表示する -->
    <component :is="chartType" v-if="loaded" :chartData="barData" :options="options" />
  </div>
</template>

<script>
import BarChart from "@/components/chart/BarChart.vue";
import LineChart from "@/components/chart/LineChart.vue";
import PieChart from "@/components/chart/PieChart.vue";
import { mapState } from 'vuex'

export default {
  data() {
    return {
      loaded: true,
      barData: {
        labels: ["January", "February", "March", "April", "May", "March"],
        datasets: [
          {
            label: "Sample1",
            data: [28, 20, 30, 40, 80, 30],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      pieData: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      lineData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
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
    ...mapState('calendarModule', {
      chartType: 'chartType'
    })
  },
};
</script>
