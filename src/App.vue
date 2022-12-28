<template>
  <header-container></header-container>
  <timeLine></timeLine>
  <dark-mode></dark-mode>
</template>

<script>
import timeLine from '@/components/timeline.vue'
import HeaderContainer from "@/components/header";
export default {
  name: 'App',
  components: {
    timeLine,
    HeaderContainer
  }
}
</script>
