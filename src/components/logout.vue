<template>
  <div>
  </div>
</template>
<script>

import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'logout',
  mounted() {
    ElMessageBox.alert('You have to log out?', 'Think wisely!', {
      callback: () => {
        ElMessage({
          type: 'info',
          message: `You has been logged out!`,
        })
        localStorage.removeItem('auth')
        window.location.href = '/'
      },
    })
  },
}
</script>