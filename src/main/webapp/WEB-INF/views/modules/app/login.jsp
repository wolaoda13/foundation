<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="zh-CN">
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta name="format-detection" content="telephone=no" /><title>
	登录
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
<script type="text/javascript" src="${ctxStatic}/layer/layer.js"></script>
<script type="text/javascript">
    if (_ww < 750) {
        document.writeln('<link rel="stylesheet" type="text/css" href="../content/style/low.css-1.38" />');
    }
</script>

</head>
<body class="">


    <div class="head0">
<div class="head">
    <i class="hdbtnl hdbtnl2">上海</i><i class="hdlogo"></i><i class="loginhdbtnr2"></i>
    
    <div class="menu none">
        <a class="menu1" href="../index.htm" >首页</a>
        <a class="menu2" href="login-from=-acc-home.htm" >我的</a>
    </div>
</div>
    </div>
<div class="body">

<div class="pagebox">
    <div class="pages">
        <div class="page lpage">

<div class="ldiv">
<div class="pad30_lr">
<div style="padding:80px 0;"></div>
<div class="logmitem">
    <input type="text" name="ui_username" id="ui_username" class="put0 put01 logmitem" maxlength="11" placeholder="请输入您的账号" />
</div>
<div style="padding:20px 0;"></div>
<div class="logmitem">
    <input type="password" name="ui_password" id="ui_password" class="put0 put01 logmitem" maxlength="11" placeholder="请输入您的密码" />
</div>
<div style="padding:20px 0;"></div>
<div class="logsave transbtn" onclick="login.login()">提 交</div>
<p class="chkon f26" style="margin-left:0;">我已阅读并同意<a class="blue" href="../plus/terms.htm" >《用户须知》</a>
<a class="blue" href="${ctx }/web/register.jsp" >&nbsp;点击注册</a></p>
</div>
</div>
<div>&nbsp;</div>
        </div>
        <div class="page">
<div class="g_welcome g_welcome2">
    <p class="center">Hi, 欢迎来到麦淘大家庭！</p>
    <p class="center">快来设置昵称，让别的爸爸妈妈认识你吧~</p>
</div>
<div class="pad30_lr">
    <div class="g_nickd">
        <input id="nick" type="text" class="put0 put03 f34" placeholder="请输入昵称" />
    </div>
    <div class="logsave transbtn">创建帐号</div>
</div>
        </div>
    </div>
</div>
<script type="text/javascript">
    var gourl = '../content/scripts/detail.js';
    if (!gourl) gourl = '/acc/home';
    if ('yes' == 'yes') {
        $.get('?getk=1', function (ret) {
            window._sk = ret;
        });
    }
</script>


<%@include file="/WEB-INF/views/include/app_footer.jsp" %>
</div>
<i class="totop none" onclick="mt.t.top(0)"></i>

<script type="text/javascript" src="${ctxStatic}/app/js/hm.js"></script>
<script type="text/javascript" src="${ctxStatic}/app/js/guest.js"></script>
<script type="text/javascript" src="${ctxStatic}/app/js/login.js"></script>
</body>
</html>
