<template>
  <footer class="p-4 bg-white shadow md:px-6 md:py-8 dark:bg-gray-900">
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <span class="block text-base mb-2 text-gray-600 sm:text-center dark:text-gray-400">"Bertekun Hingga Berjaya"</span>
    <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {{ this_year }} <a href="https://flowbite.com/" class="hover:underline">SMK DATO BIJAYA SETIA</a>. All Rights Reserved.
    </span>
  </footer>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'footer',
  data() {
    return {
      this_year: new Date().getFullYear(),
    };
  },
}
</script>
