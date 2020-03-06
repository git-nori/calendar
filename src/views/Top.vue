<template>
  <div>
    <b-jumbotron class="container-fluid text-center">
      <template v-slot:header>APP TITLE</template>
      <template v-slot:lead>This is an app that makes Google Calendar easy to use</template>
      <hr class="mt-4" />
      <b-button
        v-if="!isLoggedIn"
        @click="signin()"
        class="mt-3"
        variant="outline-secondary"
        size="sm"
      >Sign In</b-button>
    </b-jumbotron>
    <b-container fluid>
      <b-row class="mx-3 mb-5">
        <b-col class="text-center"><h2 class="display-4">SERVICES</h2></b-col>
      </b-row>
      <b-row class="mx-3">
        <b-col sm="12">
          <b-card-group deck>
            <b-card>
              <b-card-title>
                <div class="h3 mb-2">
                  <b-icon icon="pie-chart-fill"></b-icon>
                  <p>pie-chart</p>
                </div>
              </b-card-title>
              <b-card-sub-title sub-title-text-variant="info" class="mb-3">activity percentage</b-card-sub-title>
              <b-card-text class="text-secondary">Visualize the percentage of your daily activities</b-card-text>
            </b-card>

            <b-card>
              <b-card-title>
                <div class="h3 mb-2">
                  <b-icon icon="bar-chart-fill"></b-icon>
                  <p>bar-chart</p>
                </div>
              </b-card-title>
              <b-card-sub-title sub-title-text-variant="info" class="mb-3">some activity meter</b-card-sub-title>
              <b-card-text class="text-secondary">Compare the activity amount of various activities</b-card-text>
            </b-card>
            <b-card>
              <b-card-title>
                <div class="h3 mb-2">
                  <b-icon icon="graph-up"></b-icon>
                  <p>line-chart</p>
                </div>
              </b-card-title>
              <b-card-sub-title sub-title-text-variant="info" class="mb-3">transition of activity</b-card-sub-title>
              <b-card-text
                class="text-secondary"
              >Displays the transition of the activity amount of a specific activity</b-card-text>
            </b-card>

            <b-card>
              <b-card-title>
                <div class="h3 mb-2">
                  <b-icon icon="download"></b-icon>
                  <p>export file</p>
                </div>
              </b-card-title>
              <b-card-sub-title sub-title-text-variant="info" class="mb-3">export in various formats</b-card-sub-title>
              <b-card-text class="text-secondary">Export your activity data in various formats</b-card-text>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Top",
  data() {
    return {};
  },
  computed: {
    // ...mapState('authModule', {
    //   isLoggedIn: 'isLoggedIn'
    // }),
    ...mapState("authModule", ["isLoggedIn"]),
  },
  methods: {
    ...mapActions("authModule", ["signin"]),
  }
};
</script>