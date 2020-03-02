<template>
  <div class="authentification">
    <b-container fluid class="text-center">
      <b-row>
        <b-col>
          <b-jumbotron>
            <template v-slot:header>APP TITLE</template>
            <template v-slot:lead>This is an app that makes Google Calendar easy to use</template>
            <hr class="my-4" />

            <p>Let's go to sign in and fun</p>

            <b-btn @click="signin()" variant="outline-primary" class="mt-3">Sign In</b-btn>

            <!-- <b-btn v-if="authorized" @click="getData" variant="success">Get Data</b-btn>
        <div class="item-container" v-if="authorized && items">
          <pre v-html="items"></pre>
            </div>-->
          </b-jumbotron>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
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