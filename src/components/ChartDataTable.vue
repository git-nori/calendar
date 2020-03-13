<template>
  <div>
    <!-- responsive => overflow-x, sticky-header => overflow-y and FixedHeader -->
    <b-table
      :items="getChartTableData"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-compare="mySortCompare"
      sort-icon-left
      responsive
      sticky-header="350px"
      hover
      head-variant="light"
      class="table-sm text-nowrap"
    >
      <template v-slot:cell(modify)="row">
        <b-button size="sm" @click="modifyEvent(row)" variant="outline-secondary">Modify</b-button>
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
      sortBy: "summary",
      fields: [
        { key: "summary", sortable: true },
        {
          key: "start",
          sortable: true,
          formatter: value => {
            return this.formatDate(new Date(value), "yy/MM/dd HH:mm");
          }
        },
        {
          key: "end",
          sortable: true,
          formatter: value => {
            return this.formatDate(new Date(value), "yy/MM/dd HH:mm");
          }
        },
        { key: "modify", sortable: false, class: "text-right" }
      ]
    };
  },
  methods: {
    modifyEvent(row) {
      // 選択した項目についてモーダルを表示する
      console.log(row.item.summary, row.item.start, row.item.end);
    },
    /**
     * 引数のフォーマットに応じて日付オブジェクトをフォーマットする
     * date: 日付オブジェクト, format: 書式フォーマット
     */
    formatDate(date, format) {
      format = format.replace(/yyyy/g, date.getFullYear());
      format = format.replace(
        /yy/g,
        date
          .getFullYear()
          .toString()
          .substr(-2)
      );
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
    },
    mySortCompare(a, b, key) {
      if (key === "summary") {
        // summary列でのソートの場合
        if (
          typeof a["start"] === "undefined" ||
          typeof a["end"] === "undefined"
        )
          return 1;
        if (
          typeof b["start"] === "undefined" ||
          typeof b["end"] === "undefined"
        )
          return -1;

        if (a[key].toUpperCase() < b[key].toUpperCase()) {
          return 1;
        } else if (a[key].toUpperCase() > b[key].toUpperCase()) {
          return -1;
        }
        return 0;
      } else {
        return false;
      }
    }
  },
  computed: {
    ...mapGetters("calendarModule", ["getChartTableData"])
  }
};
</script>