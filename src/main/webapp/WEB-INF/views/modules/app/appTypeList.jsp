<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
	<title>类别管理</title>
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
		<li class="active"><a href="${ctx}/app/appType/">类别列表</a></li>
		<shiro:hasPermission name="app:appType:edit"><li><a href="${ctx}/app/appType/form">类别添加</a></li></shiro:hasPermission>
	</ul>
	<form:form id="searchForm" modelAttribute="appType" action="${ctx}/app/appType/" method="post" class="breadcrumb form-search">
		<input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
		<input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>
		<ul class="ul-form">
			<li><label>类别名称：</label>
				<form:input path="typename" htmlEscape="false" maxlength="255" class="input-medium"/>
			</li>
			<li class="btns"><input id="btnSubmit" class="btn btn-primary" type="submit" value="查询"/></li>
			<li class="clearfix"></li>
		</ul>
	</form:form>
	<sys:message content="${message}"/>
	<table id="contentTable" class="table table-striped table-bordered table-condensed">
		<thead>
			<tr>
				<th>类别名称</th>
				<shiro:hasPermission name="app:appType:edit"><th>操作</th></shiro:hasPermission>
			</tr>
		</thead>
		<tbody>
		<c:forEach items="${page.list}" var="appType">
			<tr>
				<td><a href="${ctx}/app/appType/form?id=${appType.id}">
					${appType.typename}
				</a></td>
				<shiro:hasPermission name="app:appType:edit"><td>
    				<a href="${ctx}/app/appType/form?id=${appType.id}">修改</a>
					<a href="${ctx}/app/appType/delete?id=${appType.id}" onclick="return confirmx('确认要删除该类别吗？', this.href)">删除</a>
				</td></shiro:hasPermission>
			</tr>
		</c:forEach>
		</tbody>
	</table>
	<div class="pagination">${page}</div>
</body>
</html>