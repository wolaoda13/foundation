/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.sunpeng.foundation.modules.sys.dao;

import com.sunpeng.foundation.common.persistence.TreeDao;
import com.sunpeng.foundation.common.persistence.annotation.MyBatisDao;
import com.sunpeng.foundation.modules.sys.entity.Area;

/**
 * 区域DAO接口
 * @author ThinkGem
 * @version 2014-05-16
 */
@MyBatisDao
public interface AreaDao extends TreeDao<Area> {
	
}
