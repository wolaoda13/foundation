<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
	<title>城市管理</title>
	<meta name="decorator" content="default"/>
	<script type="text/javascript">
		$(document).ready(function() {
			//$("#name").focus();
			$("#inputForm").validate({
				submitHandler: function(form){
					loading('正在提交，请稍等...');
					form.submit();
				},
				errorContainer: "#messageBox",
				errorPlacement: function(error, element) {
					$("#messageBox").text("输入有误，请先更正。");
					if (element.is(":checkbox")||element.is(":radio")||element.parent().is(".input-append")){
						error.appendTo(element.parent().parent());
					} else {
						error.insertAfter(element);
					}
				}
			});
		});
	</script>
</head>
<body>
	<ul class="nav nav-tabs">
		<li><a href="${ctx}/app/appActivityinfo/">城市列表</a></li>
		<li class="active"><a href="${ctx}/app/appActivityinfo/form?id=${appActivityinfo.id}">城市<shiro:hasPermission name="app:appActivityinfo:edit">${not empty appActivityinfo.id?'修改':'添加'}</shiro:hasPermission><shiro:lacksPermission name="app:appActivityinfo:edit">查看</shiro:lacksPermission></a></li>
	</ul><br/>
	<form:form id="inputForm" modelAttribute="appActivityinfo" action="${ctx}/app/appActivityinfo/save" method="post" class="form-horizontal">
		<form:hidden path="id"/>
		<sys:message content="${message}"/>		
		<div class="control-group">
			<label class="control-label">活动名称：</label>
			<div class="controls">
				<form:input path="activityname" htmlEscape="false" maxlength="255" class="input-xlarge "/>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">活动地址：</label>
			<div class="controls">
				<form:input path="activityplace" htmlEscape="false" maxlength="255" class="input-xlarge "/>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">活动时间：</label>
			<div class="controls">
				<form:input path="activitytime" htmlEscape="false" maxlength="2000" class="input-xlarge "/>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">适合年龄：</label>
			<div class="controls">
				<form:input path="activityage" htmlEscape="false" maxlength="255" class="input-xlarge "/>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">主办方：</label>
			<div class="controls">
				<form:input path="activitysponsor" htmlEscape="false" maxlength="255" class="input-xlarge "/>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">是否热门首页显示：</label>
			<div class="controls">
				<form:input path="ishot" htmlEscape="false" maxlength="4" class="input-xlarge "/>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">所属城市：</label>
			<div class="controls">
			    <select name="cityid" id="cityid" >
				<c:forEach items="${appCityList}" var="cityInfo">
				<c:choose>
					<c:when test="${appActivityinfo.cityid == cityInfo.id }">
						<option selected="selected" value="${cityInfo.id }">${cityInfo.cityname }</option>
					</c:when>
					<c:otherwise>
						<option value="${cityInfo.id }">${cityInfo.cityname }</option>
					</c:otherwise>
				</c:choose>
				</c:forEach>
				</select>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">报名结束时间：</label>
			<div class="controls">
				<input name="signendtime" type="text" readonly="readonly" maxlength="20" class="input-medium Wdate "
					value="<fmt:formatDate value="${appActivityinfo.signendtime}" pattern="yyyy-MM-dd HH:mm:ss"/>"
					onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',isShowClear:false});"/>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">评价开始时间：</label>
			<div class="controls">
				<input name="replystarttime" type="text" readonly="readonly" maxlength="20" class="input-medium Wdate "
					value="<fmt:formatDate value="${appActivityinfo.replystarttime}" pattern="yyyy-MM-dd HH:mm:ss"/>"
					onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',isShowClear:false});"/>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">活动类别：</label>
			<div class="controls">
				<select name="activitytypeid" id="activitytypeid" >
					<c:forEach items="${appTypeList}" var="typeInfo">
						<c:choose>
							<c:when test="${appActivityinfo.activitytypeid == typeInfo.id }">
								<option selected="selected" value="${typeInfo.id }">${typeInfo.typename }</option>
							</c:when>
							<c:otherwise>
								<option value="${typeInfo.id }">${typeInfo.typename }</option>
							</c:otherwise>
						</c:choose>
					</c:forEach>
				</select>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">活动图片：</label>
			<div class="controls">
				<form:hidden id="activityphoto" path="activityphoto" htmlEscape="false" maxlength="255" class="input-xlarge"/>
				<sys:ckfinder input="activityphoto" type="files" uploadPath="/app/appActivityinfo" selectMultiple="true"/>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">活动详细：</label>
			<div class="controls">
				<form:textarea id="activitycontent" htmlEscape="false" path="activitycontent" rows="4" maxlength="200" class="input-xxlarge"/>
				<sys:ckeditor replace="activitycontent" uploadPath="/ckupload " />
			</div>
		</div>
		<div class="form-actions">
			<shiro:hasPermission name="app:appActivityinfo:edit"><input id="btnSubmit" class="btn btn-primary" type="submit" value="保 存"/>&nbsp;</shiro:hasPermission>
			<input id="btnCancel" class="btn" type="button" value="返 回" onclick="history.go(-1)"/>
		</div>
	</form:form>
</body>
</html>