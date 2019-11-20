<template>
	<div class="select_container clearfix">
		<div v-for="(ele,index) in data" :key="index" :class="['fl','cursor',{active:ele.id == value}]" @click="changeSelect(ele.id)">
			<p>{{ele.name}}</p>
		</div>
	</div>
</template>
<script>
export default {
	props:['data','value'],
	data(){
		return {

		}
	},
	methods:{
		changeSelect(id){
			this.$emit('update:value',id);
		}
	}
}
</script>

<style lang="scss" scoped>
.select_container{
	div{
		width: 120px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		color: #4d4d4d;
		border:1px solid #E6E6E6;
		border-radius: 5px;
		font-size: 14px;
		margin-right: 25px;
		user-select: none;
	}
	div.active{
		border:1px solid rgba(75,163,243,1);
		color:rgba(75,163,243,1);
	}
}
</style>
