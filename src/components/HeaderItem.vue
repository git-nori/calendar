<template>
  <div class="mb-3">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">CalendarApp</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!authorized" @click="signin()">Sign In</b-nav-item>
          <b-nav-item v-if="authorized" @click="signout()">Sign Out</b-nav-item>
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
    ...mapState('authModule', ['authorized'])
  },
  methods: {
    ...mapActions('authModule', ['signin', 'signout'])
  },
};
</script>