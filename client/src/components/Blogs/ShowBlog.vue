<template>
	<div>
  
	 <b-container class="bv-example-row">
		<b-row class="text-left">
		  <b-col></b-col>
  
		  <b-col cols="10" class="bg1">
  
	  <h1>ตรวจสอบการสั่งซื้อ  </h1>
  
  <div class="box1">
	  <p>ลำดับ: {{ blog.id }}</p>
		<p>ชื่อ: {{ blog.firstname }}</p>
		<p>นามสกุล: {{ blog.lastname }}</p>
		<p>แบรนด์: {{ blog.nroom }}</p>
		<p>จำนวนที่ต้องการสั่งซื้อ: {{ blog.pnum }}</p>
		<p>เบอร์โทรศัพท์: {{ blog.tel }}</p>
		<p>ที่อยู่ : {{ blog.other }}</p>
	  <p>
		<b-button pill variant="warning" v-on:click="navigateTo('/blog/edit/' + blog.id)">
		  แก้ไขการสั่งซื้อ
		</b-button>
		<b-button pill variant="danger" v-on:click="navigateTo('/blogs')">ย้อนกลับ</b-button>
	  </p>
  </div>
	  </b-col>
		<b-col> </b-col>
	   </b-row>
  </b-container>
  
	</div>
  </template>
  
  <script>
  import BlogService from "@/services/BlogsService";
  export default {
	data() {
	  return {
		blog: null,
	  };
	},
	async created() {
	  try {
		let blogId = this.$route.params.blogId;
		this.blog = (await BlogService.show(blogId)).data;
	  } catch (error) {
		console.log(error);
	  }
	},
	methods: {
	  navigateTo(route) {
		this.$router.push(route);
	  },
	},
  };
  </script>
  <style scoped>
  
  </style>