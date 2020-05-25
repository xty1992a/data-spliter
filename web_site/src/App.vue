<template>
  <div class="app">
    <Uploader v-model="path"/>
    <video :src="path" controls/>
  </div>
</template>

<script>
  import Uploader from '@/components/Uploader'
  export default {
	name: "app",
	props: {},
    components: {Uploader},
	data() {
	  return {
		path: ''
      };
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
