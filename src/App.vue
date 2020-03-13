<template>
  <div id="app">
    <header-item />
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderItem from "@/components/HeaderItem.vue";
import { mapActions, mapState } from "vuex";
import gcApi from "@/service/api/gcApi.js";

export default {
  name: "app",
  components: {
    HeaderItem: HeaderItem
  },
  computed: {
    ...mapState("authModule", ["isSignedIn"])
  },
  created() {
    // client, OAuth2, calendarをロード
    this.handleClientLoad();
  },
  methods: {
    ...mapActions("authModule", ["setIsSignedIn"]),
    handleClientLoad() {
      gapi.load("client:auth2", this.initClient);
    },

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    initClient() {
      gapi.client
        .init({
          apiKey: gcApi.API_KEY,
          clientId: gcApi.CLIENT_ID,
          discoveryDocs: gcApi.DISCOVERY_DOCS,
          scope: gcApi.SCOPES
        })
        .then(
          r => {
            gapi.auth2
              .getAuthInstance()
              .isSignedIn.listen(
                this.setIsSignedIn(
                  gapi.auth2.getAuthInstance().isSignedIn.get()
                )
              );
          },
          e => {
            console.log(e);
          }
        );
    }
  }
};
</script>

<style>
</style>