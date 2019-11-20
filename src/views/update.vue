<template>
    <div class="update_container">
        <NAV :activeIndex="2"></NAV>
        <div class="update_contentbg">
            <div class="update_content">
                <div class="login_account">
                    <p class="now_account">当前登录账号：{{account}}</p>
                    <div class="update_coupon clearfix">
                        <p class="fl remain">当前设备剩余上传码：{{updatecoupon}}</p>
                        <router-link to="/upload" style="color:#fff;">
                            <p class="fl btn cursor add_margin">免费上传</p>
                        </router-link>
                        <p class="fl btn cursor" @click="buyShangchuanma=true">购买上传码</p>
                        <p class="fl update_msg">咨询上传相关问题，客服QQ：987625998</p>
                    </div>
                    <div
                        class="update_tip"
                    >免费上传可上传加密方式为公开或者提取码_加密的应用。使用上传码可上传加密方式为授权码_加密的应用，同时您可以任意设置上传应用的出售价格。</div>
                </div>
                <vTable :data.sync="data" :buyShangchuanma.sync="buyShangchuanma"></vTable>
            </div>
            <div class="bottom_content">
                <p class="bottom_name">点点IPA精灵上传平台</p>
                <p class="bottom_copyright">Copyright © 点点IPA精灵版权所有</p>
            </div>
        </div>
    </div>
</template>
<script>
import table from "../components/table";
import { setCookie, getCookie, delCookie } from "../assets/js/cookie";
export default {
    components: {
        vTable: table
    },
    data() {
        return {
            account: getCookie("userName"),
            updatecoupon: 0,
            data: [],
            buyShangchuanma: false
        };
    },
    methods: {
        getCodeNumber() {
            this.$axios
                .post("https://www.ddipa.com:9090/DDApi/template/querySccode",this.$qs.stringify({
                    id:getCookie('userid')
                }))
                .then(res => {
                    if (res.status == 200) {
                        // this.QRCodeMsg = res.data.data;
                        console.log(res.data.data)
                        this.updatecoupon = res.data.data;
                    }
                });
        }
    },
    created() {
        this.getCodeNumber()
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
                    .btn.add_margin {
                        margin-right: 40px;
                    }
                }
                .update_tip {
                    color: #999999;
                    font-size: 12px;
                    margin-top: 15px;
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

