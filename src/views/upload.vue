<template>
    <div class="upload_container">
        <NAV :activeIndex="2"></NAV>
        <div class="upload_title_container">
            <div class="upload_title">
                <p class="upload_menu">IPA后台管理 / 上传IPA</p>
                <p class="upload_des">
                    上传码IPA
                    <span>*</span>为必填项
                </p>
                <div class="upload_atten">
                    <p>注意：</p>
                    <p>1.严禁上传涉及黄、赌、毒以及涉及政治不正确，调侃国家领导人的IPA，一经审查发现立即下架。请珍惜上传机会。</p>
                    <p>2.一个上传码对应一个IPA ，上传成功后该上传码自动失效。</p>
                    <p>3.上传的IPA结果可在【客户端】-【IPA上传进度】中查看。</p>
                    <p>4.只有上传授权码游戏时才需要上传码，上传公开游戏与提取码游戏时不需要上传码。</p>
                </div>
            </div>
        </div>
        <div class="upload_content_container">
            <div class="upload_content">
                <div class="upload_content_tab">
                    <div class="clearfix">
                        <p
                            :class="['cursor','fl',{'active':tabIndex==0}]"
                            @click="changeTabIndex(0)"
                        >
                            <img src="../assets/img/file.png" alt />文件
                        </p>
                        <p
                            :class="['cursor','fl',{'active':tabIndex==1}]"
                            @click="changeTabIndex(1)"
                        >
                            <img src="../assets/img/file.png" alt />下载链接
                        </p>
                        <p
                            :class="['cursor','fl',{'active':tabIndex==2}]"
                            @click="changeTabIndex(2)"
                        >
                            <img src="../assets/img/file.png" alt />iTunes链接
                        </p>
                    </div>
                </div>
                <div class="upload_content_detail">
                    <!-- tab切换 -->
                    <div class="tab_change">
                        <form
                            id="ajaxForm"
                            method="post"
                            action="https://47.111.93.47"
                            enctype="multipart/form-data"
                        >
                            <!-- 文件 -->
                            <div class="upload_file clearfix">
                                <p class="upload_detail_title fl">
                                    <span>*</span>文件名
                                </p>
                                <div class="upload_selectfile cursor fl">
                                    <input
                                        type="text"
                                        name="sign_ipaname"
                                        class="input_name"
                                        placeholder="请输入ipa包名字"
                                        v-model="ipaName"
                                    />
                                </div>
                            </div>
                            <div class="upload_file clearfix" v-if="tabIndex == 0">
                                <p class="upload_detail_title fl">文件</p>
                                <div class="upload_selectfile cursor fl">
                                    <p class="cursor" style="display:flex;align-items:center">
                                        <span class="btn" v-if="!inputDisabled">选择IPA文件</span>
                                        <span class="btn" v-else>重新选择IPA文件</span>
                                        <img
                                            v-if="showLoading"
                                            style="margin-left:10px;width:20px;height:20px;"
                                            src="../assets/img/loading.gif"
                                            alt
                                        />
                                        <span class="tips">必须上传IPA格式的文件，大小不能超过2G</span>
                                    </p>
                                    <input
                                        type="file"
                                        ref="uploadfile"
                                        name="sign_ipa"
                                        @change="uploadIPA"
                                        class="cursor input_file"
                                        :disabled="inputDisabled"
                                    />
                                </div>
                            </div>
                            <input type="text" name="sign_type" v-model="signType" v-show="false" />
                            <input
                                type="text"
                                name="sign_userid"
                                v-model="signUserid"
                                v-if="signType!=1"
                                v-show="false"
                            />
                        </form>
                        <!-- 下载链接 -->
                        <div class="upload_file clearfix" v-if="tabIndex == 1">
                            <p class="upload_detail_title fl">下载链接</p>
                            <div class="upload_selectfile fl">
                                <input
                                    type="text"
                                    class="lianjie"
                                    v-model="lianjieUrl"
                                    placeholder="请输入下载链接"
                                />
                            </div>
                        </div>
                        <!-- iTunes链接 -->
                        <div class="upload_file clearfix" v-if="tabIndex == 2">
                            <p class="upload_detail_title fl">iTunes链接</p>
                            <div class="upload_selectfile fl">
                                <input
                                    type="text"
                                    class="lianjie"
                                    v-model="itunesUrl"
                                    placeholder="请输入iTunes链接"
                                />
                            </div>
                        </div>
                    </div>
                    <!-- 填写的内容 -->
                    <div class="upload_wrap">
                        <!-- 联系方式 -->
                        <div class="upload_file clearfix">
                            <p class="upload_detail_title fl">
                                <span>*</span>联系方式
                            </p>
                            <div class="upload_selectfile fl">
                                <input
                                    type="text"
                                    class="lianjie"
                                    placeholder="请输入QQ号"
                                    v-model="qq"
                                />
                            </div>
                            <div class="upload_detail_tips fr">IPA上传如有任何问题，方便客服联系您。</div>
                        </div>
                        <!-- 描述 -->
                        <div class="upload_file clearfix">
                            <p class="upload_detail_title fl">
                                <span>*</span>描述
                            </p>
                            <div class="upload_selectfile fl">
                                <textarea
                                    type="text"
                                    class="lianjie teatarea"
                                    placeholder="认真填写IPA特性等描述，提高审核通过率（60个字以内）"
                                    v-model="describes"
                                ></textarea>
                            </div>
                            <div class="upload_detail_tips fr">建议填写描述，方便区分您上传的IPA。描述会显示于IPA简介信息中。</div>
                        </div>
                        <!-- 是否允许多开 -->
                        <div class="upload_file clearfix">
                            <p class="upload_detail_title fl">是否允许多开</p>
                            <div class="upload_selectfile fl">
                                <selectCom :data="multiOpenList" :value.sync="isMulti"></selectCom>
                            </div>
                            <div class="upload_detail_tips fr">
                                允许多开后，在点点IPA精灵安装时，可选择修改原应用名称，桌面会新建一个安装任务。
                                <span>上传成功后可对此选项进行修改。</span>
                            </div>
                        </div>
                        <!-- 是否微信登录 -->
                        <div class="upload_file clearfix">
                            <p class="upload_detail_title fl">是否微信登录</p>
                            <div class="upload_selectfile fl">
                                <selectCom :data="weixinLoginList" :value.sync="isWeixin"></selectCom>
                            </div>
                            <div class="upload_detail_tips fr">
                                现点点IPA精灵多开出来的应用，如需使用微信登录，需使用分身版微信，勾选后让叉叉IPA精灵更好判断是否需要提醒用户安装分身版微信。
                                <span>上传成功后可对此选项进行修改。</span>
                            </div>
                        </div>
                        <!-- 是否推广游戏 -->
                        <div class="upload_file clearfix">
                            <p class="upload_detail_title fl">是否推广游戏</p>
                            <div class="upload_selectfile fl">
                                <selectCom :data="tuiguangGameList" :value.sync="isTuiguang"></selectCom>
                            </div>
                            <div class="upload_detail_tips fr">
                                选择推广后，用户A可以通过分享该游戏链接，在被分享用户B通过该链接下载该游戏后，用户A可获得一部分用户B购买游戏金额的奖励。
                                <span>上传成功后可对此选项进行修改。</span>
                            </div>
                        </div>
                        <!-- 是否自动发货 -->
                        <div class="upload_file clearfix">
                            <p class="upload_detail_title fl">是否自动发货</p>
                            <div class="upload_selectfile fl">
                                <selectCom :data="autoFahuoList" :value.sync="isAutoFahuo"></selectCom>
                            </div>
                            <div class="upload_detail_tips fr">
                                选择自动发货后，用户在下载该IPA后，系统将自动发送提取码/授权码到下载用户的消息中心。
                                <span>上传成功后可对此选项进行修改。</span>
                            </div>
                        </div>
                        <!-- 是否自动上架-->
                        <div class="upload_file clearfix">
                            <p class="upload_detail_title fl">是否自动上架</p>
                            <div class="upload_selectfile fl">
                                <selectCom :data="autoshangjiaList" :value.sync="isAutoShangjia"></selectCom>
                            </div>
                            <div class="upload_detail_tips fr">选择自动上架后，通过审核该IPA默认上架。</div>
                        </div>
                        <!-- 是否为AppStore免费应用-->
                        <div class="upload_file clearfix">
                            <p class="upload_detail_title fl">是否为AppStore免费应用</p>
                            <div class="upload_selectfile fl">
                                <div class="select_wrap clearfix">
                                    <div
                                        v-for="(ele,index) in appstoreFree"
                                        :key="index"
                                        class="select_option cursor fl"
                                        @click="isFree = ele.id"
                                    >
                                        <div class="circle fl">
                                            <div class="color_circle" v-show="ele.id == isFree"></div>
                                        </div>
                                        <p class="fl">{{ele.name}}</p>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    class="lianjie"
                                    placeholder="请输入AppStore价格"
                                    v-show="!isFree"
                                />
                            </div>
                            <div class="upload_detail_tips fr">
                                默认选择免费应用，若选择付费应用，请输入该IPA在AppStore的售价。
                                <span>上传成功后可对此选项进行修改。</span>
                            </div>
                        </div>
                        <!-- 应用类型-->
                        <div class="upload_file clearfix">
                            <p class="upload_detail_title fl">
                                <span>*</span>应用类型
                            </p>
                            <div class="upload_selectfile fl">
                                <commonSelect
                                    :list="appType"
                                    :value.sync="appTypeValue"
                                    width="120"
                                    height="40px"
                                ></commonSelect>
                            </div>
                        </div>
                        <!-- 加密方式-->
                        <div class="upload_file clearfix">
                            <p class="upload_detail_title fl">加密方式</p>
                            <div class="upload_selectfile fl">
                                <div class="select_wrap">
                                    <div
                                        v-for="(ele,index) in jiamiTypeList"
                                        :key="index"
                                        class="select_option cursor clearfix"
                                        @click="jiamiType = ele.id"
                                    >
                                        <div
                                            class="fl clearfix"
                                            style="width:150px;margin-right:30px;"
                                        >
                                            <div class="circle fl">
                                                <div
                                                    class="color_circle"
                                                    v-show="ele.id == jiamiType"
                                                ></div>
                                            </div>
                                            <p class="fl">{{ele.name}}</p>
                                        </div>
                                        <span class="fl" style="color:#999999">{{ele.tip}}</span>
                                    </div>
                                </div>
                                <!-- <div class="select_shangchuanma">
                                    <p class="cursor">选择上传码</p>
                                    <input type="file" class="cursor">
                                </div>-->
                            </div>
                            <div
                                class="upload_detail_tips fr"
                            >选择加密方式为公开或者提取码_加密，默认该IPA售价为1元。选择授权码_加密，则该IPA售价可自定义（售价需大于等于5元）</div>
                        </div>
                        <!-- 该IPA售价 -->
                        <div class="upload_file clearfix">
                            <p class="upload_detail_title fl">
                                <span>*</span>该IPA售价
                            </p>
                            <div class="upload_selectfile fl">
                                <input
                                    type="text"
                                    class="lianjie"
                                    placeholder="请输入该IPA售价（元）,不少于5元"
                                    v-model="IPAPrice"
                                />
                                <span style="margin-left:20px;">元</span>
                            </div>
                        </div>
                        <!-- 该IPA售价 -->
                        <div class="upload_file clearfix">
                            <p class="upload_detail_title fl">
                                <!-- <span>*</span>该IPA售价 -->
                            </p>
                            <div class="upload_selectfile fl">
                                <button class="submit_btn" @click="submitData">提交</button>
                                <button class="back_btn">返回</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom_content">
            <p class="bottom_name">点点IPA精灵上传平台</p>
            <p class="bottom_copyright">Copyright © 点点IPA精灵版权所有</p>
        </div>
    </div>
