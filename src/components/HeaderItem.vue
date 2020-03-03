<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand :to="{name:'top'}">CalendarApp</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" style="font-size: 1em;"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="isLoggedIn" :to="{name:'home'}">Home</b-nav-item>
          <b-nav-item href="#">About</b-nav-item>
          <b-nav-form>
            <b-button v-if="!isLoggedIn" @click="signin()" class="mt-3 mt-md-0 ml-md-3" variant="outline-secondary" size="sm">Sign In</b-button>
            <b-button v-if="isLoggedIn" @click="signout()" class="mt-3 mt-md-0 ml-md-3" variant="outline-secondary" size="sm">Sign Out</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: "HeaderItem",
  computed: {
    ...mapState('authModule', ['isLoggedIn'])
  },
  methods: {
    ...mapActions('authModule', ['signin', 'signout'])
  },
};
</script>