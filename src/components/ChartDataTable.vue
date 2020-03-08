<template>
  <div>
    <!-- responsive => overflow-x, sticky-header => overflow-y and FixedHeader -->
    <b-table
      :items="getChartTableData"
      :fields="fields"
      :sort-desc.sync="sortDesc"
      :sort-by.sync="sortBy"
      sort-icon-left
      responsive
      sticky-header="350px"
      hover
      head-variant="light"
    >
      <template v-slot:cell(show_details)="row">
        <b-button size="sm" @click="showDetail(row)" variant="outline-secondary">Details</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ChartDataTable",
  data() {
    return {
      sortBy: "hour",
      sortDesc: false,
      fields: [
        { key: "summary", sortable: true },
        {
          key: "start",
          sortable: true,
          formatter: value => {
            return this.formatDate(new Date(value), 'yy/MM/dd HH:mm')
          }
        },
        {
          key: "end",
          sortable: true,
          formatter: value => {
            return this.formatDate(new Date(value), 'yy/MM/dd HH:mm')
          }
        },
        { key: "show_details", sortable: false, class: "text-right" }
      ]
      // items: [
      //   { term: "January", hour: 28 },
      //   { term: "February", hour: 20 },
      //   { term: "March", hour: 30 },
      //   { term: "April", hour: 40 },
      //   { term: "May", hour: 80 },
      //   { term: "March", hour: 30 },
      //   { term: "March", hour: 30 },
      //   { term: "March", hour: 30 },
      //   { term: "March", hour: 30 },
      //   { term: "March", hour: 30 },
      //   { term: "March", hour: 30 }
      // ]
    };
  },
  methods: {
    showDetail(row) {
      // 選択した項目についてモーダルを表示する
      console.log(row.item.term, row.item.hour);
    },
    /**
     * 引数のフォーマットに応じて日付オブジェクトをフォーマットする
     * date: 日付オブジェクト, format: 書式フォーマット
     */
    formatDate(date, format) {
      format = format.replace(/yyyy/g, date.getFullYear());
      format = format.replace(/yy/g, (date.getFullYear().toString().substr(-2)));
      format = format.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2));
      format = format.replace(/dd/g, ("0" + date.getDate()).slice(-2));
      format = format.replace(/HH/g, ("0" + date.getHours()).slice(-2));
      format = format.replace(/mm/g, ("0" + date.getMinutes()).slice(-2));
      format = format.replace(/ss/g, ("0" + date.getSeconds()).slice(-2));
      format = format.replace(
        /SSS/g,
        ("00" + date.getMilliseconds()).slice(-3)
      );
      return format;
    }
  },
  computed: {
    ...mapGetters("calendarModule", ["getChartTableData"])
  }
};
</script>