</template>
<script>
import selectCom from "../components/selectCom";
export default {
    components: {
        selectCom
    },
    data() {
        return {
            tabIndex: 0,
            // 是否允许多开列表
            ipaData: [],
            multiOpenList: [
                {
                    name: "允许",
                    id: "0"
                },
                {
                    name: "不允许",
                    id: "1"
                }
            ],
            isMulti: "0",
            // 是否微信登录
            weixinLoginList: [
                {
                    name: "有微信登录",
                    id: "0"
                },
                {
                    name: "无微信登录",
                    id: "1"
                }
            ],
            isWeixin: "0",
            // 是否推广
            tuiguangGameList: [
                {
                    name: "推广",
                    id: "0"
                },
                {
                    name: "不推广",
                    id: "1"
                }
            ],
            isTuiguang: "0",
            // 是否自动发货
            autoFahuoList: [
                {
                    name: "自动",
                    id: "0"
                },
                {
                    name: "手动",
                    id: "1"
                }
            ],
            isAutoFahuo: "0",
            // 是否自动上架
            autoshangjiaList: [
                {
                    name: "自动",
                    id: "0"
                },
                {
                    name: "手动",
                    id: "1"
                }
            ],
            isAutoShangjia: "0",
            appstoreFree: [
                {
                    name: "免费应用",
                    id: "0"
                },
                {
                    name: "付费应用",
                    id: "1"
                }
            ],
            isFree: "0",
            jiamiTypeList: [
                {
                    name: "公开",
                    id: "0",
                    tip: "可被所有用户下载"
                },
                {
                    name: "提取码_加密",
                    id: "1",
                    tip: "用户需要提取码才能下载"
                },
                {
                    name: "授权码_加密",
                    id: "2",
                    tip: "用户需要授权码才能下载"
                }
            ],
            jiamiType: 0,
            appType: [
                {
                    name: "网络游戏",
                    id: "0"
                },
                {
                    name: "单机游戏",
                    id: "1"
                }
                // {
                //     name: "热门应用",
                //     id: 3
                // }
            ],
            appTypeValue: {
                name: "网络游戏",
                id: "0"
            },
            IPAPrice: "1",
            signType: 1,
            signUserid: 1,
            showLoading: false,
            ipaName: "",
            qq: "",
            describes: "",
            uploadSuccess: false,
            inputDisabled: false,
            uploadUrl: "",
            lianjieUrl: "",
            itunesUrl: ""
        };
    },
    methods: {
        changeTabIndex(index) {
            this.tabIndex = index;
        },
        getData() {
            this.dataEdit = [];
            this.$axios
                .post(
                    "https://www.ddipa.com:9090/DDApi/template/queryOIPA",
                    this.$qs.stringify({ id: this.$route.query.id })
                )
                .then(res => {
                    if (res.status == 200) {
                        this.path = res.data.data.path;
                        this.ipaName = res.data.data.name;
                        this.qq = res.data.data.qq;
                        this.describes = res.data.data.describes;
                        this.isMulti = res.data.data.moreopen;
                        this.isWeixin = res.data.data.vw;
                        this.isTuiguang = res.data.data.popularize;
                        this.isFree = res.data.data.free;
                        this.isAutoFahuo = res.data.data.send;
                        this.isAutoShangjia = res.data.data.upper;
                        this.appTypeValue.id = res.data.data.type;
                        this.jiamiType = res.data.data.encryption;
                        this.IPAPrice = res.data.data.price;
                        this.tabIndex = res.data.data.uploadmode;
                        if(this.tabIndex == 0 || !this.tabIndex){
                            this.inputDisabled = true;
                            this.uploadSuccess = true;
                            this.uploadUrl = res.data.data.path
                        }else if(this.tabIndex == 1){
                            this.lianjieUrl = res.data.data.path
                        }else{
                            this.itunesUrl = res.data.data.path
                        }
                    }
                });
        },
        uploadIPA(e) {
            var that = this;
            that.uploadSuccess = false;
            that.showLoading = true;
            $("#ajaxForm").ajaxSubmit(function(res) {
                that.showLoading = false;
                console.log("res+++");
                console.log(JSON.parse(res));
                that.uploadSuccess = true;
                that.uploadUrl = JSON.parse(res).oss.plist.url;
                alert("上传成功");
            });
        },
        submitData() {
            console.log(this.tabIndex);
            var url;
            if (this.tabIndex == 0) {
                url = this.uploadUrl;
            } else if (this.tabIndex == 1) {
                url = this.lianjieUrl;
            } else {
                url = this.itunesUrl;
            }
            if (!this.uploadSuccess && this.tabIndex == 0) {
                alert("请等待上传完毕");
                return;
            }
            
            if(!url){
                alert('请输入下载地址');
                return
            }else if(!this.ipaName){
                alert('请输入ipa名字');
                return
            }else if(!this.qq){
                alert('请输入QQ');
                return
            }else if(!this.describes){
                alert('请输入描述');
                return
            }
            var data = {
                path: url,
                photo:
                    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570216000736&di=9659f319c13dc34185067c3479719513&imgtype=0&src=http%3A%2F%2Fnewsimg.5054399.com%2Fuploads%2Fuserup%2F1903%2F11145115T42.jpg",
                name: this.ipaName,
                authorid: "1",
                qq: this.qq,
                describes: this.describes,
                moreopen: this.isMulti,
                vw: this.isWeixin,
                popularize: this.isTuiguang,
                free: this.isFree,
                send: this.isAutoFahuo,
                upper: this.isAutoShangjia,
                type: this.appTypeValue.id,
                encryption: this.jiamiType,
                // 提取码
                code: ("" + new Date().getTime()).substring(7, 13),
                // app状态
                state: "0",
                // 售价
                price: this.IPAPrice,
                uploadcode: this.$route.query.uploadcode
                    ? this.$route.query.uploadcode
                    : "",
                uploadmode:''+this.tabIndex
            };
            if (this.$route.query.id) {
                data.id = this.$route.query.id;
                this.$axios
                    .post(
                        "https://www.ddipa.com:9090/DDApi/updateTemplate/updateIPA",
                        this.$qs.stringify(data)
                    )
                    .then(res => {
                        alert(res.data.message);
                        this.getData();
                    });
            } else {
                this.$axios
                    .post(
                        "https://www.ddipa.com:9090/DDApi/insetTemplate/insertIPA",
                        this.$qs.stringify(data)
                    )
                    .then(res => {
                        alert(res.data.message);
                        // this.getData();
                    });
            }
        }
    },
    watch: {
        jiamiType() {
            if (this.jiamiType) {
                // this.IPAPrice = 1;
            }
        }
    },
    created() {
        if (this.$route.query.id) {
            this.getData();
        }
    }
};
</script>
<style lang="scss" scoped>
.upload_container {
    .upload_title_container {
        width: 100%;
        min-width: 1200px;
        background: #fff;
        border-top: 1px solid #f1f1f1;
        .upload_title {
            width: 1200px;
            margin: 0 auto;
            padding: 20px 18px 0;
            .upload_menu {
                font-size: 18px;
                color: rgba(51, 51, 51, 1);
            }
            .upload_des {
                margin-top: 15px;
                font-size: 16px;
                color: rgba(51, 51, 51, 1);
                span {
                    margin-left: 30px;
                    color: #ec2828;
                }
            }
            .upload_atten {
                background: #d2e5f8;
                padding: 10px 18px;
                margin-top: 20px;
                color: #ec2828;
                font-size: 14px;
                p {
                    line-height: 25px;
                }
            }
        }
    }
    .upload_content_container {
        width: 100%;
        min-width: 1200px;
        background: #fff;
        // border-top: 1px solid #f1f1f1;
        .upload_content {
            width: 1200px;
            margin: 0 auto;
            padding: 20px 18px 50px;
            .upload_content_tab {
                div {
                    width: 481px;
                    border: 1px solid #e6e6e6;
                    border-right: 0;
                }
                p {
                    width: 160px;
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    text-align: center;
                    color: #4d4d4d;
                    border-right: 1px solid #e6e6e6;
                    img {
                        width: 24px;
                        vertical-align: -5px;
                        margin-right: 5px;
                    }
                }
                p.active {
                    color: #fff;
                    background: #4ba3f3;
                }
            }
            .upload_content_detail {
                // padding-top: 30px;
                .upload_file {
                    margin-top: 30px;
                }
                .upload_detail_title {
                    width: 255px;
                    height: 40px;
                    text-align: right;
                    margin-right: 25px;
                    font-size: 14px;
                    color: #4d4d4d;
                    line-height: 40px;
                    span {
                        color: #ec2828;
                        font-size: 16px;
                        margin-right: 5px;
                    }
                }
                .upload_selectfile {
                    position: relative;
                    .select_wrap {
                        .select_option {
                            line-height: 40px;
                            font-size: 14px;
                            color: #4d4d4d;
                            margin-right: 30px;
                            position: relative;
                            .circle {
                                width: 20px;
                                height: 20px;
                                background: rgba(255, 255, 255, 1);
                                border: 1px solid rgba(75, 163, 243, 1);
                                border-radius: 50%;
                                margin-top: 10px;
                                margin-right: 5px;
                                position: relative;
                                .color_circle {
                                    width: 12px;
                                    height: 12px;
                                    background: rgba(75, 163, 243, 1);
                                    border-radius: 50%;
                                    position: absolute;
                                    top: 50%;
                                    margin-top: -6px;
                                    left: 50%;
                                    margin-left: -6px;
                                }
                            }
                        }
                    }
                    .select_shangchuanma {
                        position: relative;
                        p {
                            width: 150px;
                            height: 40px;
                            line-height: 40px;
                            text-align: center;
                            color: #fff;
                            font-size: 14px;
                            background: rgba(75, 163, 243, 1);
                            border-radius: 5px;
                            margin-top: 10px;
                        }
                        input {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 150px;
                            height: 40px;
                            opacity: 0;
                        }
                    }
                    button {
                        outline: 0;
                        border: 0;
                        width: 120px;
                        height: 40px;
                        text-align: center;
                        line-height: 40px;
                        font-size: 14px;
                        border: 1px solid rgba(75, 163, 243, 1);
                    }
                    .submit_btn {
                        color: #fff;
                        background: rgba(75, 163, 243, 1);
                        margin-right: 60px;
                    }
                    .back_btn {
                        color: #4ba3f3;
                        background: #fff;
                    }
                    p {
                        span {
                            display: inline-block;
                            font-size: 14px;
                            line-height: 40px;
                        }
                        span.btn {
                            width: 150px;
                            background: #4ba3f3;
                            text-align: center;
                            color: #fff;
                        }
                        span.tips {
                            margin-left: 25px;
                            color: #999999;
                        }
                    }
                    .input_file {
                        position: absolute;
                        top: 0;
                        left: 0;
                        border: 0;
                        outline: 0;
                        width: 150px;
                        height: 40px;
                        // visibility: hidden;
                        opacity: 0;
                    }
                    .input_name {
                        width: 320px;
                        height: 40px;
                        background: white;
                        border: 1px solid #e6e6e6;
                        border-radius: 5px;
                        padding: 0 18px;
                        font-size: 14px;
                        color: #4d4d4d;
                    }
                    .lianjie {
                        width: 320px;
                        height: 40px;
                        background: rgba(255, 255, 255, 1);
                        border: 1px solid rgba(230, 230, 230, 1);
                        border-radius: 5px;
                        padding: 0 18px;
                        font-size: 14px;
                        color: #4d4d4d;
                    }

                    .input_name::-webkit-input-placeholder {
                        color: #ccc;
                    }
                    .input_name::-moz-placeholder {
                        /* Mozilla Firefox 19+ */
                        color: #ccc;
                    }
                    .input_name:-moz-placeholder {
                        /* Mozilla Firefox 4 to 18 */
                        color: #ccc;
                    }
                    .input_name:-ms-input-placeholder {
                        /* Internet Explorer 10-11 */
                        color: #ccc;
                    }
                    .lianjie::-webkit-input-placeholder {
                        color: #ccc;
                    }
                    .lianjie::-moz-placeholder {
                        /* Mozilla Firefox 19+ */
                        color: #ccc;
                    }
                    .lianjie:-moz-placeholder {
                        /* Mozilla Firefox 4 to 18 */
                        color: #ccc;
                    }
                    .lianjie:-ms-input-placeholder {
                        /* Internet Explorer 10-11 */
                        color: #ccc;
                    }
                    .teatarea {
                        height: 160px !important;
                        resize: none;
                        outline: 0;
                        padding: 10px;
                    }
                }
                .upload_detail_tips {
                    width: 500px;
                    padding: 15px 15px;
                    background: rgba(240, 247, 254, 1);
                    border: 1px solid rgba(210, 229, 248, 1);
                    border-radius: 5px;
                    color: #7dd4ed;
                    font-size: 12px;
                    line-height: 20px;
                    span {
                        color: #ec2828;
                    }
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
</style>
