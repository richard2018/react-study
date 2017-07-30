import Request from "util/ajax/request";

var CommonFunc = function(){};

CommonFunc.Tip = function(text){
    $("#errorText").html(text);
    $("#errorShow").show();
    setTimeout(function(){
        $("#errorText").html("");
        $("#errorShow").hide();
    },2000);
};

CommonFunc.Pay = function(orderCost,advicePrice,itemName,payNo){
    var params={};
    Request.post("/acctInfo/getAcctInfo",params).then(function (data) {
        if(Number(orderCost)<=Number(data.balance)){
            var params={};
            params.payMoney = advicePrice;
            params.itemName = itemName;
            params.payNo = payNo;

            Request.post("/pay/payTrade",params).then(function (res) {
                var payInfoObject =  {
                    "appId":res.appId,     //公众号名称，由商户传入
                    "timeStamp":res.timeStamp,         //时间戳，自1970年以来的秒数
                    "nonceStr" :res.nonceStr, //随机串
                    "package" : res.package,
                    "signType": "MD5",         //微信签名方式：
                    "paySign": res.paySign //微信签名
                };
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',payInfoObject,
                    function(res){
                        if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                            var params={};
                            params.payNo = payNo;
                            //微信支付进行付款成功之后先查询下订单状态再进行payBill
                            Request.post("/pay/orderQuery",params).then(function (res) {
                                if(res.tradeState=="SUCCESS"){
                                    var params={};
                                    params.billiId = payNo;

                                    Request.post("/pay/payBill",params).then(function (res) {
                                        if(res.payState == 1){
                                            window.location.href = "#/order/success/"+advicePrice+"/"+res.rechargeAccount+"/"+res.orderTime+"/"+res.billId;
                                        }
                                    }).fail(function (data) {
                                        if (data.result == 'fail') {
                                            CommonFunc.Tip(data.msg);
                                        } else {
                                            CommonFunc.Tip("系统异常，请稍后再试！");
                                        }
                                    });
                                }
                            }).fail(function (data) {
                                if (data.result == 'fail') {
                                    CommonFunc.Tip(data.msg);
                                } else {
                                    CommonFunc.Tip("系统异常，请稍后再试！");
                                }
                            });
                        } else {
                            if(res.err_msg == 'get_brand_wcpay_request:fail'){
                                CommonFunc.Tip("支付失败!");
                            }else {
                                CommonFunc.Tip("您取消了支付");
                            }
                        } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    }
                );
            }).fail(function (data) {
                if (data.result == 'fail') {
                    CommonFunc.Tip(data.msg);
                } else {
                    CommonFunc.Tip("系统异常，请稍后再试！");
                }
            });
        }else {
            CommonFunc.Tip("平台账户余额不足");
        }
    }).fail(function (data) {
        CommonFunc.Tip("平台账户余额不足");
    });
};

module.exports = CommonFunc;

