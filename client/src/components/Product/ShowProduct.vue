<template>
	<div>
		<h1>Show Product</h1>
		<p>id: {{ Product.id }}</p>
		<p>title: {{ Product.title }}</p>
		<p>content: {{ Product.content }}</p>
		<p>category: {{ Product.category }}</p>
		<p>status: {{ Product.status }}</p>
		<p>
			<button v-on:click="navigateTo('/Product/edit/' + Product.id)">
				แก้ไข Product
			</button>
			<button v-on:click="navigateTo('/Product')">กลับ</button>
		</p>
	</div>
</template>
<script>
import ProductService from "@/services/ProductService";
export default {
	data() {
		return {
			Product: null,
		};
	},
	async created() {
		try {
			let ProductId = this.$route.params.ProductId;
			this.Product = (await ProductService.show(ProductId)).data;
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