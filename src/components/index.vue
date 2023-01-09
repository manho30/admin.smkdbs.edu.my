<template>
  <div class="bg-white rounded-md p-4">
    <div class="flex flex-col md:flex-row ml-4">
      <div class="md:w-1/2">
        <div>
          <div v-if="!login" class="flex bg-yellow-100 rounded-lg p-4 mb-4 text-sm text-yellow-700" role="alert"> You have not login yet. <a href="/login" class="ml-1"> Login Now.</a></div>
          <div v-else class="flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700"> You have login as <span class="ml-1 font-bold">{{username}}</span>. <a href="/logout" class="ml-1"> Logout Now.</a></div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-white rounded-md p-4 mt-3">
    <sponsor></sponsor>
  </div>
</template>
<script>
import sponsor from "@/components/sponsor";
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'content1',
    components: {
      sponsor,
    },
    data() {
      return {
        login: false,
        username: '',
      }
    },
    mounted() {
      this.checkValidateOfLogin();
      this.username = this.getCurrentUsername();
    },
    methods: {
      decodeBase64(string) {
        const atob = require('atob');
        return atob(string);
      },
      generateSHA256Hash(string) {
        const sha256 = require('crypto-js/sha256');
        return sha256(string).toString();
      },
      getCurrentUsername() {
        const auth = localStorage.getItem('auth');
        if (!auth) {
          window.location.replace('/login');
          return;
        }
        const authSecondEncrypt = this.decodeBase64(auth) || '';
        const authFirstEncrypt = this.decodeBase64(authSecondEncrypt) || '';
        const authMetaData = authFirstEncrypt.split('>')[0] || '';
        return this.decodeBase64(JSON.parse(authMetaData).username) || '';
      },
      checkValidateOfLogin(){
        const auth = localStorage.getItem('auth');
        if (!auth) {
          window.location.replace('/login');
          return;
        }
        const authSecondEncrypt = this.decodeBase64(auth) || '';
        const authFirstEncrypt = this.decodeBase64(authSecondEncrypt) || '';
        const authMetaData = authFirstEncrypt.split('>')[0] || '';
        const authMetaDataHash = authFirstEncrypt.split('>')[1] || '';
        const reauthToken = JSON.parse(authMetaData).reauthToken.substring(0, 32) || '';
        if (!authMetaData || !authMetaDataHash || !reauthToken) {
          window.location.replace('/login');
          return;
        }
        if (authMetaDataHash === this.generateSHA256Hash(reauthToken)) {
          this.login = true;
          return;
        }
        window.location.replace('/login');
      },
    }
  }
</script>
