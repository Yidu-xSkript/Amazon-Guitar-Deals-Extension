<template>
	<div class="rounded overflow-hidden shadow-lg">
  		<skeleton v-if="loading" height="24em" width="100%" />
      	<img v-else class="w-full h-64 pointer-events-none select-none object-cover" :src="image" :alt="title">
      	<div class="px-6 py-4">
      		<skeleton v-if="loading" height="3em" width="100%" class="mb-2" />
	        <div v-else class="font-bold select-none text-xl mb-2">{{ title }}</div>
      		
	        <div class="flex select-none"> 
        		<skeleton v-if="loading" height="2em" width="25%" class="mr-2" />
	        	<p v-else class="text-habesha-yellow text-base line-through mr-2"><span v-if="sale_price!=''">${{ sale_price }}</span></p>
      			
      			<skeleton v-if="loading" height="2em" width="25%" class="mr-2" />
	        	<p v-else class="text-gray-700 text-base font-bold">${{ regular_price }}</p>
	        </div>
  			
  			<skeleton v-if="loading" height="4em" width="43%" class="mt-4" />
	        <button @click="learnMoreClick" v-else class="bg-habesha-yellow text-white text-base px-6 py-3 mt-4 shadow hover:shadow-xl duration-300">Learn More!</button>
      	</div>
      	<div class="px-6 pt-2 pb-2">
  			<skeleton v-if="loading" height="2em" width="16%" class="mr-2" />
  			<skeleton v-if="loading" height="2em" width="16%" class="mr-2" />
  			<skeleton v-if="loading" height="2em" width="16%" class="mr-2" />
  			<span v-else>
	        	<span @click="openCategories(category.slug)" v-for="category in categories" :key="category.id" class="select-none cursor-pointer hover:shadow-sm inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ category.name }}</span>	
  			</span>
      	</div>
    </div>
</template>
<script>
import Skeleton from './Skeleton.vue';
export default {
	components: {
		Skeleton
	},
	props: {
		title: {
			default: '',
			type: String
		},
		image: {
			default: '',
			type: String
		},
		regular_price: {
			default: '',
			type: String
		},
		sale_price: {
			default: '',
			type: String
		},
		categories: {
			default: () => [{}, {}, {}],
			type: Array
		},
		loading: {
			default: false,
			type: Boolean
		},
		learnMoreLink: {
			default: 'https://amazonguitardeals.com/shop-2',
			type: String
		}
	},
	methods: {
		learnMoreClick() {
			chrome.tabs.create({ url: this.learnMoreLink })
		},
		openCategories(slug) {
			chrome.tabs.create({ url: `https://amazonguitardeals.com/product-category/${slug}`})
		}
	}
};
</script>