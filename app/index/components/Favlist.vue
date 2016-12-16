<template>
	<div>
		<div v-for="n in 10">
			<div @click="aaa">{{n}}</div>
		</div>
	</div>
</template>

<script>
	import { sendRequest } from '../../src/common/ajax.js'
	export default {
		data () {
			return {
				msg: 'Hello world!'
			}
		},
		methods: {
			aaa() {
				sendRequest('/info/getUserInfo.ajax', 
				{
					id: 1
				});
			}
		}
	}
</script>	

<style>
	html {
		background: red;
	}
</style>