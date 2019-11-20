<template>
    <div class="select_container">
        <div :class="['select', 'cursor',{addHeight:isHeight}]" v-if="list.length" :style="setWidth">
            <span @click.stop="showOption=!showOption">{{selectValue}}</span>
            <img class="pull" src="../assets/img/pull.png" alt>
            <!-- <transition enter-active-class="fadeIn" leave-active-class="fadeOut"> -->
            <div class="option animated" v-show="showOption">
                <!--   -->
                <div
                    v-for="(ele,index) in list"
                    :key="index"
                    :class="['cursor',{'active':selectIndex==index,'fakeActive':fakeActive==index}]"
                    @mouseover="mouseChange(true,index)"
                    @mouseleave="mouseChange(false,index)"
                    @click.stop="selectCondition(ele,index)"
                >{{ele.name}}</div>
            </div>
            <!-- </transition> -->
        </div>
    </div>
</template>
<script>
export default {
    props: ["list", "value", "width","height"],
    data() {
        return {
            selectValue: "",
            selectIndex: 0,
            fakeActive: null,
            showOption: false
        };
    },
    methods: {
        mouseChange(bool, index) {
            if (bool) {
                this.fakeActive = index;
            } else {
                this.fakeActive = null;
            }
        },
        selectCondition(ele, index) {
            this.selectValue = ele.name;
            this.selectIndex = index;
            this.showOption = false;
            // $(".option").slideUp(200);
            this.$emit("update:value", ele);
        }
    },
    watch: {
        showOption() {
            // if (this.showOption) {
            //     $(".option").slideDown(200);
            // } else {
            //     $(".option").slideUp(200);
            // }
        }
    },
    computed: {
        setWidth() {
            if (this.width) {
                return "width:" + this.width + "px";
            } else {
                return "width:100px";
            }
		},
		isHeight(){
			if(this.height){
				return true
			}else{
				return false 
			}
		}
    },
    created() {
        if (this.list.length) {
            this.selectValue = this.list[0].name;
        }
    },
    mounted() {
        this.$nextTick(() => {
            $(document).click(() => {
                // $(".option").slideUp(200);
                this.showOption = false;
            });
        });
    }
};
</script>
<style lang="scss" scoped>
.select_container {
    width: 100%;
    margin: 0 auto;
    .select {
        color: #b3b3b3;
        text-align: left;
        margin: 10px auto 0;
        width: 100px;
        line-height: 30px;
        border: 1px solid rgba(179, 179, 179, 1);
        border-radius: 6px;
        font-size: 16px;
        position: relative;
        background: #fff;
        span {
            display: block;
            user-select: none;
            padding: 0 8px;
        }
        .pull {
            position: absolute;
            top: 13px;
            right: 10px;
            // width: 10px;
            height: 5px;
        }
        .option {
            position: absolute;
            top: 30px;
            left: 0;
            width: 100%;
            border: 1px solid rgba(75, 163, 243, 1);
            background: #fff;
            animation-duration: 0.3s;
            user-select: none;
            z-index: 2;
            div {
                padding: 0 8px;
                transition: all 0.1s;
            }
            div.active {
                background: #4ba3f3;
                color: #fff;
            }
            div.fakeActive {
                background: #4ba3f3;
                color: #fff;
            }
        }
    }
	.select.addHeight{
		height: 40px;
		line-height: 40px;
		margin: 0;
		font-size: 14px;
		// text-align: center;
		.pull{
			top: 17px;
		}
		.option {
			top: 40px;
		}
	}
}
</style>
