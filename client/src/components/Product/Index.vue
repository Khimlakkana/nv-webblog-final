<template>
	<div>
		<center><h2>เลือกสินค้า</h2>
		<img src = "@/assets/nn.png" alt ="amd">
           </center>
		<p><button v-on:click="logout">Logout</button></p>
		<h4>จํานวนสินค้า {{ Product.length }}</h4>
		<p><button v-on:click="navigateTo('/Product/create')">สร้าง Product</button></p>
		<div v-for="Product in Product" v-bind:key="Product.id">
			<p>id: {{ Product.id }}</p>
			<p>title: {{ Product.title }}</p>
			<p>content: {{ Product.content }}</p>
			<p>category: {{ Product.category }}</p>
			<p>status: {{ Product.status }}</p>
			<p>
				<button v-on:click="navigateTo('/Product/' + Product.id)">ดู Product</button>
				<button v-on:click="navigateTo('/Product/edit/' + Product.id)">
					แก้ไขสินค้า
				</button>
				<button v-on:click="deleteProduct(Product)">ลบข้อมูล</button>
			</p>
			<hr />
		</div>
	</div>
</template>
<script>
import ProductService from "@/services/ProductService";
export default {
	data() {
		return {
			Product: [],
		};
	},
	async created() {
		this.Product = (await ProductService.index()).data;
	},
	methods: {
		logout() {
			this.$store.dispatch("setToken", null);
			this.$store.dispatch("setProduct", null);
			this.$router.push({
				name: "login",
			});
		},
		navigateTo(route) {
			this.$router.push(route);
		},
		async deleteProduct(Product) {
			let result = confirm("Want to delete?");
			if (result) {
				try {
					await ProductService.delete(Product);
					this.refreshData();
				} catch (err) {
					console.log(err);
				}
			}
		},
		async refreshData() {
			this.Product = (await ProductService.index()).data;
		},
	},
};
</script>
<style scoped>
</style>