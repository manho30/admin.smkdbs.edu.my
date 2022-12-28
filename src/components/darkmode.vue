<template>
  <el-switch v-model="darkMode" @change="changeMode" active-text="Dark" inactive-text="Light"></el-switch>
</template>
<script>
// toggle dark mode
export default {
  name: 'darkMode',
  data: function () {
    return {
      darkMode: localStorage.getItem('darkMode') === 'true' || true
    }
  },
  methods: {
    changeMode () {
      if (this.darkMode) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('darkMode', 'on')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('darkMode', 'off')
      }
    },
    applyMode () {
      if (localStorage.getItem('darkMode') === 'on') {
        document.documentElement.classList.add('dark')
        this.darkMode = true
      } else {
        document.documentElement.classList.remove('dark')
        this.darkMode = false
      }
    }
  },
  mounted () {
    this.applyMode()
  }
}
</script>