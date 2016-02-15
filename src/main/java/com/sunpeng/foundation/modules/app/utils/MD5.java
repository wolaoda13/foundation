package com.sunpeng.foundation.modules.app.utils;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import sun.misc.BASE64Encoder;


public class MD5 {

	public static String EncoderByMd5(String str) {
		MessageDigest md5 = null;
		try {
			md5 = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
			return str;
		}
		BASE64Encoder base64en = new BASE64Encoder();
		String newstr = str;
		try {
			newstr = base64en.encode(md5.digest(str.getBytes("utf-8")));
		} catch (UnsupportedEncodingException e) {
			return str;
		}
		return newstr;
	}

	public static boolean checkpassword(String newpasswd, String oldpasswd)
			throws NoSuchAlgorithmException, UnsupportedEncodingException {
		if (EncoderByMd5(newpasswd).equals(oldpasswd))
			return true;
		else
			return false;
	}
	public static void main(String []args){
		System.out.println(EncoderByMd5("admin"));
	}
}