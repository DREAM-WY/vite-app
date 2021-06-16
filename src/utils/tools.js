import wx, { uploadImage } from 'weixin-js-sdk' // 引入企业微信的sdk
import { uploadWechatImg } from '@/api/common'
import { Toast } from 'vant'
// 微信上传拍照
export function wxUpload(params) {
	return new Promise((resolve, reject) => {
		const { sizeType = ['compressed'], sourceType = ['album', 'camera'], isSaveToAlbum = 1, count = 9 } = params
		if (window.isApp) {
			hx.ready(() => {
				console.log('app上传图片')
				hx.uploadImage({
					isFront: 0, //是否开启前置 0-否 1=是
					isRemake: 1, //是否可以重拍  0-否 1-是
					isSaveToAlbum: 0, //是否保存到本地相册  0-否  1-是
					type: 0, //类型  0-全部， 1-单独相机 ，2-单独相册
					count: 9, //最大上传图片数量 范围1-9
					limit: 1024, //图片压缩后的最大大小为1M,默认不压缩
					success(res) {
						console.log(res, 'app获取照片res')
						resolve(res)
					},
					error(error) {
						console.log(error, 'error')
						resolve()
						Toast('获取图片失败,请重新上传')
					},
				})
			})
			return
		}
		console.log('isnothx')
		wx.chooseImage({
			sizeType, // 可以指定是原图-"original"还是压缩图-"compressed"，默认二者都有
			sourceType, // 可以指定来源是相册-album,还是相机-camera，默认二者都有
			defaultCameraMode: 'normal', //表示进入拍照界面的默认模式，目前有normal与batch两种选择，normal表示普通单拍模式，batch表示连拍模式，不传该参数则为normal模式。（注：用户进入拍照界面仍然可自由切换两种模式）
			isSaveToAlbum, //整型值，0表示拍照时不保存到系统相册，1表示自动保存，默认值是1
			success: async res => {
				var localIds = res.localIds // 返回选定照片的本地ID列表，
				//上传图片
				console.log('localIds--', localIds)
				const mediaIdList = await syncUpload(localIds)
				console.log('mediaIdList--', mediaIdList)
				var mediaIds = mediaIdList.filter(val => {
					return !!val
				})
				console.log('mediaIds--', mediaIds)
				if (mediaIds && mediaIds[0]) {
					const result = await uploadImg(mediaIds)
					resolve(result)
				} else {
					Toast('上传失败，请重试')
					resolve()
				}
			},
			fail: err => {
				reject(err)
			},
		})
	})
}
//获取微信临时素材id
const syncUpload = async function (localIds) {
	const promiseList = []
	Toast.loading({
		duration: 0, // 持续展示 toast
		forbidClick: true,
		message: '图片上传中...',
	})
	localIds.forEach(localId => {
		console.log('localId--', localId)
		promiseList.push(
			new Promise(resolve => {
				setTimeout(() => {
					wx.uploadImage({
						localId: localId,
						isShowProgressTips: 0, // 默认为1，显示进度提示
						success: function (res) {
							const serverId = res.serverId
							console.log('微信临时素材上传成功', res)
							resolve(serverId)
						},
						fail: function (err) {
							console.log('微信临时素材上传失败', err)
							resolve(false)
						},
					})
				}, 100)
			})
		)
	})
	const idList = await Promise.all(promiseList)
	return idList
}

//上传文件服务器
function uploadImg(mediaIdList) {
	return new Promise(resolve => {
		uploadWechatImg({
			mediaIdList,
		})
			.then(res => {
				Toast('图片上传成功')
				if (res.code == 200) {
					resolve(res.data)
				} else {
					resolve()
				}
			})
			.catch(err => {
				Toast('图片上传失败')
				resolve()
			})
	})
}
