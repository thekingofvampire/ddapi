<template>
    <div class="teble_container">
        <div class="table_condition clearfix">
            <div class="number_content width_set fl">
                <p class="condition_title">上传码</p>
                <commonInput :value.sync="numberSearch" width="80"></commonInput>
            </div>
            <div class="update_status_content width_set fl">
                <p class="condition_title">上传状态</p>
                <div class="select_width">
                    <commonSelect
                        :list="updateStatusSearch"
                        :value.sync="selectedStausSearch"
                        width="100"
                    ></commonSelect>
                </div>
            </div>
            <div class="update_name_content width_set fl">
                <p class="condition_title">上传名称</p>
                <commonInput :value.sync="nameSearch"></commonInput>
            </div>
            <div class="update_type_content width_set fl">
                <p class="condition_title">上传方式</p>
                <div class="select_width">
                    <commonSelect
                        :list="updateTypeSearch"
                        :value.sync="selectedTypeSearch"
                        width="120"
                    ></commonSelect>
                </div>
            </div>
            <div class="update_type_content width_set fl">
                <p class="condition_title">IPA状态</p>
                <div class="select_width">
                    <!-- <commonSelect
                        :list="ipaStatusSearch"
                        :value.sync="selectedipaStatusSearch"
                        width="90"
                    ></commonSelect>-->
                </div>
            </div>
            <div class="update_type_content width_set fl">
                <p class="condition_title">加密方式</p>
                <div class="select_width">
                    <commonSelect
                        :list="encodeSearch"
                        :value.sync="selectedEncodeSearch"
                        width="80"
                    ></commonSelect>
                </div>
            </div>
            <div class="update_type_content width_set fl">
                <p class="condition_title">上传时间</p>
                <div class="select_width">
                    <!-- <commonSelect
                        :list="encodeSearch"
                        :value.sync="selectedEncodeSearch"
                        width="80"
                    ></commonSelect>-->
                </div>
            </div>
            <div class="update_type_content width_set fl">
                <p class="condition_title">描述</p>
                <!-- <commonInput :value.sync="describes" width="100" @blur="searchDescribes"></commonInput> -->
            </div>
            <div class="update_type_content width_set fl">
                <p class="condition_title">提取码/授权码</p>
                <!-- <commonInput :value.sync="numberSearch" width="100"></commonInput> -->
            </div>
            <div class="update_type_content width_set fl">
                <p class="condition_title">操作</p>
                <!-- <commonInput :value.sync="numberSearch" width="100"></commonInput> -->
            </div>
        </div>
        <table v-if="dataEdit.length">
            <tr
                v-for="(ele,index) in dataEdit"
                :key="index"
                :class="{no_border:index+1==dataEdit.length}"
            >
                <!-- 上传码 -->
                <td class="number">{{ele.uploadcode}}</td>
                <!-- 上传状态 -->
                <td :class="['update_status',{fail:ele.state==1}]">
                    <div>{{updatStatus(ele.state)}}</div>
                </td>
                <!-- 上传名称 -->
                <td class="name">
                    <div>{{ele.name}}</div>
                </td>
                <!-- 上传方式 -->
                <td class="update_type">
                    <div>{{ele.updateType}}</div>
                </td>
                <!-- IPA状态 -->
                <td class="ipa_status">
                    <div>{{ipaStatus(ele.state)}}</div>
                </td>
                <!-- 加密方式 -->
                <td class="encode_type">
                    <div>{{encodeType(ele.encryption)}}</div>
                </td>
                <!-- 上传时间 -->
                <td class="time">
                    <div>{{getUploadTime(ele.startings)}}</div>
                </td>
                <!-- 描述 -->
                <td class="des">
                    <div>{{ele.describes}}</div>
                </td>
                <!-- 提取码、授权码 -->
                <td :class="['is_tiquma',{active:(ele.encryption=='2'||ele.encryption=='1')}]">
                    <div
                        class="cursor"
                        v-show="shouBtn(ele.encryption)"
                        @click="showMa(ele,ele.name,ele.state,ele.encryption)"
                    >{{shouBtn(ele.encryption)}}</div>
                </td>
                <!-- 操作 -->
                <td class="operate">
                    <div v-show="ele.operate.length">
                        <span
                            v-for="(item,key) in ele.operate"
                            :class="['cursor',{add_margin:key==0&&ele.operate.length>1,edit:item=='3'||item=='4',up:item=='2',down:item=='1'}]"
                            :key="key"
                            @click="ipaOperate(item,ele)"
                        >{{operateStatus(item)}}</span>
                    </div>
                </td>
            </tr>
        </table>
        <div
            class="gather"
        >汇总:共{{huizongData.allup}}个上传； 上传成功{{huizongData.success}}个； 审核中{{huizongData.approval}}个； 上传失败{{huizongData.fail}}个； 已上架{{huizongData.upper}}个； 已下架{{huizongData.lower}}个； 公开{{huizongData.opens}}个； 提取码{{huizongData.alltq}}个； 授权码{{huizongData.allsq}}个</div>
        <div class="page_container clearfix">
            <p class="fl export cursor">导出当前数据(TXT格式)</p>
            <div class="fr page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="1"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalPage"
                ></el-pagination>
            </div>
        </div>
        <!-- 提取码的弹出框 -->
        <div class="see_tiquma" v-if="showTiquma">
            <div class="see_tiquma_title_wrap">
                <div class="see_tiquma_title">查看提取码</div>
                <img
                    src="../assets/img/closeDrawer.png"
                    alt
                    class="cursor"
                    @click="showTiquma=false"
                />
            </div>
            <div class="current_ipa">
                当前IPA:{{tiquMoldMsg.name}}
                <br />
                当前状态:{{tiquMoldMsg.ipaStatus}}
            </div>
            <div class="table_condition clearfix">
                <div class="update_name_content width_set fl">
                    <p class="condition_title">提取码名称</p>
                    <commonInput :value.sync="tiqumaName" width="80"></commonInput>
                </div>
                <div class="update_status_content width_set fl">
                    <p class="condition_title">提取码状态</p>
                    <div class="select_width">
                        <commonSelect
                            :list="tiqumaStatusList"
                            :value.sync="tiqumaSelected"
                            width="100"
                        ></commonSelect>
                    </div>
                </div>
                <div class="update_name_content width_set fl">
                    <p class="condition_title">提取用户名称</p>
                    <commonInput :value.sync="tiqumaUserName" width="100"></commonInput>
                </div>
                <div class="update_type_content width_set fl">
                    <p class="condition_title">操作</p>
                </div>
            </div>
            <table class="tiqu_table" v-if="tiqumaList.length">
                <tr v-for="(ele,index) in tiqumaList" :key="index">
                    <!-- 提取码名称 -->
                    <td class="number">
                        <input
                            type="text"
                            :id="ele.code+ele.id"
                            class="noselect"
                            v-model="ele.code"
                            readonly
                        />
                    </td>
                    <!-- 提取码状态 -->
                    <td :class="['update_status',ele.state=='0'?'green':'gray']">
                        <div>{{tiqumaStatus(ele.state)}}</div>
                    </td>
                    <!-- 提取用户名称 -->
                    <td class="name">
                        <div>{{ele.name}}</div>
                    </td>
                    <!-- 操作 -->
                    <td class="operate">
                        <div v-show="ele.operate.length">
                            <span
                                v-for="(item,key) in ele.operate"
                                :class="['cursor',{add_margin:key==0&&ele.operate.length>1,fuzhi:item=='0',chexiao:item=='1',yichexiao:item=='2'}]"
                                :key="key"
                                @click="tiqumaOperate(ele,item)"
                            >{{tiqumaOperateStatus(item)}}</span>
                        </div>
                    </td>
                </tr>
            </table>
            <div class="page">
                <el-pagination
                    @current-change="handleCurrentTiqumaChange"
                    :current-page="1"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="prev, pager, next, jumper"
                    :total="tiquPageTotal"
                ></el-pagination>
            </div>
        </div>
        <!-- 授权码的弹出框 -->
        <div class="see_shouquan" v-if="showShouquanma">
            <div class="see_tiquma_title_wrap">
                <div class="see_tiquma_title">查看授权码</div>
                <img
                    src="../assets/img/closeDrawer.png"
                    alt
                    class="cursor"
                    @click="showShouquanma=false"
                />
            </div>
            <div class="current_ipa">
                当前IPA:{{shouquanmaMoldMsg.name}}
                <br />
                当前状态:{{shouquanmaMoldMsg.ipaStatus}}
                <br />当前IPA剩余可用授权码:999
                <p style="color:#333333;font-size:14px;">需要更多授权码可联系客服QQ申请:987625998</p>
                <p
                    style="color:#B3B3B3;font-size:14px;line-height:20px;"
                >为此IPA生成授权码,一个授权码只能授权一台设备使用,该设备一旦使用,其他设备无法使用同个授权码查看您的IPA</p>
                <div class="onkey_wrap clearfix">
                    <input
                        type="text"
                        class="fl input1"
                        placeholder="输入需要生成的授权码个数"
                        v-model="shouquanmaNumber"
                    />
                    <div>
                        <commonSelect
                            :list="shouquanmaTipList"
                            :value.sync="shouquanmaremark"
                            width="100"
                        ></commonSelect>
                    </div>
                    <button class="fl" @click="shengchengShouquanma">一键生成授权码</button>
                </div>
            </div>
            <div class="table_condition clearfix">
                <div class="update_status_content width_set fl">
                    <p class="condition_title">授权码备注</p>
                    <div class="select_width">
                        <commonSelect
                            :list="shouquanmaTipList"
                            :value.sync="shouquanmaSelectedRemark"
                            width="100"
                        ></commonSelect>
                    </div>
                </div>
                <div class="update_name_content width_set fl">
                    <p class="condition_title">授权码名称</p>
                    <commonInput :value.sync="shouquanmaName" width="80"></commonInput>
                </div>
                <div class="update_status_content width_set fl">
                    <p class="condition_title">授权码状态</p>
                    <div class="select_width">
                        <commonSelect
                            :list="shouquanmaStatusList"
                            :value.sync="shouquanmaSelected"
                            width="100"
                        ></commonSelect>
                    </div>
                </div>
                <div class="update_name_content width_set fl">
                    <p class="condition_title">授权用户名称</p>
                    <commonInput :value.sync="shouquanmaUserName" width="100"></commonInput>
                </div>
                <div class="update_type_content width_set fl">
                    <p class="condition_title">操作</p>
                </div>
            </div>
            <table class="tiqu_table" v-if="shouquanmaList.length">
                <tr v-for="(ele,index) in shouquanmaList" :key="index">
                    <!-- 授权码备注 -->
                    <td class="name">
                        <div>{{ele.remarks}}</div>
                    </td>
                    <!-- 授权码名称 -->
                    <td class="number">
                        <input
                            type="text"
                            :id="ele.sqcode+ele.id"
                            class="noselect"
                            v-model="ele.sqcode"
                            readonly
                        />
                    </td>
                    <!-- 授权码状态 -->
                    <td
                        :class="['update_status',ele.state=='1'?'green':ele.state=='2'?'gray':'blue']"
                    >
                        <div>{{shouquanmaStatus(ele.state)}}</div>
                    </td>
                    <!-- 授权码用户名称 -->
                    <td class="name">
                        <div>{{ele.name}}</div>
                    </td>
                    <!-- 操作 -->
                    <td class="operate">
                        <div v-show="ele.operate.length">
                            <span
                                v-for="(item,key) in ele.operate"
                                :class="['cursor',{add_margin:key==0&&ele.operate.length>1,fuzhi:item=='0',chexiao:item=='1',yichexiao:item=='2'}]"
                                :key="key"
                                @click="tiqumaOperate(ele,item)"
                            >{{tiqumaOperateStatus(item)}}</span>
                        </div>
                    </td>
                </tr>
            </table>
            <div class="page">
                <el-pagination
                    @current-change="handleShouquanCurrentChange"
                    :current-page="1"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="100"
                    layout="prev, pager, next, jumper"
                    :total="shouquanPageTotal"
                ></el-pagination>
            </div>
        </div>
        <!-- 购买的弹出框 -->
        <div class="see_shouquan" v-if="buyShangchuanma">
            <div class="see_tiquma_title_wrap">
                <div class="see_tiquma_title">购买上传码</div>
                <img
                    src="../assets/img/closeDrawer.png"
                    alt
                    class="cursor"
                    @click="$emit('update:buyShangchuanma',false)"
                />
            </div>
            <div class="colorBg">
                <div class="account">
                    <div>购买账号:三毛1131</div>
                </div>
                <div class="tuiguang_shangchuanma">
                    <p class="tuiguang_title">推广上传码</p>
                    <ul class="maList clearfix">
                        <li v-for="(ele,index) in tuiguangShangchuanma" :key="index" class="fl">
                            <div
                                :class="['msg_wrap','cursor',{active:ele.active}]"
                                @click="selectTuiguangshangchuan(index)"
                            >
                                <div class="average_price">
                                    <p class="price">
                                        ￥
                                        <span>{{ele.codeExercisePrice}}</span>/个
                                    </p>
                                    <p class="tuiguang_content">含{{ele.codeNumber}}个推广上传码</p>
                                </div>
                                <div class="price_wrap">
                                    <p class="huaxian">原￥{{ele.codeOriginalMoney}}</p>
                                    <p class="total_price">共￥{{ele.codeExerciseMoney}}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <p class="tuiguang_title">万能上传码</p>
                    <ul class="maList clearfix">
                        <li v-for="(ele,index) in wannengShangchuanma" :key="index" class="fl">
                            <div
                                :class="['msg_wrap','cursor',{active:ele.active}]"
                                @click="selectWannengshangchuan(index)"
                            >
                                <div class="average_price">
                                    <p class="price">
                                        ￥
                                        <span>{{ele.codeExercisePrice}}</span>/个
                                    </p>
                                    <p class="tuiguang_content">含{{ele.codeNumber}}个推广上传码</p>
                                </div>
                                <div class="price_wrap">
                                    <p class="huaxian">原￥{{ele.codeOriginalMoney}}</p>
                                    <p class="total_price">共￥{{ele.codeExerciseMoney}}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="tuiguang_shangchuanma no_border">
                    <p class="tuiguang_title add_top_margin">支付方式</p>
                    <ul class="zhifu_type clearfix">
                        <li
                            v-for="(ele,index) in zhifuType"
                            :key="index"
                            class="fl"
                            @click="selectZhifuType(index)"
                        >
                            <div :class="['cursor',{active:ele.active}]">{{ele.name}}</div>
                        </li>
                    </ul>
                    <div v-html="zhifuTypeErweima"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { setCookie, getCookie, delCookie } from "../assets/js/cookie";
