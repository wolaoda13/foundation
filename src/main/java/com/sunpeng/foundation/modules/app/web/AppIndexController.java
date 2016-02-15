package com.sunpeng.foundation.modules.app.web;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sunpeng.foundation.common.persistence.Page;
import com.sunpeng.foundation.modules.app.entity.AppActivityinfo;
import com.sunpeng.foundation.modules.app.entity.AppCity;
import com.sunpeng.foundation.modules.app.entity.AppUser;
import com.sunpeng.foundation.modules.app.service.AppActivityinfoService;
import com.sunpeng.foundation.modules.app.service.AppCityService;
import com.sunpeng.foundation.modules.app.service.AppUserService;
import com.sunpeng.foundation.modules.app.utils.MD5;



/**
 * app对外接口
 * @author sunp
 * @version 2016-02-11
 */
@Controller
@RequestMapping(value = "/app/appIndex")
public class AppIndexController {

	@Autowired
	private AppCityService appCityService;
	@Autowired
	private AppUserService appUserService;
	@Autowired
	private AppActivityinfoService appActivityinfoService;
    /*
     * 首页初始化城市
     */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value = "initCity")
	@ResponseBody
	public Map initCity() {
		Map map = new HashMap();
		map.put("cityList", appCityService.findList(new AppCity()));
		return map;
	}
	@RequestMapping(value = "index")
	@ResponseBody
	public Map index(String cityName) {
		Map map = new HashMap();
		AppActivityinfo app = new AppActivityinfo();
		Page<AppActivityinfo> p = new Page<AppActivityinfo>();
		// 首页推荐
		p.setOrderBy("queue asc,createtime desc limit 0,2");
		app.setPage(p);
		app.setIshot("1");
		map.put("indexForImage",appActivityinfoService.findList(app));
		// 首页列表
		app = new AppActivityinfo();
		p = new Page<AppActivityinfo>();
		p.setOrderBy("queue asc,createtime desc limit 0,10");
		app.setPage(p);
		map.put("indexForList", appActivityinfoService.findList(app));
		return map;
	}
	
	@RequestMapping(value = "toIndexList")
	public String toIndexList(Integer activityType, Integer cityId,
			HttpServletRequest request, HttpServletResponse response) {
		request.setAttribute("activityType", activityType);
		request.setAttribute("cityId", cityId);
		return "modules/app/indexlist";
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "indexlist")
	@ResponseBody
	public Map indexlist(String cityId, String activityType,Integer limitStart) {
		Map map = new HashMap();
		AppActivityinfo app = new AppActivityinfo();
		app.setCityid(cityId);
		app.setActivitytypeid(activityType);
		Page<AppActivityinfo> p = new Page<AppActivityinfo>();
		// 首页推荐
		p.setOrderBy("queue asc,createtime desc limit "+limitStart+",10");
		app.setPage(p);
		map.put("indexForList",appActivityinfoService.findList(app));
		map.put("limitStart", limitStart + 15);
		return map;
	}
	@RequestMapping(value = "toIndexDetail")
	public String toIndexDetail(String id, HttpServletRequest request,
			HttpServletResponse response) {
		request.setAttribute("activityInfo",appActivityinfoService.get(id));
//		List activityReplyList = activityReplyService.query(ActivityReply.class, " where activityId = '"+id+"'");
//		request.setAttribute("replyNum", activityReplyList==null?0:activityReplyList.size());
		return "modules/app/indexdetail";
	}
	
	//跳转到我的页面
	@RequestMapping(value = "toMine")
	public String toMine(HttpServletRequest request,
			HttpServletResponse response) {
		if (AppUser.getSessionUserInfo(request) == null) {
			return "modules/app/login";
		} else {
			request.setAttribute("appUser", appUserService.get(AppUser.getSessionUserInfo(request).getId()));
			return "modules/app/mine";
		}
	}
	
	@RequestMapping(value = "tologin")
	@ResponseBody
	public Map tologin(AppUser appUser, HttpServletRequest request,HttpServletResponse response) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		AppUser searchUser = new AppUser();
		searchUser.setLoginname(appUser.getLoginname());
		List<AppUser> userList = (List<AppUser>) appUserService.findList(searchUser);
		if (userList.size() > 0) {
			if (MD5.checkpassword(appUser.getPassword(), userList.get(0).getPassword())) {
				request.getSession().setAttribute("AppUser", userList.get(0));
				map.put("loginType", "success");
			} else {

				map.put("loginType", "failed");
			}
		} else {
			map.put("loginType", "failed");
		}
		return map;
	}
	
}
