<template>
    <div class="home">
        <div class="index">
            <NAV :activeIndex="1" :showLogin.sync='showLogin'></NAV>
            <div class="banner">
                <div class="banner_content">
                    <div class="banner_btn">
                        <button class="ipa_update cursor" @click="updateIPA">上传IPA文件</button>
                        <button class="ipa_manage cursor" @click="manageIPA">管理IPA</button>
                    </div>
                    <img src="../assets/img/erweima.png" alt />
                </div>
                <!-- <img src="../assets/img/banner.png" alt> -->
            </div>
            <div class="xmind_container">
                <div class="xmind_top">
                    <img src="../assets/img/tip.png" alt />
                </div>
                <p class="xmind_tip">使用流程介绍</p>
                <div class="xmind_detail clearfix">
                    <div class="xmind_content fl">
                        <div class="xmind_img">
                            <img src="../assets/img/anzhuang.png" alt />
                        </div>
                        <p class="xmind_title">手机安装点点IPA精灵</p>
                        <div class="xmind_intro add_border">
                            <p>直接扫码安装</p>
                        </div>
                    </div>
                    <img src="../assets/img/arrow.png" alt class="arrow fl" />
                    <div class="xmind_content fl">
                        <div class="xmind_img">
                            <img src="../assets/img/update.png" alt />
                        </div>
                        <p class="xmind_title">上传IPA</p>
                        <div class="xmind_intro add_border">
                            <p>没找到IPA怎么办</p>
                        </div>
                    </div>
                    <img src="../assets/img/arrow.png" alt class="arrow fl" />
                    <div class="xmind_content fl">
                        <div class="xmind_img">
                            <img src="../assets/img/multi.png" alt />
                        </div>
                        <p class="xmind_title">选择制作分身多开</p>
                        <div class="xmind_intro">
                            <p>修改APP名字</p>
                        </div>
                    </div>
                    <img src="../assets/img/arrow.png" alt class="arrow fl" />
                    <div class="xmind_content fl">
                        <div class="xmind_img">
                            <img src="../assets/img/sign.png" alt />
                        </div>
                        <p class="xmind_title">一键提交签名</p>
                        <div class="xmind_intro">
                            <p>自动化在线完成签名安装</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="feature xmind_container">
                <div class="xmind_top">
                    <img src="../assets/img/tip.png" alt />
                </div>
                <p class="xmind_tip">功能特性</p>
                <div class="autosign_anzhuang clearfix">
                    <div class="autosign_img fl">
                        <img src="../assets/img/autosign.png" alt />
                    </div>
                    <div class="atosign_detail fr">
                        <p class="autosign_title">自动化签名安装</p>
                        <span>
                            淘汰淘宝人工代签，流程繁琐、效率低下，
                            <br />全自动化完成操作，一次安装，终身使用
                        </span>
                    </div>
                </div>
                <div class="autosign_anzhuang clearfix">
                    <div class="atosign_detail fl">
                        <p class="autosign_title text_align">无需越狱</p>
                        <span class="text_align">DIY制作应用分身</span>
                    </div>
                    <div class="autosign_img fr">
                        <img src="../assets/img/many.png" alt />
                    </div>
                </div>
            </div>
            <div class="bottom_content">
                <p class="bottom_name">点点IPA精灵上传平台</p>
                <p class="bottom_copyright">Copyright © 点点IPA精灵版权所有</p>
            </div>
            <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
                <div class="xuanfu cursor animated" v-show="shwoXuanfu">
                    <div class="xuanfu_content">
                        <p class="xuanfu_title">
                            <img src="../assets/img/qq.png" alt /> 客服QQ
                        </p>
                        <p class="xuanfu_number">QQ：987625998</p>
                    </div>
                </div>
            </transition>
            <div class="loginBg" v-show="showLogin">
                <transition enter-active-class="zoomIn" leave-active-class="zoomOut">
                    <div class="login animated" v-show="showLogin">
                        <div class="login_erweima">
                            <canvas id="QRCode"></canvas>
                        </div>
                        <p class="login_title">请使用点点IPA精灵客户端扫码登录</p>
                        <p class="login_lujing">路径：客户端-[我的IPA]左上角</p>
                        <p class="login_tips">
                            手机浏览器访问
                            <span>xxipa.com</span>
                            <br />更新最新客户端版本才能使用扫码功能
                        </p>
                        <img
                            class="cursor"
                            src="../assets/img/closeDrawer.png"
                            alt
                            @click="showLogin = false"
                        />
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
//引入生成二维码插件
import QRCode from "qrcode";
import { setTimeout } from "timers";
import { setCookie, getCookie, delCookie } from "../assets/js/cookie";
export default {
    name: "home",
    data() {
        return {
            showErweima: false,
            shwoXuanfu: false,
            showLogin: false,
            QRCodeMsg: "",
            setIntervalTime: null,
            flag: 1
        };
    },
    watch: {
        QRCodeMsg(val) {
            // 获取页面的canvas
            var msg = document.getElementById("QRCode");
            // 将获取到的数据（val）画到msg（canvas）上
            QRCode.toCanvas(msg, val, function(error) {
                console.log(error);
            });
        },
        showLogin() {
            if (this.showLogin) {
                this.setIntervalTime = setInterval(() => {
                    this.$axios
                        .post(
                            "https://www.ddipa.com:9090/DDApi/common/queryUUIDState",
                            this.$qs.stringify({
                                uuid: this.QRCodeMsg
                            })
                        )
                        .then(
                            res => {
                                if (res.status == 200) {
                                    if (res.data.code == 200) {
                                        setCookie("token", res.data.token);
                                        setCookie(
                                            "userName",
                                            res.data.data[0].username
                                        );
                                        setCookie(
                                            "balance",
                                            res.data.data[0].balance
                                        );
                                        setCookie(
                                            "userid",
                                            res.data.data[0].id
                                        );
                                        setCookie(
                                            "udid",
                                            res.data.data[0].udid
                                        );
                                        clearInterval(this.setIntervalTime);
                                        this.showLogin = false;
                                        alert("登陆成功");
                                    }
                                }
                                this.flag++;
                                if (this.flag == 20) {
                                    clearInterval(this.setIntervalTime);
                                    this.showLogin = false;
                                    alert("请重新获取二维码");
                                }
                            },
                            err => {
                                this.showLogin = false;
                                clearInterval(this.setIntervalTime);
                            }
                        );
                }, 3000);
            } else {
                clearInterval(this.setIntervalTime);
            }
        }
    },
    methods: {
        updateIPA() {
            if (!getCookie("token")) {
                this.showLogin = true;
            } else {
                this.$router.push("/update");
            }
        },
        manageIPA() {
            if (!getCookie("token")) {
                this.showLogin = true;
            } else {
                this.$router.push("/manage");
            }
        },
        scrollToTop() {
            var scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            if (scrollTop >= 400) {
                this.shwoXuanfu = true;
            } else {
                this.shwoXuanfu = false;
            }
        },
        getUUID() {
            this.$axios
                .post("https://www.ddipa.com:9090/DDApi/common/queryUUID")
                .then(res => {
                    if (res.status == 200) {
                        this.QRCodeMsg = res.data.data;
                    }
                });
        }
    },
    mounted() {
        window.addEventListener("scroll", this.scrollToTop);
        if ($(window).scrollTop() >= 400) {
            this.shwoXuanfu = true;
        } else {
            this.shwoXuanfu = false;
        }
        this.getUUID();
    }
};
</script>

