<template>
	<div class="w-full container">
		<div @click="openAGD_home" class="flex cursor-pointer justify-center items-center mb-5">
	      	<img src="/images/icon.png" class="pointer-events-none w-16 h-16 mr-2">
      		<div class="select-none">
      			<h1 class="text-2xl text-black text-left">Amazon</h1>
      			<h1 class="text-base text-black text-left">Guitar Deals</h1>
      		</div>
	    </div>
	    <span class="text-center">Sweet guitar, gear, and recording equipment offers here at your door! just for you!.. Browse through & Select whatever you like. This is your new home</span>
		<div class="border-b my-4"></div>

	    <div v-if="!onLine" class="fixed z-10 bottom-10 left-0 text-center w-full p-5 bg-red-200"><span class="text-red-500 text-sm">Sorry! We were unable to reach our servers!</span></div>
	    
	    <div v-if="error == null" class="pb-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
	    	<card v-for="product in products" :key="product.id" :loading="isLoading" :title="product.title" :learnMoreLink="product.link" :image="product.image" :regular_price="product.regular_price" :sale_price="product.sale_price" :categories="product.categories" />
		</div>
		<div v-else class="flex items-center justify-center w-full h-full mb-16">
			<div class="text-center bg-red-200 text-red-500 py-3 px-6">
				{{ error }}
			</div>
			<button @click="getItems" class="bg-habesha-yellow px-6 py-3 text-white shadow-lg">Reload</button>
		</div>

	    <button @click="openAGD" class="fixed bottom-0 left-0 right-0 shadow-lg w-full text-base text-white font-bold bg-black p-2 hover:bg-habesha-yellow duration-300">Check More Deals!</button>
	</div>
</template>
<script>
import Card from './Card.vue';
export default {
	components: {
		Card
	},
	data: () => ({
		onLine: navigator.onLine,
		isLoading: true,
		products: 3,
		error: null,
		wp_ck: 'ck_3ec12a4fc34d7185f03e6eeb3aa4c687bb4ae76b',
		wp_cs: 'cs_b5e4a5e2a55fa8cc9efbbaed11eea3f860381e90'
	}),
	mounted() {
		window.addEventListener('online', this.updateOnlineStatus);
		window.addEventListener('offline', this.updateOnlineStatus);
		this.getItems();
	},
	beforeDestroy() {
		window.addEventListener('online', this.updateOnlineStatus);
		window.addEventListener('offline', this.updateOnlineStatus);
	},
	methods: {
		openAGD: function() {
			chrome.tabs.create({ url: 'https://amazonguitardeals.com/shop-2/' })
		},
		openAGD_home: function() {
			chrome.tabs.create({ url: 'https://amazonguitardeals.com/' })
		},
		getItems() {
			this.isLoading = true;
			this.error = null;
			this.products = 3;

			fetch(`https://amazonguitardeals.com/wp-json/wc/v2/products?consumer_key=${this.wp_ck}&consumer_secret=${this.wp_cs}&orderby=rand&per_page=5&status=publish`)
			.then(response => response.json())
			.then(response => {
				console.log(response)
				if (!Array.isArray(this.products)) this.products = [];
				for (let i = 0; i < response.length; i++) {
					var _product = { id: response[i].id, title: response[i].name, image: response[i].images[0].src, link: response[i].permalink, categories: response[i].categories, regular_price: response[i].regular_price, sale_price: response[i].sale_price };
					this.products.push(_product);
				}
				this.isLoading = false;
			}).catch(error => {
				console.log(error)
				this.error = error
			});
		},
		updateOnlineStatus(e) {
            const { type } = e;
            this.onLine = type === 'online';
            if (this.onLine && this.products.length == 0) this.getItems();
        }
	}
};
</script>