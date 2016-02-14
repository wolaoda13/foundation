<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script type="text/javascript">
	var ctx = '${ctx}';
</script>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="zh-CN">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="format-detection" content="telephone=no"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0" />
<title>
</title>
<meta name="description" content="" />
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<c:set var="ctxStatic" value="${pageContext.request.contextPath}/static"/>
<script type="text/javascript" src="${ctxStatic}/jquery/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="${ctxStatic}/jquery/jquery.cookie.js"></script>
<script type="text/javascript" src="${ctxStatic}/app/js/main.js"></script>
<script type="text/javascript" src="${ctxStatic}/app/js/zepto.min.js"></script>
<link type="text/css" rel="stylesheet" href="${ctxStatic}/app/css/detail.css"  />
<script type="text/javascript" src="${ctxStatic}/layer/layer.js"></script>
</head>
<body> 
<div class="head0">
    <div class="head" style="position:relative;">  
        <div class="w center">
            <a class="hdbtnl2" href="javascript:index.toIndex()" title="首页"></a>
            <a class="hdbtnlogo" href="javascript:index.toIndex()""  title="麦淘亲子游"></a>
            <a class="hdbtnr2" href="javascript:window.location.href='${ctx }/indexAction.do?method=toMine'"  title="个人中心"></a>
        </div>
    </div>
</div>

<div class="body">

	<c:choose>
	   <c:when test="${empty activityInfo}">
	   		无记录
	   </c:when>
	   <c:otherwise>
		    <div class="img0">
		        <div>
		            <img src="${activityInfo.activityphoto }"  />
		        </div>
		        <i class="picnum">1/1</i>
		    </div>
		    <div class="d-tit botl bgf">
		        <h2 class="f20">${activityInfo.activityname }</h2>
		        <p>
		            <i class="dw"></i><i class="money">68</i><i class="dw">起</i>
		            <i class="right red">活动报名中</i>
		        </p>
		    </div>
		        <input type="hidden" id="activityId" name="activityId" value="${activityInfo.id }">
		        <input type="hidden" id="signEndTime" name="signEndTime" value="${activityInfo.signendtime }">
		    <div id="dtags" class="bgfbox mt10">
		    	<div class="ico ico1 botl">${activityInfo.activityage }</div>
		    	<div class="ico ico2 botl">${activityInfo.activitytime }</div>
		    	<div class="ico ico3">${activityInfo.activityplace }</div>
		    
		    </div>
		    <div class="bgfbox mt10 zoom pnbox r2 ">
		        <a href="../partner/O0901505131023041713.htm" >组织方：${activityInfo.activitysponsor }</a>
		    </div>
		    <div id="dtaoc" class="bgf"></div>
		
		    <div class="h44 mt10">
		        <div class="dtab zoom">
		            <div class="w bgf">
		            <a id="da0" class="act" href="javascript:void(0)" onclick="indexdetail.replaceMenu('da0','ddiv0')">详情</a>
		            <a id="da1" href="javascript:void(0)" onclick="indexdetail.replaceMenu('da1','ddiv1');indexdetail.getReplyData();" >评价（<span id="cmtcnt">${replyNum }</span>）</a>
		            </div>
		        </div> 
		    </div>
		    <div id="ddiv0">
		        <div id="ddesc" class="bgf botl">
		            <div id="dcon">
						${activityInfo.activitycontent }
					</div>
		        </div>
		        <div class="bgf topl mt10">
		            <div class="d-pad1">免责声明</div>
		            <div class="bgfbox con">
		                <p>1. “麦淘亲子游”第三方网络平台作为第三方技术提供者，仅为活动组织者及平台用户双方提供网络平台服务及相应的技术维护与支持。</p>
		                <p>2. 平台上所展示的所有产品，均由该活动组织者直接提供活动安排及服务。</p>
		                <p>3. “麦淘亲子游”作为第三方平台对平台上发布的任何产品、活动、服务，或进行的交易进程，不作任何担保</p>
		                <p>4. 其它应知事项和条款，请详细阅读<a href="../plus/terms.htm" tppabs="http://m.maitao.com/plus/terms">《用户须知》</a>。</p>
		            </div>
		        </div>
		       
		    </div>
		    <div id="ddiv1" class="bgf botl none">
		        <div class="botl none" style="padding: 30px;">
		            <table style="margin: 0 auto;">
		                <tbody>
		                    <tr>
		                        <td>整体评分</td>
		                        <td><i class="score1"><i class="score2" style="width:-2%;"></i></i></td>
		                        <td>0</td>
		                    </tr>
		                </tbody>
		            </table>
		        </div>
		        <div class="dcmtbox" id="detailReplyId"> 
  				</div>
		    </div>
		
		</c:otherwise>
	</c:choose>
</div>
<%@include file="/WEB-INF/views/include/app_footer.jsp" %>
<div class="bot-btn">
    <div class="w">
        <div id="signButton"></div>
    </div>
</div>
<i class="totop none" onclick="mt.t.top(0)"></i>


</body>

<script type="text/javascript" src="${ctxStatic}/app/js/indexdetail.js"></script>
<script type="text/javascript" src="${ctxStatic}/app/js/detail.js"></script>
</html>