<style lang="scss" scoped>
.home {
    width: 100%;
    #QRCode {
        width: 180px !important;
        height: 180px !important;
    }
    .index {
        .banner {
            width: 100%;
            min-width: 1200px;
            height: 500px;
            background: url("../assets/img/banner.png") no-repeat;
            background-size: cover;
            background-position: center;
            // background-attachment: fixed;
            .banner_content {
                width: 1200px;
                height: 100%;
                margin: 0 auto;
                position: relative;
                .banner_btn {
                    position: absolute;
                    bottom: 206px;
                    right: 0;
                    .ipa_update {
                        width: 240px;
                        height: 50px;
                        text-align: center;
                        line-height: 50px;
                        background: #ffbc31;
                        border-radius: 50px;
                        font-size: 24px;
                        font-weight: bold;
                        color: #fff;
                        margin-right: 28px;
                        box-shadow: 0 5px 10px 0
                            rgba($color: #4d4d4d, $alpha: 0.2);
                    }
                    .ipa_manage {
                        width: 200px;
                        height: 50px;
                        text-align: center;
                        line-height: 50px;
                        background: #31dfac;
                        border-radius: 50px;
                        font-size: 24px;
                        font-weight: bold;
                        color: #fff;
                        box-shadow: 0 5px 10px 0
                            rgba($color: #4d4d4d, $alpha: 0.2);
                    }
                }
                img {
                    position: absolute;
                    right: 0;
                    bottom: -114px;
                    width: 200px;
                }
            }
        }
        .xmind_container {
            width: 1200px;
            margin: 150px auto 0;
            .xmind_top {
                text-align: center;
                border-bottom: 1px solid #e6e6e6;
                position: relative;
                img {
                    position: absolute;
                    left: 550px;
                    top: -5px;
                    width: 100px;
                }
            }
            .xmind_tip {
                text-align: center;
                font-size: 24px;
                color: #1a1a1a;
                margin-top: 25px;
            }
            .xmind_detail {
                margin-top: 60px;
                padding: 0 150px;
                .xmind_content {
                    .xmind_img {
                        text-align: center;
                        img {
                            width: 100px;
                        }
                    }
                    .xmind_title {
                        font-size: 20px;
                        color: #1a1a1a;
                        margin-top: 15px;
                        text-align: center;
                    }
                    .xmind_intro {
                        font-size: 14px;
                        padding: 2px;
                        width: 170px;
                        margin: 10px auto 0;
                        border-radius: 5px;
                        p {
                            text-align: center;
                            line-height: 30px;
                            border-radius: 5px;
                            color: #b3b3b3;
                        }
                    }
                    .xmind_intro.add_border {
                        border: 2px dashed rgba(163, 206, 245, 1);
                        p {
                            background: rgba(188, 218, 246, 1);
                            color: #4ba3f3;
                        }
                    }
                }
                .arrow {
                    margin-top: 32px;
                    width: 62px;
                }
            }
        }
        .feature {
            padding-bottom: 120px;
            .autosign_anzhuang {
                margin-top: 75px;
                padding: 0 150px;
                .atosign_detail {
                    padding-top: 40px;
                    width: 406px;
                    .autosign_title {
                        font-size: 24px;
                        text-align: left;
                        color: #4ba3f3;
                    }
                    .autosign_title.text_align {
                        text-align: right;
                    }
                    span {
                        display: block;
                        margin-top: 20px;
                        font-size: 14px;
                        color: #b3b3b3;
                    }
                    span.text_align {
                        text-align: right;
                    }
                }
                .autosign_img {
                    img {
                        width: 406px;
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
        .xuanfu {
            min-height: 0;
            .xuanfu_content {
                position: fixed;
                width: 150px;
                height: 105px;
                right: 50%;
                top: 40%;
                margin-right: -600px;
                background: url(../assets/img/service.png) no-repeat;
                background-size: cover;
                border-radius: 10px;
                transition: all 0.3s;
                box-shadow: 0 0 5 px 0 rgba($color: #4d4d4d, $alpha: 0.5);
                p {
                    color: #fff;
                    font-size: 15px;
                    text-align: center;
                    img {
                        width: 20px;
                        vertical-align: middle;
                    }
                }
                .xuanfu_title {
                    padding: 10px 0;
                }
                .xuanfu_number {
                    line-height: 65px;
                }
            }
            .xuanfu_content:hover {
                box-shadow: 0 0 10px 0 rgba($color: #4d4d4d, $alpha: 0.5);
            }
        }
        .xuanfu.animated {
            animation-duration: 0.3s;
        }
        .loginBg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            z-index: 2;
        }
        .login {
            position: absolute;
            top: 100px;
            left: 50%;
            margin-left: -190px;
            padding-top: 106px;
            z-index: 3;
            background: #fff;
            width: 380px;
            height: 540px;
            text-align: center;
            border-radius: 10px;
            img {
                position: absolute;
                top: 30px;
                right: 30px;
                width: 22px;
                transition: transform 0.2s;
            }
            img:hover {
                transform: rotateZ(180deg);
            }
            .login_erweima {
                width: 180px;
                height: 180px;
                margin: 0 auto;
                // background: #ff5000;
            }
            .login_title {
                color: #333;
                font-size: 18px;
                margin-top: 60px;
            }
            .login_lujing {
                color: #808080;
                font-size: 14px;
                margin-top: 20px;
            }
            .login_tips {
                color: #ef3c3c;
                font-size: 14px;
                margin-top: 20px;
                span {
                    color: #44c167;
                }
            }
        }
        .login.animated {
            animation-duration: 0.3s;
        }
    }
}
</style>


