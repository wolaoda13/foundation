/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.sunpeng.foundation.modules.app.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunpeng.foundation.common.persistence.Page;
import com.sunpeng.foundation.common.service.CrudService;
import com.sunpeng.foundation.modules.app.entity.AppType;
import com.sunpeng.foundation.modules.app.dao.AppTypeDao;

/**
 * 应用城市管理Service
 * @author sunp
 * @version 2016-02-11
 */
@Service
@Transactional(readOnly = true)
public class AppTypeService extends CrudService<AppTypeDao, AppType> {

	public AppType get(String id) {
		return super.get(id);
	}
	
	public List<AppType> findList(AppType appType) {
		return super.findList(appType);
	}
	
	public Page<AppType> findPage(Page<AppType> page, AppType appType) {
		return super.findPage(page, appType);
	}
	
	@Transactional(readOnly = false)
	public void save(AppType appType) {
		super.save(appType);
	}
	
	@Transactional(readOnly = false)
	public void delete(AppType appType) {
		super.delete(appType);
	}
	
}