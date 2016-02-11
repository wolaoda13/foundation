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
		<li class="active"><a href="${ctx}/app/appCity/">城市列表</a></li>
		<shiro:hasPermission name="app:appCity:edit"><li><a href="${ctx}/app/appCity/form">城市添加</a></li></shiro:hasPermission>
	</ul>
	<form:form id="searchForm" modelAttribute="appCity" action="${ctx}/app/appCity/" method="post" class="breadcrumb form-search">
		<input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
		<input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>
		<ul class="ul-form">
			<li><label>城市名称：</label>
				<form:input path="cityname" htmlEscape="false" maxlength="255" class="input-medium"/>
			</li>
			<li class="btns"><input id="btnSubmit" class="btn btn-primary" type="submit" value="查询"/></li>
			<li class="clearfix"></li>
		</ul>
	</form:form>
	<sys:message content="${message}"/>
	<table id="contentTable" class="table table-striped table-bordered table-condensed">
		<thead>
			<tr>
				<th>城市名称</th>
				<shiro:hasPermission name="app:appCity:edit"><th>操作</th></shiro:hasPermission>
			</tr>
		</thead>
		<tbody>
		<c:forEach items="${page.list}" var="appCity">
			<tr>
				<td><a href="${ctx}/app/appCity/form?id=${appCity.id}">
					${appCity.cityname}
				</a></td>
				<shiro:hasPermission name="app:appCity:edit"><td>
    				<a href="${ctx}/app/appCity/form?id=${appCity.id}">修改</a>
					<a href="${ctx}/app/appCity/delete?id=${appCity.id}" onclick="return confirmx('确认要删除该城市吗？', this.href)">删除</a>
				</td></shiro:hasPermission>
			</tr>
		</c:forEach>
		</tbody>
	</table>
	<div class="pagination">${page}</div>
</body>
</html>