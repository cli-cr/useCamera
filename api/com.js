import request from '@/common/request.js'
import Vue from 'vue'

/**
 * 通用上传文件方法
 * 每次只允许上传一个文件
 * @param {String} imageSrc 
 * 
 * */
export function userUploadFile(imageSrc,successCallBack) {
  uni.uploadFile({
  	url: "http://192.168.6.248:7080/file/upload",
	header:{
		'Authorization': "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjQxYzY2ZGNlLTNkN2YtNDI1Mi05Y2M3LWNkZDc4ZGY5YTY4ZSIsInVzZXJuYW1lIjoiYWRtaW4ifQ.3S1Gj2dtEgtB6_STSPQbGF_lD4l80F042vzr28P7D4iRpxEnymNDHemj6dyoFIvJWyGXA-8EpVGVWHY-ikr1Ww"
	},
  	filePath: imageSrc,
  	name: 'file',
  	method: 'POST',
  	success: successCallBack,
  	fail: (err) => {
			console.log('userUploadFile upload fail', err);
			console.log('出错拉啊');
		}
  	}
  );
}