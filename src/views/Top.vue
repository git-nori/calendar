<template>
  <div>
    <b-jumbotron class="container-fluid text-center">
      <template v-slot:header>APP TITLE</template>
      <template v-slot:lead>This is an app that makes Google Calendar easy to use</template>
      <hr class="mt-4" />

      <b-button v-if="isLoggedIn" @click="signin()" class="mt-3" variant="outline-secondary" size="sm">Sign In</b-button>

    </b-jumbotron>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name:'Top',
  data() {
    return {};
  },
  computed: {
    // ...mapState('authModule', {
    //   isLoggedIn: 'isLoggedIn'
    // }),
    ...mapState("authModule", ["isLoggedIn"]),
    ...mapState("calendarModule", ["items"])
  },
  methods: {
    ...mapActions("authModule", ["signin"]),
    ...mapActions("calendarModule", ["getData"])
  }
};
</script>