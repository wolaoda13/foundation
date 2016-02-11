<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
	<title>城市管理</title>
	<meta name="decorator" content="default"/>
	<script type="text/javascript">
		$(document).ready(function() {
			
		});
		function page(n,s){
			$("#pageNo").val(n);
			$("#pageSize").val(s);
			$("#searchForm").submit();
        	return false;
        }
	</script>
</head>
<body>
	<ul class="nav nav-tabs">
		<li class="active"><a href="${ctx}/app/appActivityinfo/">城市列表</a></li>
		<shiro:hasPermission name="app:appActivityinfo:edit"><li><a href="${ctx}/app/appActivityinfo/form">城市添加</a></li></shiro:hasPermission>
	</ul>
	<form:form id="searchForm" modelAttribute="appActivityinfo" action="${ctx}/app/appActivityinfo/" method="post" class="breadcrumb form-search">
		<input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
		<input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>
		<ul class="ul-form">
			<li><label>活动时间：</label>
				<form:input path="activitytime" htmlEscape="false" maxlength="2000" class="input-medium"/>
			</li>
			<li class="btns"><input id="btnSubmit" class="btn btn-primary" type="submit" value="查询"/></li>
			<li class="clearfix"></li>
		</ul>
	</form:form>
	<sys:message content="${message}"/>
	<table id="contentTable" class="table table-striped table-bordered table-condensed">
		<thead>
			<tr>
				<th>活动名称</th>
				<th>活动时间</th>
				<th>是否热门首页显示</th>
				<shiro:hasPermission name="app:appActivityinfo:edit"><th>操作</th></shiro:hasPermission>
			</tr>
		</thead>
		<tbody>
		<c:forEach items="${page.list}" var="appActivityinfo">
			<tr>
				<td><a href="${ctx}/app/appActivityinfo/form?id=${appActivityinfo.id}">
					${appActivityinfo.activityname}
				</a></td>
				<td>
					${appActivityinfo.activitytime}
				</td>
				<td>
					${appActivityinfo.ishot}
				</td>
				<shiro:hasPermission name="app:appActivityinfo:edit"><td>
    				<a href="${ctx}/app/appActivityinfo/form?id=${appActivityinfo.id}">修改</a>
					<a href="${ctx}/app/appActivityinfo/delete?id=${appActivityinfo.id}" onclick="return confirmx('确认要删除该城市吗？', this.href)">删除</a>
				</td></shiro:hasPermission>
			</tr>
		</c:forEach>
		</tbody>
	</table>
	<div class="pagination">${page}</div>
</body>
</html>