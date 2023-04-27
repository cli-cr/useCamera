import QQMapWX from "@/common/utils/qqmap-wx-jssdk.min.js"
//腾讯地图- 安庆
// const QQMAP_KEY = "4QJBZ-DU7CD-IKB4O-HXVGS-4ZGG2-2MBDH"

//腾讯地图 -合肥
const QQMAP_KEY = "YHPBZ-PGN6X-ITK4T-7B5UO-STK2F-K7FLL"

const QQMAP = new QQMapWX({
    key: QQMAP_KEY
});

//获取当前位置
QQMAP.getLocation = function () {
    return new Promise((resove, reject) => {
        this.reverseGeocoder({
            success: (res) => {
                let result = res.result;
                let location = {
                    latitude: result.location.lat,
                    longitude: result.location.lng,
                    location: result.address,
                }
                resove(location);
				console.log('获取位置信息',location);
            },
            fail: (error) => {
                console.error(error);
                uni.showToast({
                    title: '获取位置信息失败',
                    icon: 'none'
                })
            },
            complete: (res) => {

            }
        })
    })
}
export default QQMAP
