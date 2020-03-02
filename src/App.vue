<template>
  <div id="app">
    <header-item />
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderItem from "@/components/HeaderItem.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "app",
  components: {
    "HeaderItem": HeaderItem
  },
  computed: {
    ...mapState("apiModule", ["api"]),
    ...mapState("authModule", ["authorized"])
  },
  created() {
    this.setApi();
    this.load();
  },
  methods: {
    ...mapActions("apiModule", ["setApi", "load"])
  }
};
</script>

<style>
</style>