/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.sunpeng.foundation.modules.app.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunpeng.foundation.common.persistence.Page;
import com.sunpeng.foundation.common.service.CrudService;
import com.sunpeng.foundation.modules.app.entity.AppActivityinfo;
import com.sunpeng.foundation.modules.app.dao.AppActivityinfoDao;

/**
 * 应用城市管理Service
 * @author sunp
 * @version 2016-02-11
 */
@Service
@Transactional(readOnly = true)
public class AppActivityinfoService extends CrudService<AppActivityinfoDao, AppActivityinfo> {

	public AppActivityinfo get(String id) {
		return super.get(id);
	}
	
	public List<AppActivityinfo> findList(AppActivityinfo appActivityinfo) {
		return super.findList(appActivityinfo);
	}
	
	public Page<AppActivityinfo> findPage(Page<AppActivityinfo> page, AppActivityinfo appActivityinfo) {
		return super.findPage(page, appActivityinfo);
	}
	
	@Transactional(readOnly = false)
	public void save(AppActivityinfo appActivityinfo) {
		super.save(appActivityinfo);
	}
	
	@Transactional(readOnly = false)
	public void delete(AppActivityinfo appActivityinfo) {
		super.delete(appActivityinfo);
	}
	
}