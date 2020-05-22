<template>
  <div class="app">
    <Uploader/>
  </div>
</template>

<script>
  import Uploader from '@/components/Uploader'
  export default {
	name: "app",
	props: {},
    components: {Uploader},
	data() {
	  return {};
	},
	computed: {},
	methods: {},
	watch: {},
	created() {
	},
	mounted() {
	},
	beforeDestroy() {
	}
  };
</script>

<style lang="less" rel="stylesheet/less">

  .app {

  }
</style>
