var login = {};


login.login = function(){
	if($("#ui_username").val().length == 0 || $("#ui_password").val().length == 0){
		layer.msg('用户名或密码无效');
		return;
	}else if($("#ui_username").val().length <= 6 || $("#ui_password").val().length <= 6){
		layer.msg('用户名或密码无效');
		return;
	}
	
	jQuery.ajax({
		url : ctx+'/app/appIndex/tologin',
		type : 'post',
		data :  {loginname:$("#ui_username").val(),password:$("#ui_password").val()} ,
		success : function(data) {
			if(data.loginType == "success"){
				window.location.href = ctx+'/web/index.jsp';
			}else{
				layer.msg('用户名密码错误');
				return;
			}
		},
		error : function() {
		}
	});
}