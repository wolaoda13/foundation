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
import com.sunpeng.foundation.modules.app.entity.AppType;
import com.sunpeng.foundation.modules.app.service.AppTypeService;

/**
 * 应用城市管理Controller
 * @author sunp
 * @version 2016-02-11
 */
@Controller
@RequestMapping(value = "${adminPath}/app/appType")
public class AppTypeController extends BaseController {

	@Autowired
	private AppTypeService appTypeService;
	
	@ModelAttribute
	public AppType get(@RequestParam(required=false) String id) {
		AppType entity = null;
		if (StringUtils.isNotBlank(id)){
			entity = appTypeService.get(id);
		}
		if (entity == null){
			entity = new AppType();
		}
		return entity;
	}
	
	@RequiresPermissions("app:appType:view")
	@RequestMapping(value = {"list", ""})
	public String list(AppType appType, HttpServletRequest request, HttpServletResponse response, Model model) {
		Page<AppType> page = appTypeService.findPage(new Page<AppType>(request, response), appType); 
		model.addAttribute("page", page);
		return "modules/app/appTypeList";
	}

	@RequiresPermissions("app:appType:view")
	@RequestMapping(value = "form")
	public String form(AppType appType, Model model) {
		model.addAttribute("appType", appType);
		return "modules/app/appTypeForm";
	}

	@RequiresPermissions("app:appType:edit")
	@RequestMapping(value = "save")
	public String save(AppType appType, Model model, RedirectAttributes redirectAttributes) {
		if (!beanValidator(model, appType)){
			return form(appType, model);
		}
		appTypeService.save(appType);
		addMessage(redirectAttributes, "保存类别成功");
		return "redirect:"+Global.getAdminPath()+"/app/appType/?repage";
	}
	
	@RequiresPermissions("app:appType:edit")
	@RequestMapping(value = "delete")
	public String delete(AppType appType, RedirectAttributes redirectAttributes) {
		appTypeService.delete(appType);
		addMessage(redirectAttributes, "删除类别成功");
		return "redirect:"+Global.getAdminPath()+"/app/appType/?repage";
	}

}