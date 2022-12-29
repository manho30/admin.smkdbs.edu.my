<template>
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h1 class="font-bold text-2xl text-gray-800 mb-3 md:text-3xl sm:text-2xl">
      Selamat {{ timenow_word}}, Sila masukan akauan anda. <br><p class="font-bold text-gray-600"> {{timenow_utc8}}</p> </h1>
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
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Sign In
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a>
    </div>
  </form>
</template>

<script>
export default {
  name: 'login-form',
  data() {
    return {
      timenow_word: '',
      timenow_utc8: '',
      timer: null
    }
  },
  mounted() {
    this.timenow_word = this.getTimenowWord();
    this.timenow_utc8 = this.getTimenowUTC8();
    this.timer = setInterval(() => {
      this.timenow_utc8 = this.getTimenowUTC8();
    }, 1000);
  },

  methods: {
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
      return `${hour}:${minute}:${second}`;
    }
  }
};
</script>
