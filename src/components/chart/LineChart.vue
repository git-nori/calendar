<script>
import { Line, mixins } from "vue-chartjs";
export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  watch: {
    // optionsに変更を検知させるため設定
    options: {
      handler(newOption, oldOption) {
        this.$data._chart.destroy()
        this.renderChart(this.chartData, this.options);
      },
      deep: true
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>
