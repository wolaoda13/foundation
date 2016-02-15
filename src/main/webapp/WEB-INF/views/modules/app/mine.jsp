<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="zh-CN">
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta name="format-detection" content="telephone=no" /><title>
	我的 - 麦淘亲子游
</title>
<script type="text/javascript">
    var is_low = navigator.userAgent.toLowerCase().indexOf('android') != -1;
    var _ww = (window.screen.availWidth * (window.devicePixelRatio || 1.5) / 1);
    if (is_low && _ww < 720) {
        document.writeln('<meta name="viewport" content="width=750px,target-densitydpi=device-dpi,user-scalable=yes,initial-scale=0.5" />');
    } else {
        document.writeln('<meta name="viewport" content="width=750px,target-densitydpi=device-dpi,user-scalable=no" />');
    } 
</script>
<meta name="keywords" content="麦淘亲子游,周末去哪儿玩,亲子活动,带孩子一起玩,陪孩子一起成长" />
<%@include file="/WEB-INF/views/include/app_header.jsp" %>
<script type="text/javascript">
    if (_ww < 750) {
        document.writeln('<link rel="stylesheet" type="text/css" href="/content/style/low.css?1.38" />');
    }
</script>

<style type="text/css">
    .foot { display:none; }
</style>

    <style type="text/css">
        .body { padding-bottom:0; }
        .accitem { background-color:#fff; }
        .invite .dot { top:4px; }
        .utr11 .money {font-size: 30px; font-weight: normal; background-position-y: 5px; background-size: 12px auto; }
    </style>

</head>
<body class="">


    <div class="head0">
<div class="head">
    <i class="hdbtnl hide"></i><i class="hdlogo"></i>
    <i onclick="index.toIndex()" class="hdbtnr hd_home"></i>
</div>
    </div>
<div class="body">



<div class="acchomehd center">
<div>
    <p><img class="avatar goto" src="${ctx }/upload/${userInfo.photo }" /></p>
    <p><a id="hnick" class="f34" href="${ctx }/indexAction.do?method=toEdit">鹏哥</a></p>
    <p id="ptag" style="padding:6px 0;"></p>
    <!-- <a class="invite f24" href="/acc/fcode/U0611512170900395606">邀请有礼</a> -->
</div>
</div>
<div class="meod bgf zoom botl f24 center">
    <div><i class="meod1" data-href="/acc/orders/0"></i><b>待付款订单</b></div>
    <div><i class="meod2" data-href="/acc/orders/1"></i><b>未出行订单</b></div>
    <div><i class="meod3" data-href="/acc/orders/2"></i><b>待评价订单</b></div>
    <div><i class="meod4" data-href="/acc/orders/3"></i><b>已完成订单</b></div>
</div>
<div class="botl" style="margin-top:20px;"></div>
<div class="utr r2"><a class="utr7" href="/acc/notify">我的通知</a></div>

<div class="botl" style="margin-top:20px;"></div>
<div class="utr r2"><a class="utr3" href="/acc/actmark">我的收藏</a></div>
<div class="utr r2"><a class="utr4" href="/acc/coupon">优惠券</a></div>
<div class="utr r2"><a class="utr11" href="/acc/balance">帐户余额</a></div>
<div class="utr r2"><a class="utr14" href="/acc/score">我的积分</a></div>
<div class="utr r2"><a class="utr5" href="/acc/traveler">常用出行人</a></div>

<div class="botl" style="margin-top:20px;"></div>
<div class="utr r2"><a class="utr10" href="/plus/about">关于麦淘</a></div>
<br /><br />
<div class="btn-red">退出帐号</div>



<%@include file="/WEB-INF/views/include/app_footer.jsp" %>
</div>
<i class="totop none" onclick="mt.t.top(0)"></i>

</body>
</html>
