<template>
  <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" v-loading="loading">
    <h1 class="font-bold text-2xl text-gray-800 mb-3 md:text-3xl sm:text-2xl">
      Selamat {{ timenow_word}}
      <div v-if="isMobile"></div><div v-else></div>
      Sila log masuk akuan anda. <br>
      <p class="font-bold text-gray-600"> {{timenow_utc8}}</p> </h1>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Username
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="*******">
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="handleLogin">
        Sign In
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/forgetpass">
        Forgot Password?
      </a>
    </div>
  </div>

</template>

<script>

const axios = require('axios');
import { ElMessageBox } from 'element-plus';

export default {
  name: 'login-form',
  data() {
    return {
      timenow_word: '',
      timenow_utc8: '',
      timer: null,
      isMobile: null,
      dialogVisible: false,
      loading: false,
    }
  },
  mounted() {
    this.timenow_word = this.getTimenowWord();
    this.timenow_utc8 = this.getTimenowUTC8();
    this.timer = setInterval(() => {
      this.timenow_utc8 = this.getTimenowUTC8();
    }, 1000);
    this.isMobile = this.getIsMobile();
    /** start event listener */
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.handleLogin();
      }
    });
    /** end event listener */
  },

  methods: {

    /** Start login handler */

    generataRandomString(length) {
      length = length-2
      let result = '==';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },

    generateSHA256Hash(string) {
      const sha256 = require('crypto-js/sha256');
      return sha256(string).toString();
    },

    decodeBase64(string) {
      const atob = require('atob');
      return atob(string);
    },

    encodeBase64(string) {
      return window.btoa(string);
    },

    loginError(msg, reload=false) { // eslint-disable-line no-unused-vars
      ElMessageBox.alert(msg, 'Ops! Error!', {
        confirmButtonText: 'OK',
        callback: () => {
          reload ? window.location.reload() : null;
        }
      }).catch(() => {});
    },

    handleLogin(){
      this.loading = true;
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      const enusername = this.encodeBase64(username);
      const enpassword = this.encodeBase64(password);

      if (username === '' || password === '') {
        this.loading = false;
        this.loginError('Please enter username and password');
        return;
      }
      axios.post(`https://api-smkdbs-edu-my.vercel.app/auth/login?user=${enusername}&p=${enpassword}`, {
        // set header
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.data.ok && response.data.status === 200) {
            const auth_token = response.data.auth_token;
            const auth_token_decoded = this.decodeBase64(auth_token);
            const dateNow = Date.now();
            const metaData = JSON.stringify({
              auth_token: auth_token_decoded,
              username: this.encodeBase64(username),
              timestamp: dateNow,
              status: '1', // 1 = logged in, 0 = login failed, auth token expired
              reauthToken: `${this.generataRandomString(32)}${dateNow}`
            })
            const reauthToken = JSON.parse(metaData).reauthToken;
            const reauthTokenString = reauthToken.substring(0, 32);
            const encodedMetaData = this.encodeBase64(`${metaData}>${this.generateSHA256Hash(reauthTokenString)}`);  // metadata + hash
            localStorage.setItem('auth', this.encodeBase64(encodedMetaData)); // encoded metadata + hash
            this.loading = false;
            // redirect to dashboard
            window.location.href = '/index?auth=1';
          } else {
            this.loading = false;
            this.loginError('error');
          }
        }, (error) => {
          if (error.status === 401) {
            this.loading = false;
            this.loginError('Invalid username or password', true);
          }

          if (error.status > 500) {
            this.loading = false;
            this.loginError('Server error. Consider contacting the administrator', true);
          }

          if (!error.status) {
            this.loading = false;
            this.loginError('Server error. Consider contacting the administrator', true);
          }
        });
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
        console.log('valid');
        return;
      }

      console.log('invalid');
    },

    /** End login handler */

    getIsMobile() {
      return window.innerWidth < 768;
    },
    getTimenowWord() {
      let date = new Date();
      let hour = date.getHours();
      if (hour < 12) {
        return 'Pagi';
      }
      if (hour < 14) {
        return 'Tengahari';
      }
      if (hour < 18) {
        return 'Petang';
      }

      return 'Malam';
    },
    getTimenowUTC8() {
      let date = new Date();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      return `${hour < 10 ? '0':''}${hour}:${minute < 10 ? '0':''}${minute}:${second < 10 ? '0':''}${second}`;
    }
  }
};
</script>
