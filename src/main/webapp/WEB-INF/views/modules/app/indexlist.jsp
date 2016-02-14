<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="zh-CN">
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta name="format-detection" content="telephone=no" />
<title>
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
        document.writeln('<link rel="stylesheet" type="text/css" href="../../content/style/low.css-1.38" />');
    }
</script>
<meta name="description" content="麦淘亲子游是中国最大的儿童体验式成长平台，为3 -12岁的孩子打造 “童趣学院”，通过一系列 “特色课程”：如，博物馆奇妙夜、职业体验、小童军和麦淘公益等，让孩子在游玩中探索世界、感知快乐、学会合作。" />
<style type="text/css">
    .head { border-bottom:none; }
</style>
</head>

<input type="hidden" id="activityType" value="${activityType }">
<input type="hidden" id="cityId" value="${cityId }">
<body class="">


    <div class="head0">
<div class="head">
    <i class="hdbtnl hdbtnl2"></i>
    <i class="hdlogo"></i>
    <i class="hdbtnr hdbtnsc"></i>
</div>
    </div>
<div class="body">
<div class="hdcalbody none">
    <div id="calbox" class="w"><div id="calbox2"></div></div>
</div>

<div id="activityList">


</div>
<div id="moreButton" class="center c9 d-pad1"><a class="btn" href="javascript:void(0)" onclick="indexlist.getMore()" >加载更多</a></div>
<div class="nodata none">
    <p>欧欧，没有找到相关结果哦~</p>
</div>
<input type="hidden" id="limitStart" name="limitStart" value="0">
<!-- 
<div class="listbot w fixed h88">
    <i class="left v2icon ltbtn1">综合排序</i>
    <i class="right v2icon ltbtn3">筛选<em class="dot"></em></i>
    <i class="right ltbtn2" data-val="2">按销量排序</i>
</div>
<div class="lbsortd slidebot w fixed">
    <p data-val="1">按距离排序</p>
    <p data-val="3">按价格排序</p>
    <p data-val="4">最新发布</p>
    <p data-val="0">综合排序</p>
</div>
 
<div class="lbfilter w fixed none">
    <div class="zoom t-right lbft bgf botl">
        <i class="ic-close"></i>
        <i class="clear c9">清空筛选</i>
    </div>
    <div class="lbfc zoom">
        <div class="lbfcl center left"></div>
        <div class="lbfcr bgf right"></div>
    </div>
    <div class="btn-red h88">确 定</div>
</div>
-->

<%@include file="/WEB-INF/views/include/app_footer.jsp" %>
</div>
<i class="totop none" onclick="mt.t.top(0)"></i>

</body>
<script type="text/javascript" src="${ctxStatic}/app/js/list.js"></script>
<script type="text/javascript" src="${ctxStatic}/app/js/hm.js"></script>
<script type="text/javascript" src="${ctxStatic}/app/js/indexlist.js"></script>
</html>
