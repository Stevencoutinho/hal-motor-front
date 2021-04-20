import React from "react";

/* type */
const toHms = (time: any) => {
  var hms = "";
	var h = time / 3600 | 0;
	var m = time % 3600 / 60 | 0;
	var s = time % 60;

	if (h != 0) {
		hms = h + "時間" + padZero(m) + "分" + padZero(s) + "秒";
	} else if (m != 0) {
		hms = m + "分" + padZero(s) + "秒";
	} else {
		hms = s + "秒";
	}

	return hms;

	function padZero(v: any) {
		if (v < 10) {
			return "0" + v;
		} else {
			return v;
		}
	}
};

export default toHms;