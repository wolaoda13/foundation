<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="zh-CN">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="format-detection" content="telephone=no" />
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
<script src="${ctxStatic}/app/js/index.js"></script>
<script type="text/javascript">
    if (_ww < 750) {
        document.writeln('<link rel="stylesheet" type="text/css" href="content/style/low.css-1.38" />');
    }
</script>

    <meta name="description" content="麦淘亲子游是中国最大的儿童体验式成长平台，为3 -12岁的孩子打造 “童趣学院”，通过一系列 “特色课程”：如，博物馆奇妙夜、职业体验、小童军和麦淘公益等，让孩子在游玩中探索世界、感知快乐、学会合作。" />
    <style type="text/css">
        .head { background: #4BBD7E; border-bottom: none; color: #fff; }
		.hdbtnl { background-image: url(${ctxStatic}/app/images/down.png); }
		.hdlogo2 { background: url(${ctxStatic}/app/images/line.png) no-repeat left 54px rgba(75,189,127,1); background-size: 410px auto; }
		.hdlogo2 .put0 { background: rgba(75,189,127,1); color: #a5debf; }
		.hdlogo2 .scbtn { background-image: url(${ctxStatic}/app/images/find.png); }
    </style>
</head>
<body class="">


    <div class="head0">
<div class="head">
    <i class="hdbtnl hide">长春</i>
    <i class="hdlogo"></i>
    <i class="hdbtnr" ></i>
    <div class="mcity none">
        <p class="c6 f26 botl">已开通城市</p>
        <div id="cityList"></div>
        
        <p class="center c6 f26">更多城市即将开通</p>
    </div>
    <div class="menu none">
        <a class="menu1" href="index.htm" >首页</a>
        <a class="menu2" href="" >我的</a>
    </div>
</div>
    </div>
<div class="body">


<div class="h2btns bgf botl"><div>
<i onclick="index.toIndexList('1')" style="background-image: url(${ctxStatic}/app/images/sdistance.png);"></i>
<a href="javascript:index.toIndexList('1')" >市内活动</a>
</div><div>
<i onclick="index.toIndexList('2')" style="background-image: url(${ctxStatic}/app/images/mdistance.png);"></i>
<a href="javascript:index.toIndexList('2')" >周边郊游</a>
</div><div>
<i onclick="index.toIndexList('3')" style="background-image: url(${ctxStatic}/app/images/ldistance.png);"></i>
<a href="javascript:index.toIndexList('3')" >长途旅行</a>
</div><div>
<i onclick="index.toIndexList('4')" style="background-image: url(${ctxStatic}/app/images/babyactivity.png);"></i>
<a href="javascript:index.toIndexList('4')" >童趣学院</a>
</div></div>
<div class="bgfbox homed1">
   <div class="zoom bansmall botl">
		<div id="hotFirst">
		</div>
		<div id="hotSecond">
		</div>
	</div>
</div>
<div id="activityList" class="topl mt20">
</div>



<%@include file="/WEB-INF/views/include/app_footer.jsp" %>
</div>
<i class="totop none" onclick="mt.t.top(0)"></i>
</body>
</html>
