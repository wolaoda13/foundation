/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.sunpeng.foundation.modules.app.dao;

import com.sunpeng.foundation.common.persistence.CrudDao;
import com.sunpeng.foundation.common.persistence.annotation.MyBatisDao;
import com.sunpeng.foundation.modules.app.entity.AppUser;

/**
 * 客户表DAO接口
 * @author sunp
 * @version 2016-02-11
 */
@MyBatisDao
public interface AppUserDao extends CrudDao<AppUser> {
	
}