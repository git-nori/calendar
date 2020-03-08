<template>
  <div>
    <!-- responsive => overflow-x, sticky-header => overflow-y and FixedHeader -->
    <b-table
      :items="items"
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
export default {
  name: "ChartDataTable",
  data() {
    return {
      sortBy: "hour",
      sortDesc: false,
      fields: [
        { key: "month", sortable: false },
        { key: "hour", sortable: true },
        { key: "show_details", sortable: false }
      ],
      items: [
        { month: "January", hour: 28 },
        { month: "February", hour: 20 },
        { month: "March", hour: 30 },
        { month: "April", hour: 40 },
        { month: "May", hour: 80 },
        { month: "March", hour: 30 },
        { month: "March", hour: 30 },
        { month: "March", hour: 30 },
        { month: "March", hour: 30 },
        { month: "March", hour: 30 },
        { month: "March", hour: 30 }
      ]
    };
  },
  methods: {
    showDetail(row) {
      // 選択した項目についてモーダルを表示する
      console.log(row.item.month, row.item.hour);
    }
  }
};
</script>