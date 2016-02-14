var index = {}; 
	index.cityName = "长春";
	index.cityId = "1";
	
	index.initCity = function(){
		jQuery.ajax({
			url : ctx+'/app/appIndex/initCity',
			type : 'post',
			data :  {} ,
			success : function(data) {
					var cityList = data.cityList;
					$("#cityList").html("");
					for(var i = 0 ; i < cityList.length; i++){
						$("#cityList").append("<a href=javascript:index.replaceCity("+cityList[i].id+",'"+cityList[i].cityname+"') >"+cityList[i].cityname+"</a>");
					}
			},
			error : function() {
			}
		});
	}
	
	index.init = function(){
		jQuery.ajax({
			url : ctx+'/app/appIndex/index',
			type : 'post',
			async:false,
			data :  {cityName:$.cookie("cityName")} ,
			success : function(data) {
				var indexForImage = data.indexForImage;
				var indexForList = data.indexForList;
				if( indexForImage[0]!=null)
				$("#hotFirst").append("<img onclick='index.toIndexDetail("+indexForImage[0].id+")'  class='avatar' src='"+ctx+"/upload/"+indexForImage[0].activityphoto+"'  />");
				else
				$("#hotFirst").append("<img class='avatar' src='"+ctx+"/images/imageNone.jpg'  />");
				if( indexForImage[1]!=null)
				$("#hotSecond").append("<img  onclick='index.toIndexDetail("+indexForImage[1].id+")'  class='avatar' src='"+ctx+"/upload/"+indexForImage[1].activityphoto+"'  />");
				else
				$("#hotSecond").append("<img class='avatar' src='"+ctx+"/images/imageNone.jpg'  />");
				$("#activityList").html("");
				for(var i = 0 ; i < indexForList.length; i ++){
					var html = "<div class='act-box goto'>";
					html += "<div class='act-img'>";
					html += "<img onclick='index.toIndexDetail("+indexForList[i].id+")' class='imgw' src='"+indexForList[i].activityphoto.replace('|','')+"' />";
					html += "<i class='price'><i class='f24'></i><i class='money m2'>758</i><i class='dw'>起</i></i>";
					html += "<i class='join_cnt f26'></i>";
					html += "</div>";
					html += "<div class='con1'>";
					html += "<h2 class='f34'><a href='javascript:index.toIndexDetail("+indexForList[i].id+")' >"+indexForList[i].activityname+"</a></h2>";
					html += "<p class='f22'>"+indexForList[i].activityPlace+" | "+indexForList[i].activitytime+" | "+indexForList[i].activityage+"</p><p class='ptag f24'></p>";
					html += "</div>";
					html += "</div>";
					$("#activityList").append(html);
				}
			},
			error : function() {
			}
		});
	}
    
	index.replaceCity = function(cityId,cityName){
		$.cookie("cityName",cityName);
    	$.cookie("cityId",cityId);
		index.cityId = cityId;
		index.cityName = cityName;
		index.init();
		$('.mcity').addClass('none');
		$('.hdbtnl').html(cityName);
	}
	
	index.toIndexList = function(activityType){
		window.location.href = ctx+"/app/appIndex/toIndexList?activityType="+activityType+"&cityId="+index.cityId;
	}
	
	index.toIndexDetail = function(id){
		window.location.href = ctx+"/indexAction.do?method=toIndexDetail&id=" + id;
	}
	
    jQuery(function($){
    	index.initCity();
    	index.init();
    	if(typeof $.cookie("cityName") == 'undefined'){
    		$('.hdbtnl').html(index.cityName);
    		$.cookie("cityName",index.cityName);
        	$.cookie("cityId",index.cityId);
    	}else{
    		$('.hdbtnl').html($.cookie("cityName"));
    		index.cityName = $.cookie("cityName");
    		index.cityId = $.cookie("cityId");
    	}
    	mt.p = mt.home;
        mt.p.init();
    	
    });