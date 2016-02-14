var indexdetail = {}; 

indexdetail.init = function(){
	
}

indexdetail.replaceMenu = function(aid,divid){
	$("#ddiv0").addClass("none");
	$("#ddiv1").addClass("none");
	$("#ddiv2").addClass("none");
	$("#"+divid).removeClass("none");
	$("#da0").removeClass("act");
	$("#da1").removeClass("act");
	$("#da2").removeClass("act");
	$("#"+aid).addClass("act");
}

indexdetail.sign = function(){
	jQuery.ajax({
		url : ctx+'/indexAction.do?method=toSign',
		type : 'post',
		data :  {activityId:$("#activityId").val()} ,
		success : function(data) {
			if(data.signType == "notLogin"){
				window.location.href = ctx+'/web/login.jsp';
			}else if(data.signType == "alwaysSign"){
				layer.msg('您已经报名');
				return;
			}else if(data.signType == "lateSign"){
				layer.msg('报名时间已过');
				return;
			}else if(data.signType == "success"){
				layer.msg('报名成功');
				return;
			}
		},
		error : function() {
		}
	});
}

indexdetail.getReplyData = function(){
	jQuery.ajax({
		url : ctx+'/indexAction.do?method=queryDetailReply',
		type : 'post',
		data :  {activityId:$("#activityId").val()} ,
		success : function(data) {
			var activityReplyList = data.activityReplyList;
			if(typeof activityReplyList == 'undefined' || activityReplyList.length>0){
				$("#detailReplyId").html("");
			}else{
				$("#detailReplyId").html("还没有评价");
			}
			for(var i = 0 ; i < activityReplyList.length; i ++){
				var html = "<div class='dcmti'>";
				html += "<div class='zoom'>";
				html += "<a href='javascript:void(0)'><img class='left av' src='"+ctx+"/upload/"+activityReplyList[i].photo+"' /></a>";
				html += "<a href='javascript:void(0)'><b>"+activityReplyList[i].ui_displayname+"</b></a>";
				html += "<div class='right'>";
				html += "<i class='score1'><i class='score2' style='width:98%;'></i></i>";
				html += "</div>";
				html += "</div>";
				html += "<div class='con'>";
				html += "<div class='f12'>"+activityReplyList[i].create_date+"</div>";
				html += "<div class='cdesc'>";
				html += "<p>"+activityReplyList[i].content+"</p>";
				html += "</div>";
				html += "</div>";
				html += "</div>";
				$("#detailReplyId").append(html);
			}
			if(data.replyType == 'success'){
				var html = "<div id='replyDiv' class='botl qabox'>";
				html += " <textarea id='content' name='content' class='put0' rows='4' placeholder='请输入您的评价~'></textarea>";
				html += "<p class='tright'><a class='btn-red2' onclick='indexdetail.toReply()'>我要评价</a></p>";
				html += "</div>";
				$("#detailReplyId").after(html);
			}
			
		},
		error : function() {
		}
	});
}

indexdetail.toReply = function(){
	jQuery.ajax({
		url : ctx+'/indexAction.do?method=toReply',
		type : 'post',
		async:false,
		data :  {activityId:$("#activityId").val(),content:$("#content").val()} ,
		success : function(data) {
			$("#replyDiv").remove();
			if(data.replyType == 'success'){
				layer.msg('评价成功');
				indexdetail.getReplyData();
				return;
			}else if(data.replyType == 'alwaysReply'){
				layer.msg('您已经评价过~');
				return;
			}else if(data.replyType == 'notlogin'){
				window.location.href = ctx+'/web/login.jsp';
			}else{
				return;
			}
			
		},
		error : function() {
		}
	});
}

jQuery(function($){
	indexdetail.init();
	
	var d1 = new Date($("#signEndTime").val().replace(/\-/g, "\/")); 
	var d2 = new Date();
	if(d1 > d2){
		$("#signButton").html("<i onclick='indexdetail.sign()' class='btnr'>立即报名</i>");
	}else{
		//过期
		$("#signButton").html("<i class='btnr' style='background-color:rgba(144,144,144,0.9)'>立即报名</i>");
	}
});