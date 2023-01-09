<template>
  <header-container></header-container>
  <router-view></router-view>
  <footer-container></footer-container>

</template>

<script>
import HeaderContainer from "@/components/header";
import FooterContainer from "@/components/footer";
export default {
  name: 'App',
  components: {
    HeaderContainer,
    FooterContainer
  }
}
</script>
