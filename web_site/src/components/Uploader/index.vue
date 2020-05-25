<template>
  <el-button class="uploader" :size="size" :type="btnType">
    <span>{{text}}</span>
    <input type="file" @change="upload">
  </el-button>
</template>

<script>
  import {uploadFile} from '@/api';
  import FileUploader from '@/utils/file'

  export default {
	name: 'Uploader',
	components: {},
	props: {
	  text: {
	    type: String,
        default: '上传图片'
      },
	  value: String,
	  size: {
		type: String,
		default: 'small'
	  },
      btnType: String
	},
	data() {
	  return {};
	},
	created() {
	},
	methods: {
	  async upload(e) {
		let files = e.target.files || e.dataTransfer.files;
		console.log('upload ', files);
		if (!files.length) {
		  e.target.value = null;
		  return;
		}
		const file = files[0];
		const uploader = new FileUploader(file, {})

        const result = await uploader.upload()

        e.target.value = null

/*		if (!file.type.includes('image')) {
		  e.target.value = null;
		  return;
		}
		const result = await uploadFile({file});
		e.target.value = null;
		console.log(result);
		if (!result.success) return;
		this.$emit('input', '/' + result.value);*/
	  }
	},
	computed: {}
  };
</script>

<style lang="less" rel="stylesheet/less">

  .uploader {
    position: relative;

    [type="file"] {
      position: absolute;
      bottom: 0;
      right: 0;
      top: 0;
      left: 0;
      opacity: 0;
    }
  }
</style>
