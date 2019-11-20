<template>
    <div class="nav_container">
        <div class="top_nav clearfix">
            <div class="logo fl">
                <img src="../assets/img/icon.png" alt>
                点点IPA精灵
            </div>
            <div class="nav_list fr">
                <div :class="['nav_menu', 'fl', {active:activeIndex==1}]">
                    <router-link to="/">首页</router-link>
                </div>
                <div
                    :class="['nav_menu', 'fl']"
                    @mouseover="showErweima = true"
                    @mouseleave="showErweima = false"
                >
                    <a>手机安装IPA精灵</a>
                </div>
                <div :class="['nav_menu', 'fl', {active:activeIndex==2}]">
                    <a @click="updateIPA">上传IPA文件</a>
                </div>
                <div :class="['nav_menu', 'fl', {active:activeIndex==3}]">
                    <a @click="manageIPA">管理IPA文件</a>
                </div>
                <div
                    class="showerweima"
                    @mouseover="showErweima = true"
                    @mouseleave="showErweima = false"
                    v-show="showErweima"
                >
                    <div class="download_erweima"></div>
                    <p>扫码在手机上安装</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { setCookie, getCookie, delCookie } from "../assets/js/cookie";
export default {
    props: ["activeIndex",'showLogin'],
    data() {
        return {
            showErweima: false
        };
    },
    methods:{
        updateIPA() {
            console.log(1111)
            if (!getCookie("token")) {
                this.$emit('update:showLogin',true)
            } else {
                this.$router.push("/update");
            }
        },
        manageIPA() {
            if (!getCookie("token")) {
                this.$emit('update:showLogin',true)
            } else {
                this.$router.push("/manage");
            }
        },
    }
};
</script>


<style lang="scss" scoped>
.nav_container {
    width: 100%;
    .top_nav {
        width: 1200px;
        margin: 0 auto;
        height: 70px;
        padding: 10px 0;
        .logo {
            line-height: 50px;
            font-size: 16px;
            color: #333;
            font-weight: 800;
            padding-left: 18px;
            img {
                width: 50px;
                margin-right: 10px;
                vertical-align: bottom;
            }
        }
        .nav_list {
            position: relative;
            .showerweima {
                position: absolute;
                left: 88px;
                top: 45px;
                // width: 200px;
                height: 190px;
                padding: 15px;
                background: #fff;
                box-shadow: 3px 2px 9px 1px rgba(77, 77, 77, 0.3);
                border-radius: 20px;
                z-index: 1;
                .download_erweima {
                    width: 130px;
                    height: 130px;
                    background: #ff5000;
                }
                p {
                    margin-top: 10px;
                    color: #333333;
                    font-size: 16px;
                }
            }
            .nav_menu {
                line-height: 50px;
                padding: 0 18px;
                font-size: 16px;
                a {
                    display: inline-block;
                    cursor: pointer;
                    color: #999999;
                }
            }
            .nav_menu.active {
                a {
                    color: #4ba3f3;
                // font-weight: 800;
                }
            }
            .nav_menu:hover {
                a {
                    color: #4ba3f3;
                // font-weight: 800;
                }
            }
        }
    }
}
</style>

