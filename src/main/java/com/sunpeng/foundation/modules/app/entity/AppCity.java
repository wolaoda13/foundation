/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.sunpeng.foundation.modules.app.entity;

import org.hibernate.validator.constraints.Length;

import com.sunpeng.foundation.common.persistence.DataEntity;

/**
 * 应用城市管理Entity
 * @author sunp
 * @version 2016-02-11
 */
public class AppCity extends DataEntity<AppCity> {
	
	private static final long serialVersionUID = 1L;
	private String cityname;		// 城市名称
	
	public AppCity() {
		super();
	}

	public AppCity(String id){
		super(id);
	}

	@Length(min=0, max=255, message="城市名称长度必须介于 0 和 255 之间")
	public String getCityname() {
		return cityname;
	}

	public void setCityname(String cityname) {
		this.cityname = cityname;
	}
	
}