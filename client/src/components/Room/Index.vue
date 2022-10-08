<template>
	<div>
	  <b-container class="bv-example-row">
	  <b-row class="text-left">
		   <b-col></b-col>
  
		   <b-col cols="5" class="">
	  <h1>จำนวนการสั่งซื้อ</h1>
	<!--   <p><button v-on:click="logout">Logout</button></p> -->
	  <h5>จำนวนการสั่งซื้อ {{ rooms.length }} คน</h5> <hr>
  
	  <div class="box2" v-for="room in rooms" v-bind:key="room.id">
		<p>รหัสสินค้า: {{ room.id }}</p>
		<p>ชื่อสินค้า: {{ room.nameroom }}</p>
		<p>ราคา: {{ room.peopleroom }}</p>
		
		<hr>
	  </div>
  
	  </b-col>
		<b-col> </b-col>
	   </b-row>
  </b-container>
	</div>
  </template>
  <script>
  
  import RoomService from "@/services/RoomsService";
  export default {
	data() {
	  return {
		rooms: [],
	  };
	},
	async created() {
	  this.rooms = (await RoomService.index()).data;
	}
  };
  </script>
  <style scoped>
  </style>