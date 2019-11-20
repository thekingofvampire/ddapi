<template>
    <div class="input_container">
        <input type="text" v-model="inpValue" :style="setWidth" @blur="blurSearch">
    </div>
</template>
<script>
export default {
    props: ["value",'width'],
    data() {
        return {
			inpValue: "",
        };
    },
    methods:{
        blurSearch(){
            this.$emit("update:value", this.inpValue);
        }
    },
	computed:{
		setWidth(){
			if(this.width){
				return 'width:'+this.width+'px'
			}else{
				return 'width:100px'
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.input_container {
    width: 100%;
    input {
		color: #B3B3B3;
        display: block;
        margin: 10px auto 0;
		padding: 0 5px;
        width: 100px;
		line-height: 30px;
        border: 1px solid rgba(179, 179, 179, 1);
        border-radius: 6px;
		font-size: 16px;
    }
}
</style>
