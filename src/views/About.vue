<template>
  <div>
    <div id="about">
    <h1>About</h1>
  </div>
  </div>
</template>

<script>
import Rx from '../libs/rx.js'

export default {
  name: 'About',
  components: {
  },
  mounted() {
    // Rx.executeRxSubscription()
    // Rx.executeRxSubject()
    // Rx.executeRxBroadcast()
    Rx.executeRxBroadcastWithSubject()
  },
  methods: {
  }
};
</script>
