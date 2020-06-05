<template>
  <div class="uploader-wrap">
    <el-button class="uploader" :size="size" :type="btnType">
      <span>{{text}}</span>
      <input type="file" @change="upload">
    </el-button>
    <div class="chunk-list">
      <div class="chunk-cell" v-for="it in chunk" :key="it.id">
        <div class="chunk-progress" :style="{width: it.progress*100 + '%'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import FileUploader from '@/utils/file';

  export default {
	name: 'Uploader',
	components: {},
	props: {
	  text: {
		type: String,
		default: '点击上传'
	  },
	  value: String,
	  size: {
		type: String,
		default: 'small'
	  },
	  btnType: String
	},
	data() {
	  return {
	    chunk: []
      };
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
		const uploader = new FileUploader(file, {
		  chunkSize: 1024 * 1024 //* 5
		});

		uploader.on('before-upload', task => {
		  this.chunk = task
        })
		uploader.on('progress', task => {
		  this.chunk = task
        })

		const result = await uploader.upload();
		e.target.value = null;
		if (!result.success) return;
		console.log(result);
		this.$emit('input', result.data.path);
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

  .chunk-list{
    font-size: 0;
    .chunk-cell{
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 1px solid #e5e5e5;
      .chunk-progress{
        height: 100%;
        background-color: #5daf34;
      }
    }
  }
</style>
