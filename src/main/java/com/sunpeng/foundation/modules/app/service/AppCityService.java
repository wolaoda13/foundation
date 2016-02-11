/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.sunpeng.foundation.modules.app.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunpeng.foundation.common.persistence.Page;
import com.sunpeng.foundation.common.service.CrudService;
import com.sunpeng.foundation.modules.app.entity.AppCity;
import com.sunpeng.foundation.modules.app.dao.AppCityDao;

/**
 * 应用城市管理Service
 * @author sunp
 * @version 2016-02-11
 */
@Service
@Transactional(readOnly = true)
public class AppCityService extends CrudService<AppCityDao, AppCity> {

	public AppCity get(String id) {
		return super.get(id);
	}
	
	public List<AppCity> findList(AppCity appCity) {
		return super.findList(appCity);
	}
	
	public Page<AppCity> findPage(Page<AppCity> page, AppCity appCity) {
		return super.findPage(page, appCity);
	}
	
	@Transactional(readOnly = false)
	public void save(AppCity appCity) {
		super.save(appCity);
	}
	
	@Transactional(readOnly = false)
	public void delete(AppCity appCity) {
		super.delete(appCity);
	}
	
}