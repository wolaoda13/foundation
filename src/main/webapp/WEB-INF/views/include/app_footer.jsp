<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<script type="text/javascript">
	toIndexList = function(activityType) {
		window.location.href = ctx
				+ "/indexAction.do?method=toIndexList&activityType="
				+ activityType + "&cityId=" + $.cookie("cityId");
	}
</script>
<div class="foot f12 c9 w center ">
	<p>
		<a href="${ctx }/web/index.jsp">首页</a>| <a
			href="javascript:toIndexList('1')">市内活动</a>| <a
			href="javascript:toIndexList('2')">周边郊游</a>| <a
			href="javascript:toIndexList('3')">长途旅行</a>| <a
			href="javascript:toIndexList('4')">儿童乐园</a>
	</p>
	<p>
		<i>Copyright &copy;2015 上海麦亲信息科技有限公司</i><a
			href="javascript:if(confirm(%27http://www.miitbeian.gov.cn/  \n\nThis file was not retrieved by Teleport Ultra, because it is addressed on a domain or path outside the boundaries set for its Starting Address.  \n\nDo you want to open it from the server?%27))window.location=%27http://www.miitbeian.gov.cn/%27"
			tppabs="http://www.miitbeian.gov.cn/">沪ICP备15008110号-1</a>
	</p>
</div>