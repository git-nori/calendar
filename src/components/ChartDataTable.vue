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
      sticky-header="365px"
      hover
      head-variant="light"
      class="table-sm text-nowrap"
    >
      <template v-slot:cell(edit)="row">
        <b-button size="sm" @click="editEvent(row)" variant="outline-secondary">Edit</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import timeUtils from "@/service/time/TimeUtil.js";

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
            return timeUtils.formatDate(new Date(value), "yy/MM/dd HH:mm");
          }
        },
        {
          key: "end",
          sortable: true,
          formatter: value => {
            return timeUtils.formatDate(new Date(value), "yy/MM/dd HH:mm");
          }
        },
        { key: "edit", sortable: false, class: "text-center" }
      ]
    };
  },
  methods: {
    editEvent(row) {
      // 選択した項目についてモーダルを表示する
      console.log(row.item.summary, row.item.start, row.item.end);
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