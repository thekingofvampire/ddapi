<template>
    <div class="update_container">
        <NAV :activeIndex="3"></NAV>
        <div class="update_contentbg">
            <div class="update_content">
                <div class="login_account">
                    <p class="now_account">当前登录账号：{{account}}</p>
                </div>
				<vTable :data="data"></vTable>
            </div>
            <div class="bottom_content">
                <p class="bottom_name">点点IPA精灵上传平台</p>
                <p class="bottom_copyright">Copyright © 点点IPA精灵版权所有</p>
            </div>
        </div>
    </div>
</template>
<script>
import table from '../components/table'
import { setCookie, getCookie, delCookie } from "../assets/js/cookie";
export default {
	components:{
		vTable:table
	},
    data() {
        return {
            account: getCookie('userName'),
			updatecoupon: 0,
			data:[
				{
					number:'sadsa1213',
					/*
					 * 0 没有状态
					 * 1 上传失败
					 * 2 审核中
					 * 3 上传成功
					 * */ 
					updateStatus:1,
					name:'王者荣耀',
					updateType:'直接上传',
					/**
					 * 0 没有状态
					 * 1 已下架
					 * 2 已上架
					 */
					ipaStatus:1,
					encodeType:'提取码',
					time:'2016-05-04 11:00:00',
					des:'自动闪现施法自动闪现施法自动闪现施法自动闪现施法',
					isTiquma:1,
					/**
					 * 1 下架
					 * 2 上架
					 * 3 上传
					 * 4 编辑
					 */
					operate:[1,4]
				},
				{
					number:'sadsa1213',
					updateStatus:0,
					name:'',
					updateType:'',
					ipaStatus:0,
					encodeType:'',
					time:'',
					des:'',
					isTiquma:0,
					operate:[3]
				},
				{
					number:'sadsa1213',
					updateStatus:0,
					name:'',
					updateType:'',
					ipaStatus:0,
					encodeType:'',
					time:'',
					des:'',
					isTiquma:0,
					operate:[3]
				},
				{
					number:'sadsa1213',
					updateStatus:2,
					name:'王者荣耀',
					updateType:'直接上传',
					ipaStatus:1,
					encodeType:'提取码',
					time:'2016-05-04 11:00:00',
					des:'自动闪现施法自动闪现施法自动闪现施法自动闪现施法',
					isTiquma:0,
					operate:[2,4]
				},
				{
					number:'sadsa1213',
					updateStatus:3,
					name:'王者荣耀',
					updateType:'直接上传',
					ipaStatus:1,
					encodeType:'提取码',
					time:'2016-05-04 11:00:00',
					des:'自动闪现施法自动闪现施法自动闪现施法自动闪现施法',
					isTiquma:1,
					operate:[2,4]
				},
				{
					number:'sadsa1213',
					updateStatus:3,
					name:'王者荣耀',
					updateType:'直接上传',
					ipaStatus:1,
					encodeType:'提取码',
					time:'2016-05-04 11:00:00',
					des:'自动闪现施法自动闪现施法自动闪现施法自动闪现施法',
					isTiquma:1,
					operate:[]
				},
				{
					number:'sadsa1213',
					updateStatus:3,
					name:'王者荣耀',
					updateType:'直接上传',
					ipaStatus:1,
					encodeType:'提取码',
					time:'2016-05-04 11:00:00',
					des:'自动闪现施法自动闪现施法自动闪现施法自动闪现施法',
					isTiquma:0,
					operate:[]
				},
			]
        };
    }
};
</script>
<style lang="scss" scoped>
.update_container {
    width: 100%;
    .update_contentbg {
        width: 100%;
        border-top: 1px solid #f1f1f1;
        .update_content {
            width: 1200px;
            margin: 0 auto;
            padding: 18px 0;
			padding-bottom: 0;
            .login_account {
                padding-top: 10px;
				padding-left: 18px;
                color: #333333;
                .now_account {
                    font-size: 20px;
                }
                .update_coupon {
                    margin-top: 20px;
                    font-size: 18px;
                    line-height: 40px;
                    .remain {
                        margin-right: 20px;
                    }
                    .btn {
                        color: #fff;
						text-align: center;
                        width: 140px;
                        height: 40px;
                        background: rgba(75, 163, 243, 1);
                        margin-right: 20px;
                    }
                }
            }
        }
        .bottom_content {
            width: 100%;
            min-width: 1200px;
            background: #f7f7f7;
            padding: 50px 0;
            p {
                text-align: center;
                color: #333333;
                font-size: 14px;
            }
            .bottom_copyright {
                margin-top: 10px;
            }
        }
    }
}
</style>

