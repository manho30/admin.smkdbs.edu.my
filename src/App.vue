<template>
  <header-container></header-container>
  <router-view></router-view>
</template>

<script>
import HeaderContainer from "@/components/header";

export default {
  name: 'App',
  components: {
    HeaderContainer,
  }
}
</script>