export default {
    props: ["data", "buyShangchuanma"],
    data() {
        return {
            shouquanmaremark: "",
            // 总页数
            totalPage: null,
            // 支付方式
            zhifuType: [
                {
                    name: "支付宝支付",
                    id: "0",
                    active: false
                }
                // {
                //     name: "微信支付",
                //     id: "1",
                //     active: false
                // }
            ],
            // 购买上传吗弹出窗
            bugShangchuanma: true,
            // 购买上传吗
            tuiguangShangchuanma: [],
            wannengShangchuanma: [],
            shouquanmaName: "",
            shouquanmaUserName: "",
            // 购买上传码
            // 授权码备注
            shouquanmaTipList: [
                {
                    name: "自用",
                    id: "0"
                },
                {
                    name: "备用",
                    id: "1"
                },
                {
                    name: "送人",
                    id: "2"
                }
            ],
            shouquanmaNumber: "",
            shouquanmaRemark: "",
            shouquanmaSelected: "",
            // 授权码对应的游戏
            shouquanmaMoldMsg: {},
            // 授权码的列表
            shouquanmaList: [],
            // 授权码的弹框
            showShouquanma: false,
            // 提取码对应的游戏
            tiquMoldMsg: {},
            // 展示提取码
            showTiquma: false,
            // 查看提取码列表
            tiqumaList: [],
            // 搜索提取码
            tiqumaName: "",
            tiqumaUserName: "",
            tiqumaStatusList: [
                {
                    name: "全部",
                    id: ""
                },
                {
                    name: "已使用",
                    id: "0"
                },
                {
                    name: "已失效",
                    id: "1"
                }
            ],
            tiqumaSelected: "",
            shouquanmaStatusList: [
                {
                    name: "全部",
                    id: ""
                },
                {
                    name: "未使用",
                    id: "0"
                },
                {
                    name: "已使用",
                    id: "1"
                },
                {
                    name: "已失效",
                    id: "2"
                }
            ],
            shouquanmaSelectedRemark: "",
            // 总条数
            totalCount: 10,
            countList: [
                {
                    name: 5,
                    id: 1
                },
                {
                    name: 10,
                    id: 2
                },
                {
                    name: 15,
                    id: 3
                },
                {
                    name: 20,
                    id: 4
                }
            ],
            countPage: 10,
            // 总数
            totalUpdate: 5,
            // 成功上传
            successUpdate: 5,
            // 审核中
            shenheUpdate: 5,
            // 上传失败
            failUpdate: 5,
            // 已上架
            grounding: 5,
            // 已下架
            ungrounding: 5,
            // 已公开
            publics: 5,
            // 提取码
            tiqumaCount: 5,
            // 授权码
            shouquanCount: 5,
            // 汇总数据
            huizongData: {},
            // 搜索上传码
            numberSearch: "",
            // 搜索上传状态
            selectedStausSearch: null,
            // 搜索上传名称
            nameSearch: "",
            // 搜索上传方式
            selectedTypeSearch: null,
            // ipa状态筛选
            selectedipaStatusSearch: "",
            // 加密方式筛选
            selectedEncodeSearch: "",
            updateStatusSearch: [
                {
                    name: "全部",
                    id: ""
                },
                {
                    name: "上传成功",
                    id: 2
                },
                {
                    name: "审核中",
                    id: 0
                },
                {
                    name: "上传失败",
                    id: 1
                }
            ],
            updateTypeSearch: [
                {
                    name: "全部",
                    id: 0
                },
                {
                    name: "直接上传",
                    id: 1
                },
                {
                    name: "iTunes上传",
                    id: 2
                },
                {
                    name: "下载链接上传",
                    id: 3
                }
            ],
            ipaStatusSearch: [
                {
                    name: "全部",
                    id: 0
                },
                {
                    name: "已上架",
                    id: 1
                },
                {
                    name: "已下架",
                    id: 2
                }
            ],
            encodeSearch: [
                {
                    name: "全部",
                    id: ""
                },
                {
                    name: "公开",
                    id: 0
                },
                {
                    name: "提取码",
                    id: 1
                },
                {
                    name: "授权码",
                    id: 2
                }
            ],
            dataEdit: [],
            defaultPage: 1,
            defaultPagecount: 10,
            defaultShouquanPage: 1,
            defaultTiquPage: 1,
            // 点击查看授权码或者提取码的临时存放处
            tmpEle: null,
            tiquPageTotal: 1,
            shouquanPageTotal: 1,
            zhifuTypeErweima: "",
            describes: "",
            sccode: ""
        };
    },
    methods: {
        // 获取所有的数据
        getData(page, pagecount) {
            this.dataEdit = [];
            this.$axios
                .post(
                    "https://www.ddipa.com:9090/DDApi/template/queryIPA",
                    this.$qs.stringify({
                        page: this.defaultPage,
                        id: "1",
                        pagecount: this.defaultPagecount,
                        uploadcode: this.numberSearch,
                        state: this.selectedStausSearch
                            ? this.selectedStausSearch.id
                                ? this.selectedStausSearch.id == 2
                                    ? "2,3"
                                    : this.selectedStausSearch.id
                                : this.selectedStausSearch.id
                            : null,
                        name: this.nameSearch,
                        updateType: this.selectedTypeSearch
                            ? this.selectedTypeSearch.id
                            : null,
                        encryption: this.selectedEncodeSearch
                            ? this.selectedEncodeSearch.id
                            : null,
                        describes: this.describes
                    })
                )
                .then(res => {
                    if (res.status == 200) {
                        res.data.data.forEach(ele => {
                            ele.operate = [];
                            if (ele.state == "0" || ele.state == "1") {
                                ele.operate = [];
                            } else if (ele.state == "2") {
                                ele.operate = ["1", "4"];
                            } else if (ele.state == "3") {
                                ele.operate = ["2", "4"];
                            } else if (ele.state == "4") {
                                ele.operate = ["3"];
                            }
                        });
                        this.dataEdit = res.data.data;
                        this.huizongData = res.data.allmessage[0];
                        this.totalPage = res.data.allmessage[0].allup;
                    }
                });
        },
        // 选择支付方式
        selectZhifuType(index) {
            this.zhifuType.forEach((ele, key) => {
                if (key == index) {
                    ele.active = true;
                } else {
                    ele.active = false;
                }
            });
            this.$async.auto({
                order: cb => {
                    var orderNumber = null;
                    var codeId = null;
                    this.wannengShangchuanma.forEach((ele, key) => {
                        if (ele.active) {
                            //////console.log(ele);
                            orderNumber = ele.codeNumber;
                            codeId = ele.codeId;
                        }
                    });
                    this.tuiguangShangchuanma.forEach((ele, key) => {
                        if (ele.active) {
                            //////console.log(ele);
                            orderNumber = ele.codeNumber;
                            codeId = ele.codeId;
                        }
                    });
                    var data = {
                        userId: getCookie('userid'),
                        money: this.codeExercisePrice,
                        orderNumber,
                        orderType: "1",
                        codeId
                    };
                    this.$axios
                        .post(
                            "https://www.ddipa.com:9090/DDApi/order/add/orders",
                            data
                        )
                        .then(res => {
                            if (res.status == 200) {
                                cb(null, res.data);
                            }
                        });
                },
                payOrder: [
                    "order",
                    res => {
                        var orderNumber = null;
                        var codeId = null;
                        this.wannengShangchuanma.forEach((ele, key) => {
                            if (ele.active) {
                                orderNumber = ele.codeNumber;
                                codeId = ele.codeId;
                            }
                        });
                        this.tuiguangShangchuanma.forEach((ele, key) => {
                            if (ele.active) {
                                orderNumber = ele.codeNumber;
                                codeId = ele.codeId;
                            }
                        });
                        var data = res.order;
                        data.zflx = "alipay";
                        this.$axios
                            .post(
                                "https://www.ddipa.com:9090/DDApi/pay/payOrder",
                                data
                            )
                            .then(res => {
                                if (res.status == 200) {
                                    var url, htmls;

                                    this.zhifuTypeErweima = res.data.message;
                                    let routerData = this.$router.resolve({
                                        path: "/applyText",
                                        query: { htmls: res.data.message }
                                    });
                                    url = res.data.message; //打开新页面

                                    window.open(routerData.href, "_ blank");
                                    const div = document.createElement("div");
                                    div.innerHTML = htmls;
                                    document.body.appendChild(div);
                                    // document.forms[0].submit();
                                    this.buyShangchuanma = false;
                                    this.$confirm("是否支付完成", "提示", {
                                        confirmButtonText: "已支付",
                                        cancelButtonText: "未支付",
                                        type: "warning"
                                    })
                                        .then(() => {
                                            this.$router.go(0);
                                        })
                                        .catch(() => {
                                            this.$router.go(0);
                                        });
                                }
                            });
                    }
                ]
            });
        },
        // 选择购买推广上传码
        selectTuiguangshangchuan(index) {
            this.tuiguangShangchuanma.forEach((ele, key) => {
                if (key == index) {
                    ele.active = true;
                    this.codeExercisePrice = ele.codeExercisePrice;
                } else {
                    ele.active = false;
                }
            });
            this.wannengShangchuanma.forEach((ele, key) => {
                ele.active = false;
            });
            this.zhifuType.forEach((ele, key) => {
                ele.active = false;
            });
        },
        // 选择购买万能上传码
        selectWannengshangchuan(index) {
            this.wannengShangchuanma.forEach((ele, key) => {
                if (key == index) {
                    ele.active = true;
                    this.codeExercisePrice = ele.codeExercisePrice;
                } else {
                    ele.active = false;
                }
            });
            this.tuiguangShangchuanma.forEach((ele, key) => {
                ele.active = false;
            });
            this.zhifuType.forEach((ele, key) => {
                ele.active = false;
            });
        },
        handleSizeChange(val) {
            this.defaultPagecount = val;
            this.getData(this.defaultPage, this.defaultPagecount);
        },
        handleCurrentChange(val) {
            this.defaultPage = val;
            this.getData(this.defaultPage, this.defaultPagecount);
        },
        // 授权码翻页
        handleShouquanCurrentChange(val) {
            this.defaultShouquanPage = val;
            this.getShouquanma(
                this.tmpEle.id,
                this.tmpEle.uploadcode,
                this.defaultShouquanPage
            );
        },
        // 提取码翻页
        handleCurrentTiqumaChange(val) {
            this.defaultTiquPage = val;
            this.getTiquma(
                this.tmpEle.id,
                this.tmpEle.code,
                this.defaultTiquPage
            );
        },
        // 上传状态
        updatStatus(status) {
            var that = this;
            switch (status) {
                case "0":
                    return "审核中";
                    break;
                case "1":
                    return "上传失败";
                    break;
                case "2":
                    return "上传成功";
                    break;
                case "3":
                    return "上传成功";
                    break;
                default:
                    "";
                    break;
            }
        },
        // ipa状态
        ipaStatus(status) {
            switch (status) {
                case "3":
                    return "已下架";
                    break;
                case "2":
                    return "已上架";
                    break;
                case "1":
                    return "审核不通过";
                    break;
                case "0":
                    return "审核中";
                    break;
            }
        },
        // 加密方式
        encodeType(status) {
            switch (status) {
                case "0":
                    return "公开";
                    break;
                case "1":
                    return "提取码加密";
                    break;
                case "2":
                    return "授权码加密";
                    break;
                default:
                    "";
                    break;
            }
        },
        // 操作
        operateStatus(status) {
            switch (status) {
                case "1":
                    return "下架";
                    break;
                case "2":
                    return "上架";
                    break;
                case "3":
                    return "上传";
                    break;
                case "4":
                    return "编辑";
                    break;
                default:
                    "";
                    break;
            }
        },
        tiqumaOperateStatus(status) {
            switch (status) {
                case "0":
                    return "复制";
                    break;
                case "1":
                    return "撤销";
                    break;
                case "2":
                    return "已撤销";
                    break;
                default:
                    "";
                    break;
            }
        },
        // 查看提取码或者授权码
        shouBtn(status) {
            switch (status) {
                case "1":
                    return "查看提取码";
                    break;
                case "2":
                    return "查看授权码";
                    break;
                default:
                    "";
                    break;
            }
        },
        // 时间
        time(time = +new Date()) {
            var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
            return date
                .toJSON()
                .substr(0, 19)
                .replace("T", " ");
        },
        // 上传时间
        getUploadTime(date) {
            return this.time(date);
        },
        // 提取码状态
        tiqumaStatus(status) {
            switch (status) {
                case "0":
                    return "已使用";
                    break;
                case "1":
                    return "已失效";
                    break;
                default:
                    "";
                    break;
            }
        },
        shouquanmaStatus(status) {
            switch (status) {
                case "0":
                    return "未使用";
                    break;
                case "1":
                    return "已使用";
                    break;
                case "2":
                    return "已失效";
                    break;
                default:
                    "";
                    break;
            }
        },
        // 获取提取码
        getTiquma(id, code, defaultTiquPage) {
            var that = this;
            // 查看提取码
            this.$axios
                .post(
                    "https://www.ddipa.com:9090/DDApi/template/querytqcode",
                    this.$qs.stringify({
                        id: id,
                        code: code,
                        state: this.tiqumaSelected.id,
                        page: defaultTiquPage,
                        code: this.tiqumaName,
                        name: this.tiqumaUserName
                    })
                )
                .then(res => {
                    if (res.status == 200) {
                        //////console.log("res----");
                        //////console.log(res);
                        res.data.data.forEach(ele => {
                            if (ele.state == "0") {
                                ele.operate = ["0", "1"];
                            } else {
                                ele.operate = ["0", "2"];
                            }
                        });
                        that.tiqumaList = res.data.data;
                        that.tiquPageTotal = res.data.allmessage;
                    }
                });
        },
        // 获取授权码
        getShouquanma(id, code, page) {
            var that = this;
            //   查看授权码
            this.$axios
                .post(
                    "https://www.ddipa.com:9090/DDApi/template/querySqcode",
                    this.$qs.stringify({
                        id: id,
                        code: code,
                        page: page,
                        name: this.shouquanmaUserName,
                        sqcode: this.shouquanmaName,
                        state: this.shouquanmaSelected.id,
                        remarks: this.shouquanmaSelectedRemark.id
                    })
                )
                .then(res => {
                    if (res.status == 200) {
                        res.data.data.forEach(ele => {
                            if (ele.state == "0") {
                                ele.operate = ["0", "1"];
                            } else {
                                ele.operate = ["0", "2"];
                            }
                        });
                        that.shouquanmaList = res.data.data;
                        that.shouquanPageTotal = res.data.allmessage;
                    }
                });
        },
        // 展开提取码或者授权码
        showMa(ele, name, state, status) {
            var that = this;
            this.tmpEle = ele;
            if (status == "1") {
                this.showTiquma = true;
                this.showShouquanma = false;
                this.tiquMoldMsg = {
                    name,
                    ipaStatus: this.ipaStatus(state)
                };
                this.getTiquma(ele.id, ele.code, this.defaultTiquPage);
            } else {
                this.showShouquanma = true;
                this.showTiquma = false;
                this.shouquanmaMoldMsg = {
                    name,
                    ipaStatus: this.ipaStatus(state)
                };
                this.getShouquanma(
                    ele.id,
                    ele.uploadcode,
                    this.defaultShouquanPage
                );
            }
        },
        // 提取码的复制,撤销操作
        tiqumaOperate(ele, item) {
            if (item == "0") {
                var ele = document.getElementById(
                    ele.code ? ele.code + ele.id : ele.sqcode + ele.id
                );
                ele.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                alert("复制成功！");
            } else if (item == "1") {
                if (ele.sqcode) {
                    this.$axios
                        .post(
                            "https://www.ddipa.com:9090/DDApi/updateTemplate/updateSqcode",
                            this.$qs.stringify({ id: ele.id, state: "2" })
                        )
                        .then(res => {
                            this.getShouquanma(
                                this.tmpEle.id,
                                this.tmpEle.uploadcode,
                                this.defaultShouquanPage
                            );
                        });
                } else {
                    this.$axios
                        .post(
                            "https://www.ddipa.com:9090/DDApi/updateTemplate/updatetqcode",
                            this.$qs.stringify({ id: ele.id, state: "1" })
                        )
                        .then(res => {
                            //////console.log("res++++");
                            //////console.log(res);
                            this.getTiquma(
                                this.tmpEle.id,
                                this.tmpEle.code,
                                this.defaultTiquPage
                            );
                        });
                }
            }
        },
        // ipa操作  上传 下架 上架
        ipaOperate(item, ele) {
            var obj = {};
            for (var i in ele) {
                obj[i] = ele[i];
            }
            delete obj.operate;
            //////console.log(obj);
            if (item == "4") {
                this.$router.push(
                    "upload?id=" + ele.id + "&uploadcode=" + ele.uploadcode
                );
            } else if (item == "3") {
                //////console.log("这是上传按钮");
                this.$router.push("upload?uploadcode=" + ele.uploadcode);
            } else if (item == "2") {
                //////console.log("这是上架按钮");
                this.$axios
                    .post(
                        "https://www.ddipa.com:9090/DDApi/updateTemplate/updateIPA",
                        this.$qs.stringify({ id: ele.id, state: 2 })
                    )
                    .then(res => {
                        if (res.status == 200) {
                            //////console.log("res.data+++");
                            //////console.log(res.data);
                            this.defaultPage = 1;
                            this.defaultPagecount = 10;
                            this.getData(
                                this.defaultPage,
                                this.defaultPagecount
                            );
                        }
                    });
            } else if (item == "1") {
                //////console.log("这是下架按钮");
                this.$axios
                    .post(
                        "https://www.ddipa.com:9090/DDApi/updateTemplate/updateIPA",
                        this.$qs.stringify({ id: ele.id, state: 3 })
                    )
                    .then(res => {
                        if (res.status == 200) {
                            //////console.log("res.data+++");
                            //////console.log(res.data);
                            this.defaultPage = 1;
                            this.defaultPagecount = 10;
                            this.getData(
                                this.defaultPage,
                                this.defaultPagecount
                            );
                        }
                    });
            }
        },
        compare(property) {
            return function(a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            };
        },
        shengchengShouquanma() {
            this.$axios
                .post(
                    "https://www.ddipa.com:9090/DDApi/insetTemplate/insertSqcode",
                    this.$qs.stringify({
                        number: this.shouquanmaNumber,
                        remarks: this.shouquanmaremark.id,
                        userid: getCookie('userid'),
                        ipaid: this.tmpEle.id,
                        sccode: this.tmpEle.uploadcode
                    })
                )
                .then(res => {
                    this.getShouquanma(
                        this.tmpEle.id,
                        this.tmpEle.uploadcode,
                        this.defaultShouquanPage
                    );
                });
        },
        searchNumber() {
            this.defaultPage = 1;
            this.defaultPagecount = 10;
            this.getData(this.defaultPage, this.defaultPagecount);
        },
        searchName() {
            console.log(11111);
            this.defaultPage = 1;
            this.defaultPagecount = 10;
            this.getData(this.defaultPage, this.defaultPagecount);
        },
        searchDescribes() {
            this.defaultPage = 1;
            this.defaultPagecount = 10;
            this.getData(this.defaultPage, this.defaultPagecount);
        }
    },
    watch: {
        selectedStausSearch() {
            //////console.log(this.selectedStausSearch);
            this.defaultPage = 1;
            this.defaultPagecount = 10;
            this.getData(this.defaultPage, this.defaultPagecount);
        },
        nameSearch() {
            this.defaultPage = 1;
            this.defaultPagecount = 10;
            this.getData(this.defaultPage, this.defaultPagecount);
        },
        numberSearch() {
            this.defaultPage = 1;
            this.defaultPagecount = 10;
            this.getData(this.defaultPage, this.defaultPagecount);
        },
        selectedTypeSearch() {
            this.defaultPage = 1;
            this.defaultPagecount = 10;
            console.log(this.selectedTypeSearch);
            this.getData(this.defaultPage, this.defaultPagecount);
        },
        selectedEncodeSearch() {
            this.defaultPage = 1;
            this.defaultPagecount = 10;
            this.getData(this.defaultPage, this.defaultPagecount);
        },
        selectedipaStatusSearch() {
            this.defaultPage = 1;
            this.defaultPagecount = 10;
            this.getData(this.defaultPage, this.defaultPagecount);
        },
        tiqumaName() {
            //////console.log(this.tiqumaName);
            this.getTiquma(
                this.tmpEle.id,
                this.tmpEle.code,
                this.defaultTiquPage
            );
        },
        tiqumaSelected() {
            //////console.log(this.tiqumaSelected.id);
            this.getTiquma(
                this.tmpEle.id,
                this.tmpEle.code,
                this.defaultTiquPage
            );
        },
        tiqumaUserName() {
            //////console.log(this.tiqumaUserName);
            this.getTiquma(
                this.tmpEle.id,
                this.tmpEle.code,
                this.defaultTiquPage
            );
        },
        shouquanmaUserName() {
            this.getShouquanma(
                this.tmpEle.id,
                this.tmpEle.uploadcode,
                this.defaultShouquanPage
            );
        },
        shouquanmaName() {
            this.getShouquanma(
                this.tmpEle.id,
                this.tmpEle.uploadcode,
                this.defaultShouquanPage
            );
        },
        shouquanmaSelected() {
            this.getShouquanma(
                this.tmpEle.id,
                this.tmpEle.uploadcode,
                this.defaultShouquanPage
            );
        },
        shouquanmaSelectedRemark() {
            this.getShouquanma(
                this.tmpEle.id,
                this.tmpEle.uploadcode,
                this.defaultShouquanPage
            );
        }
    },
    created() {
        var that = this;
        //   购买授权码
        this.$axios
            .get("https://www.ddipa.com:9090/DDApi/code/getCodeList")
            .then(res => {
                if (res.status == 200) {
                    var tuiguangShangchuanma = [];
                    var wannengShangchuanma = [];
                    res.data.data.forEach((ele, index) => {
                        if (ele.codeType == "0") {
                            tuiguangShangchuanma.push(ele);
                        } else {
                            wannengShangchuanma.push(ele);
                        }
                    });
                    tuiguangShangchuanma
                        .sort(this.compare("codeNumber"))
                        .forEach((ele, index) => {
                            ele.active = false;
                            if (index == 0) {
                                ele.active = true;
                                this.codeExercisePrice = ele.codeExercisePrice;
                            }
                        });
                    wannengShangchuanma
                        .sort(this.compare("codeNumber"))
                        .forEach((ele, index) => {
                            ele.active = false;
                            // if (index == 0) {
                            //     ele.active = true;
                            // }
                        });
                    this.tuiguangShangchuanma = tuiguangShangchuanma;
                    this.wannengShangchuanma = wannengShangchuanma;
                }
            });
        this.getData(this.defaultPage, this.defaultPagecount);
    }
};
</script>

