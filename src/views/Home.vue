<template>
  <div class="authentification">
    <b-container>
      <h2>VueJS + Google Calendar Example</h2>Authentification
      <button v-if="!authorized" @click="handleAuthClick">Sign In</button>
      <button v-if="authorized" @click="handleSignoutClick">Sign Out</button>
      <hr />
      <button v-if="authorized" @click="getData">Get Data</button>
      <div class="item-container" v-if="authorized && items">
        <pre v-html="items"></pre>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
    };
  },
  computed: {
    // ...mapState('authModule', {
    //   authorized: 'authorized'
    // }),
    ...mapState('authModule', ['authorized']),
    ...mapState('calendarModule', ['items']),
  },
  methods: {
    ...mapActions('authModule', ['signin', 'signout']),
    ...mapActions('calendarModule', ['getData']),
    handleAuthClick(){
      this.signin()
    },
    handleSignoutClick(){
      this.signout()
    },
  }
};
</script>