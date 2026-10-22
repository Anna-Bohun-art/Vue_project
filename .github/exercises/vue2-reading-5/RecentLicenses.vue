<template>
  <div class="recent-licenses">
    <h3>Zuletzt hinzugefügt</h3>
    <ul>
      <li v-for="license in recent" :key="license.id">
        {{ license.title }} ({{ license.schoolName }})
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RecentLicenses',
  computed: {
    ...mapState('licenses', ['licenses']),
    recent() {
      return this.licenses.slice(0, 3)
    },
  },
}
</script>
