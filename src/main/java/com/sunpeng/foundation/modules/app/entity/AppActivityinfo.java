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
public class AppActivityinfo extends DataEntity<AppActivityinfo> {
	
	private static final long serialVersionUID = 1L;
	private String activityname;		// 活动名称
	private String activityplace;		// 活动地址
	private String activitytime;		// 活动时间
	private String activityage;		// 适合年龄
	private String activitysponsor;		// 主办方
	private String ishot;		// 是否热门首页显示
	private String activitycontent;		// 活动详细
	private String cityid;		// 所属城市
	private String signendtime;		// 报名结束时间
	private String replystarttime;		// 评价开始时间
	private String activitytypeid;		// 活动类别id
	private String activityphoto;		// 活动图片
	private String beginActivitytime;		// 开始 活动时间
	private String endActivitytime;		// 结束 活动时间
	
	public AppActivityinfo() {
		super();
	}

	public AppActivityinfo(String id){
		super(id);
	}

	@Length(min=0, max=255, message="活动名称长度必须介于 0 和 255 之间")
	public String getActivityname() {
		return activityname;
	}

	public void setActivityname(String activityname) {
		this.activityname = activityname;
	}
	
	@Length(min=0, max=255, message="活动地址长度必须介于 0 和 255 之间")
	public String getActivityplace() {
		return activityplace;
	}

	public void setActivityplace(String activityplace) {
		this.activityplace = activityplace;
	}
	
	@Length(min=0, max=2000, message="活动时间长度必须介于 0 和 2000 之间")
	public String getActivitytime() {
		return activitytime;
	}

	public void setActivitytime(String activitytime) {
		this.activitytime = activitytime;
	}
	
	@Length(min=0, max=255, message="适合年龄长度必须介于 0 和 255 之间")
	public String getActivityage() {
		return activityage;
	}

	public void setActivityage(String activityage) {
		this.activityage = activityage;
	}
	
	@Length(min=0, max=255, message="主办方长度必须介于 0 和 255 之间")
	public String getActivitysponsor() {
		return activitysponsor;
	}

	public void setActivitysponsor(String activitysponsor) {
		this.activitysponsor = activitysponsor;
	}
	
	@Length(min=0, max=4, message="是否热门首页显示长度必须介于 0 和 4 之间")
	public String getIshot() {
		return ishot;
	}

	public void setIshot(String ishot) {
		this.ishot = ishot;
	}
	
	public String getActivitycontent() {
		return activitycontent;
	}

	public void setActivitycontent(String activitycontent) {
		this.activitycontent = activitycontent;
	}
	
	@Length(min=0, max=11, message="所属城市长度必须介于 0 和 11 之间")
	public String getCityid() {
		return cityid;
	}

	public void setCityid(String cityid) {
		this.cityid = cityid;
	}
	
	@Length(min=0, max=60, message="报名结束时间长度必须介于 0 和 60 之间")
	public String getSignendtime() {
		return signendtime;
	}

	public void setSignendtime(String signendtime) {
		this.signendtime = signendtime;
	}
	
	@Length(min=0, max=60, message="评价开始时间长度必须介于 0 和 60 之间")
	public String getReplystarttime() {
		return replystarttime;
	}

	public void setReplystarttime(String replystarttime) {
		this.replystarttime = replystarttime;
	}
	
	@Length(min=0, max=11, message="活动类别id长度必须介于 0 和 11 之间")
	public String getActivitytypeid() {
		return activitytypeid;
	}

	public void setActivitytypeid(String activitytypeid) {
		this.activitytypeid = activitytypeid;
	}
	
	@Length(min=0, max=255, message="活动图片长度必须介于 0 和 255 之间")
	public String getActivityphoto() {
		return activityphoto;
	}

	public void setActivityphoto(String activityphoto) {
		this.activityphoto = activityphoto;
	}
	
	public String getBeginActivitytime() {
		return beginActivitytime;
	}

	public void setBeginActivitytime(String beginActivitytime) {
		this.beginActivitytime = beginActivitytime;
	}
	
	public String getEndActivitytime() {
		return endActivitytime;
	}

	public void setEndActivitytime(String endActivitytime) {
		this.endActivitytime = endActivitytime;
	}
		
}