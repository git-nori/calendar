<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "app",
  components: {
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