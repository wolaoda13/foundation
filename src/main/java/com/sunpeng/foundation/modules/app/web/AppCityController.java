/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.sunpeng.foundation.modules.app.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.sunpeng.foundation.common.config.Global;
import com.sunpeng.foundation.common.persistence.Page;
import com.sunpeng.foundation.common.web.BaseController;
import com.sunpeng.foundation.common.utils.StringUtils;
import com.sunpeng.foundation.modules.app.entity.AppCity;
import com.sunpeng.foundation.modules.app.service.AppCityService;

/**
 * 应用城市管理Controller
 * @author sunp
 * @version 2016-02-11
 */
@Controller
@RequestMapping(value = "${adminPath}/app/appCity")
public class AppCityController extends BaseController {

	@Autowired
	private AppCityService appCityService;
	
	@ModelAttribute
	public AppCity get(@RequestParam(required=false) String id) {
		AppCity entity = null;
		if (StringUtils.isNotBlank(id)){
			entity = appCityService.get(id);
		}
		if (entity == null){
			entity = new AppCity();
		}
		return entity;
	}
	
	@RequiresPermissions("app:appCity:view")
	@RequestMapping(value = {"list", ""})
	public String list(AppCity appCity, HttpServletRequest request, HttpServletResponse response, Model model) {
		Page<AppCity> page = appCityService.findPage(new Page<AppCity>(request, response), appCity); 
		model.addAttribute("page", page);
		return "modules/app/appCityList";
	}

	@RequiresPermissions("app:appCity:view")
	@RequestMapping(value = "form")
	public String form(AppCity appCity, Model model) {
		model.addAttribute("appCity", appCity);
		return "modules/app/appCityForm";
	}

	@RequiresPermissions("app:appCity:edit")
	@RequestMapping(value = "save")
	public String save(AppCity appCity, Model model, RedirectAttributes redirectAttributes) {
		if (!beanValidator(model, appCity)){
			return form(appCity, model);
		}
		appCityService.save(appCity);
		addMessage(redirectAttributes, "保存城市成功");
		return "redirect:"+Global.getAdminPath()+"/app/appCity/?repage";
	}
	
	@RequiresPermissions("app:appCity:edit")
	@RequestMapping(value = "delete")
	public String delete(AppCity appCity, RedirectAttributes redirectAttributes) {
		appCityService.delete(appCity);
		addMessage(redirectAttributes, "删除城市成功");
		return "redirect:"+Global.getAdminPath()+"/app/appCity/?repage";
	}

}