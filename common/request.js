import config from '@/common/config.js'

const BASEURL = config.BASEURL

const request = (param) => {
    return new Promise((resove, reject) => {
        uni.request({
            url: BASEURL + param.url,
            data: param.data || '',
            header: {
                "Content-Type": param.contentType || "application/json;charset=utf-8",
                "pt": "app",
                "token": param.token !== undefined ? param.token : uni.getStorageSync('token')
				// "token": "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6ImY3MWZmN2QwLTI1YzgtNGRiOS04NmNhLWJlN2U1MTRkNmVjYyIsInVzZXJuYW1lIjoiYWRtaW4ifQ.NXc6Ol2JADsmSKWSeQPGg05eZre1VbilqZR4_7oO41TiEgUkO_7gH0qaRZ1BcUsUU3Uqx-VoOFuk0WYc6Cv7tw"
            },
            method: param.method,
            dataType: "json",
            success: (res) => {
                if (res.statusCode == 200) {
                    if (res.header.token) {
                        uni.setStorageSync('token', res.header.token)
                    }
					// res.header['Authorization']= "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6ImY3MWZmN2QwLTI1YzgtNGRiOS04NmNhLWJlN2U1MTRkNmVjYyIsInVzZXJuYW1lIjoiYWRtaW4ifQ.NXc6Ol2JADsmSKWSeQPGg05eZre1VbilqZR4_7oO41TiEgUkO_7gH0qaRZ1BcUsUU3Uqx-VoOFuk0WYc6Cv7tw"
                    resove(res.data)
				}else if (res.statusCode == 302) {
					uni.navigateTo({
						url: "../../pages/login/login"
					})
                }else{
					uni.showToast({
					    title: '网络连接错误，请联系管理员！！',
					    icon:"none"
					 });
				}	
            },
            fail: (error) => {
                reject(error)
            },
            complete: () => {

            }
        })
    })
}

export default request