<style lang="scss" scoped>
.table_condition {
    width: 100%;
    height: 100px;
    background: #fafafa;
    padding: 20px 0;
    margin-top: 30px;
    .condition_title {
        text-align: center;
        color: #b3b3b3;
    }

    .width_set {
        width: 120px;
    }
    .select_width {
        width: 100%;
    }
}
table {
    tr {
        border-bottom: 1px solid #e6e6e6;
        color: #4d4d4d;
        // padding: 30px 14px;
        td {
            padding: 20px 0;
            font-size: 14px;
            width: 120px;
            text-align: center;
            display: inline-block;
            div {
                min-height: 20px;
            }
        }
        .update_status.fail {
            color: #f95050;
        }
        .update_status.green {
            color: #27bb3c;
        }
        .update_status.gray {
            color: #999999;
        }
        .update_status.blue {
            color: #4ba3f3;
        }
        .time {
            div {
                height: 38px;
            }
        }
        .des {
            div {
                height: 20px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .is_tiquma.active {
            color: #4ba3f3;
        }
        .operate {
            span.edit {
                color: #4ba3f3;
            }
            span.up {
                color: #22b93f;
            }
            span.down {
                color: #f95050;
            }
            span.add_margin {
                margin-right: 16px;
            }
            span.fuzhi {
                color: #4ba3f3;
            }
            span.chexiao {
                color: #f95050;
            }
            span.yichexiao {
                color: #999999;
            }
        }
    }
    tr.no_border {
        border: 0;
    }
}
.gather {
    height: 60px;
    background: #fafafa;
    width: 100%;
    color: #b3b3b3;
    font-size: 14px;
    padding: 0 18px;
    line-height: 60px;
    letter-spacing: 2px;
}
.page_container {
    padding: 20px 18px;
    .export {
        width: 210px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #4ba3f3;
        font-size: 14px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(75, 163, 243, 1);
        user-select: none;
    }
    .page {
        color: #4d4d4d;
    }
}
.see_tiquma {
    position: fixed;
    top: 50px;
    left: 50%;
    margin-left: -360px;
    width: 720px;
    height: 710px;
    background: #fff;
    border: 1px solid rgba(230, 230, 230, 1);
    .see_tiquma_title_wrap {
        line-height: 40px;
        width: 100%;
        background: #f2f2f2;
        color: #333333;
        font-size: 16px;
        text-align: center;
        position: relative;
        img {
            width: 12px;
            position: absolute;
            right: 20px;
            top: 12px;
        }
    }
    .current_ipa {
        padding: 30px 50px 0;
        line-height: 30px;
        color: #333333;
        font-size: 16px;
    }
    .table_condition {
        .width_set {
            width: 25%;
        }
    }
    .tiqu_table {
        width: 100%;
        td {
            width: 25%;
            padding: 8px 0;
        }
        .number {
            input {
                font-size: 14px;
                text-align: center;
            }
        }
    }
    .page {
        position: absolute;
        bottom: 20px;
        display: flex;
        justify-content: center;
        width: 100%;
    }
}
.see_shouquan {
    position: fixed;
    top: 50px;
    left: 50%;
    margin-left: -360px;
    width: 720px;
    height: 710px;
    background: #fff;
    border: 1px solid rgba(230, 230, 230, 1);
    z-index: 10;
    .see_tiquma_title_wrap {
        line-height: 40px;
        width: 100%;
        background: #f2f2f2;
        color: #333333;
        font-size: 16px;
        text-align: center;
        position: relative;
        img {
            width: 12px;
            position: absolute;
            right: 20px;
            top: 12px;
        }
    }
    .current_ipa {
        padding: 30px 50px 0;
        line-height: 30px;
        color: #333333;
        font-size: 16px;
        .onkey_wrap {
            margin-top: 15px;
            display: flex;
            input {
                display: block;
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                border: 1px solid #e6e6e6;
                padding-left: 20px;
                margin-top: 5px;
                margin-right: 10px;
            }
            input::-webkit-input-placeholder {
                color: #cccccc;
            }
            input::-moz-placeholder {
                /* Mozilla Firefox 19+ */
                color: #cccccc;
            }
            input:-moz-placeholder {
                /* Mozilla Firefox 4 to 18 */
                color: #cccccc;
            }
            input:-ms-input-placeholder {
                /* Internet Explorer 10-11 */
                color: #cccccc;
            }
            .input1 {
                width: 200px;
            }
            .input2 {
                width: 250px;
                margin-left: 8px;
                margin-right: 10px;
            }
            button {
                width: 150px;
                height: 40px;
                background: rgba(75, 163, 243, 1);
                font-size: 16px;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                line-height: 40px;
                margin-top: 5px;
                margin-left: 10px;
            }
        }
    }
    .table_condition {
        .width_set {
            width: 20%;
        }
    }
    .tiqu_table {
        width: 100%;
        td {
            width: 20%;
            padding: 8px 0;
        }
        .number {
            input {
                font-size: 14px;
                text-align: center;
            }
        }
    }
    .page {
        position: absolute;
        bottom: 20px;
        display: flex;
        justify-content: center;
        width: 100%;
    }
    .colorBg {
        height: 670px;
        background: #fcfcfc;
    }
    .account {
        padding: 10px 100px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        div {
            font-size: 18px;
        }
    }
    .tuiguang_shangchuanma {
        padding: 0 68px 22px;
        border-bottom: 1px solid #e6e6e6;
        .tuiguang_title {
            padding: 0 32px;
            color: #333333;
            font-size: 15px;
        }
        .add_top_margin {
            margin-top: 20px;
        }
        .maList {
            width: 100%;
            li {
                padding: 10px 32px;
                .msg_wrap {
                    width: 130px;
                    height: 140px;
                    padding: 25px 5px 0;
                    text-align: center;
                    background-color: #fff;
                    border: 1px solid rgba(179, 179, 179, 1);
                    .average_price {
                        width: 100%;
                        border-bottom: 1px solid #cccccc;
                        .price {
                            color: #333333;
                            font-weight: bold;
                            font-size: 14px;
                            span {
                                font-size: 18px;
                            }
                        }
                        .tuiguang_content {
                            padding: 6px 0;
                            font-size: 14px;
                            color: #b3b3b3;
                        }
                    }
                    .price_wrap {
                        padding-top: 5px;
                        p {
                            font-size: 14px;
                            font-weight: bold;
                            color: rgba(179, 179, 179, 1);
                            // line-height:33px;
                        }
                        .huaxian {
                            text-decoration: line-through;
                        }
                    }
                }
                .msg_wrap.active {
                    border: 1px solid rgba(75, 163, 243, 1);
                    background-image: url(../assets/img/selected.png);
                    background-repeat: no-repeat;
                    background-position: top right;
                    background-size: 25px;
                }
            }
        }
        .zhifu_type {
            width: 100%;
            li {
                padding: 10px 32px;
                div {
                    width: 130px;
                    line-height: 32px;
                    text-align: center;
                    background-color: #fff;
                    border: 1px solid rgba(179, 179, 179, 1);
                }
                div.active {
                    border: 1px solid rgba(75, 163, 243, 1);
                    background-image: url(../assets/img/selected.png);
                    background-repeat: no-repeat;
                    background-position: top right;
                    background-size: 25px;
                }
            }
        }
    }
    .no_border {
        border: 0;
    }
}
</style>


