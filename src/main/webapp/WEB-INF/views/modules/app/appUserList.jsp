<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
	<title>客户管理</title>
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
		<li class="active"><a href="${ctx}/app/appUser/">客户列表</a></li>
		<shiro:hasPermission name="app:appUser:edit"><li><a href="${ctx}/app/appUser/form">客户添加</a></li></shiro:hasPermission>
	</ul>
	<form:form id="searchForm" modelAttribute="appUser" action="${ctx}/app/appUser/" method="post" class="breadcrumb form-search">
		<input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
		<input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>
		<ul class="ul-form">
			<li><label>昵称：</label>
				<form:input path="displayname" htmlEscape="false" maxlength="255" class="input-medium"/>
			</li>
			<li><label>电话号码：</label>
				<form:input path="phone" htmlEscape="false" maxlength="255" class="input-medium"/>
			</li>
			<li><label>邮箱地址：</label>
				<form:input path="mail" htmlEscape="false" maxlength="255" class="input-medium"/>
			</li>
			<li class="btns"><input id="btnSubmit" class="btn btn-primary" type="submit" value="查询"/></li>
			<li class="clearfix"></li>
		</ul>
	</form:form>
	<sys:message content="${message}"/>
	<table id="contentTable" class="table table-striped table-bordered table-condensed">
		<thead>
			<tr>
				<th>昵称</th>
				<th>电话号码</th>
				<th>邮箱地址</th>
				<shiro:hasPermission name="app:appUser:edit"><th>操作</th></shiro:hasPermission>
			</tr>
		</thead>
		<tbody>
		<c:forEach items="${page.list}" var="appUser">
			<tr>
				<td><a href="${ctx}/app/appUser/form?id=${appUser.id}">
					${appUser.displayname}
				</a></td>
				<td>
					${appUser.phone}
				</td>
				<td>
					${appUser.mail}
				</td>
				<shiro:hasPermission name="app:appUser:edit"><td>
    				<a href="${ctx}/app/appUser/form?id=${appUser.id}">修改</a>
					<a href="${ctx}/app/appUser/delete?id=${appUser.id}" onclick="return confirmx('确认要删除该客户后台代码生成吗？', this.href)">删除</a>
				</td></shiro:hasPermission>
			</tr>
		</c:forEach>
		</tbody>
	</table>
	<div class="pagination">${page}</div>
</body>
</html>