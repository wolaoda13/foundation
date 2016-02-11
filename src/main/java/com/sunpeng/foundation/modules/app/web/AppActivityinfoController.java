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
import com.sunpeng.foundation.common.utils.StringUtils;
import com.sunpeng.foundation.common.web.BaseController;
import com.sunpeng.foundation.modules.app.entity.AppActivityinfo;
import com.sunpeng.foundation.modules.app.entity.AppCity;
import com.sunpeng.foundation.modules.app.entity.AppType;
import com.sunpeng.foundation.modules.app.service.AppActivityinfoService;
import com.sunpeng.foundation.modules.app.service.AppCityService;
import com.sunpeng.foundation.modules.app.service.AppTypeService;

/**
 * 应用城市管理Controller
 * @author sunp
 * @version 2016-02-11
 */
@Controller
@RequestMapping(value = "${adminPath}/app/appActivityinfo")
public class AppActivityinfoController extends BaseController {

	@Autowired
	private AppActivityinfoService appActivityinfoService;
	
	@Autowired
	private AppCityService appCityService;
	
	@Autowired
	private AppTypeService appTypeService;
	
	@ModelAttribute
	public AppActivityinfo get(@RequestParam(required=false) String id) {
		AppActivityinfo entity = null;
		if (StringUtils.isNotBlank(id)){
			entity = appActivityinfoService.get(id);
		}
		if (entity == null){
			entity = new AppActivityinfo();
		}
		return entity;
	}
	
	@RequiresPermissions("app:appActivityinfo:view")
	@RequestMapping(value = {"list", ""})
	public String list(AppActivityinfo appActivityinfo, HttpServletRequest request, HttpServletResponse response, Model model) {
		Page<AppActivityinfo> page = appActivityinfoService.findPage(new Page<AppActivityinfo>(request, response), appActivityinfo); 
		model.addAttribute("page", page);
		return "modules/app/appActivityinfoList";
	}

	@RequiresPermissions("app:appActivityinfo:view")
	@RequestMapping(value = "form")
	public String form(AppActivityinfo appActivityinfo, Model model) {
		model.addAttribute("appActivityinfo", appActivityinfo);
		model.addAttribute("appCityList",appCityService.findList(new AppCity()));
		model.addAttribute("appTypeList",appTypeService.findList(new AppType()));
		return "modules/app/appActivityinfoForm";
	}

	@RequiresPermissions("app:appActivityinfo:edit")
	@RequestMapping(value = "save")
	public String save(AppActivityinfo appActivityinfo, Model model, RedirectAttributes redirectAttributes) {
		if (!beanValidator(model, appActivityinfo)){
			return form(appActivityinfo, model);
		}
		appActivityinfoService.save(appActivityinfo);
		addMessage(redirectAttributes, "保存城市成功");
		return "redirect:"+Global.getAdminPath()+"/app/appActivityinfo/?repage";
	}
	
	@RequiresPermissions("app:appActivityinfo:edit")
	@RequestMapping(value = "delete")
	public String delete(AppActivityinfo appActivityinfo, RedirectAttributes redirectAttributes) {
		appActivityinfoService.delete(appActivityinfo);
		addMessage(redirectAttributes, "删除城市成功");
		return "redirect:"+Global.getAdminPath()+"/app/appActivityinfo/?repage";
	}

}