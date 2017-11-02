<template>
  <div>
    <personal-admin v-if="role === '1'"/>
    <personal-manager v-if="role === '10'"/>
    <personal-merchant v-if="role === '100'"/>
  </div>
</template>

<script>
import personalAdmin from './personal-admin'
import personalManager from './personal-manager'
import personalMerchant from './personal-merchant'
export default {
  name: 'personal',
  data () {
    return {
      role: localStorage.loginRole
    }
  },
  components: {
    personalAdmin,
    personalManager,
    personalMerchant
  }
}
</script>

<style scoped>

</style>



