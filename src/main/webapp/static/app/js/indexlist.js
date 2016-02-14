var indexlist = {}; 

indexlist.init = function(type){
	jQuery.ajax({
		url : ctx+'/app/appIndex/indexlist',
		type : 'post',
		data :  {cityId:$("#cityId").val(),activityType:$("#activityType").val(),limitStart:$("#limitStart").val()} ,
		async:false,
		success : function(data) {
			var indexForList = data.indexForList;
			$("#limitStart").val(data.limitStart);
			if(type != "1"){
				$("#activityList").html("");
			}
			for(var i = 0 ; i < indexForList.length; i++){
				var html = "<div class='act-box goto'>";
				html += "<div class='act-img'>";
				html += "<img class='imgw' onclick='indexlist.toIndexDetail("+indexForList[i].id+")' src='"+indexForList[i].activityphoto.replace('|','')+"' />";
				html += "<i class='price'><i class='f24'></i><i class='money m2'>758</i><i class='dw'>起</i></i>";
				html += "<i class='join_cnt f26'></i>";
				html += "</div>";
				html += "<div class='con1'>";
				html += "<h2 class='f34'><a href='javascript:indexlist.toIndexDetail("+indexForList[i].id+")' >"+indexForList[i].activityname+"</a></h2>";
				html += "<p class='f22'>"+indexForList[i].activityPlace+" | "+indexForList[i].activitytime+" | "+indexForList[i].activityage+"</p><p class='ptag f24'></p>";
				html += "</div>";
				html += "</div>";
				$("#activityList").append(html);
			}
			
			if(indexForList.length >=15 ){
				$("#moreButton").html("<a class='btn' href='javascript:void(0)' onclick='indexlist.getMore()' >加载更多</a>");
			}else{
				$("#moreButton").html("没有更多了。。");
			}
		},
		error : function() {
		}
	});
}

indexlist.toIndexDetail = function(id){
	window.location.href = ctx+"/app/appIndex/toIndexDetail?id=" + id;
}

indexlist.getMore = function(){
	$("#moreButton").html('');
	indexlist.init("1");
}

jQuery(function($){
	indexlist.init();
});