<template>
  <div>
      <select-box @showChart="showChart"></select-box>
  </div>
</template>

<script>
import SelectBox from "@/components/SelectBox.vue";

export default {
  name: "Home",
  components: {
    SelectBox
  },
  methods: {
    showChart(types){
      // チャートを表示する
    }
  },
};
</script>