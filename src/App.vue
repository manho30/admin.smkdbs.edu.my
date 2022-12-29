<template>
  <header-container></header-container>
  <dark-mode></dark-mode>
  <login-form class="mt-5"></login-form>
</template>

<script>
import HeaderContainer from "@/components/header";
import loginForm from "@/components/login";

export default {
  name: 'App',
  components: {
    HeaderContainer,
    loginForm
  }
}
</script>
