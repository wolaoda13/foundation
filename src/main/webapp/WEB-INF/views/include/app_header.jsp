<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<c:set var="ctxStatic" value="${pageContext.request.contextPath}/static"/>
<script type="text/javascript">
	var ctx = '${ctx}';
</script>
<link type="text/css" href="${ctxStatic}/app/css/main.css" rel="stylesheet"/>
<script type="text/javascript" src="${ctxStatic}/jquery/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="${ctxStatic}/jquery/jquery.formFill.js"></script>
<script type="text/javascript" src="${ctxStatic}/jquery/jquery.form.js"></script>
<script type="text/javascript" src="${ctxStatic}/jquery/jquery.cookie.js"></script>
<script type="text/javascript" src="${ctxStatic}/app/js/main.js"></script>
<script type="text/javascript" src="${ctxStatic}/app/js/zepto.min.js"></script>
