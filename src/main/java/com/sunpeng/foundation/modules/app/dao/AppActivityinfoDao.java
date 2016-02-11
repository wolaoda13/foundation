/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.sunpeng.foundation.modules.app.dao;

import com.sunpeng.foundation.common.persistence.CrudDao;
import com.sunpeng.foundation.common.persistence.annotation.MyBatisDao;
import com.sunpeng.foundation.modules.app.entity.AppActivityinfo;

/**
 * 应用城市管理DAO接口
 * @author sunp
 * @version 2016-02-11
 */
@MyBatisDao
public interface AppActivityinfoDao extends CrudDao<AppActivityinfo> {
	
}