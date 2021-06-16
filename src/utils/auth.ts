import Cookies from 'js-cookie'
// import CryptoJS from 'crypto-js'

const TokenKey: string = 'access_token'
const RTokenKey: string = 'refresh_token'

export function getToken() {
	return Cookies.get(TokenKey)
}

export function setToken(token: string) {
	return Cookies.set(TokenKey, token, {
		expires: 0.5,
	})
}

export function setRToken(token: string) {
	return Cookies.set(RTokenKey, token, {
		expires: 0.5,
	})
}

export function removeToken() {
	return Cookies.remove(TokenKey)
}

export function removeRToken() {
	return Cookies.remove(RTokenKey)
}
// export function encrypt(word: string, keyStr: string) {
// 	keyStr = keyStr || 'abcdefgabcdefg12'
// 	var key = CryptoJS.enc.Utf8.parse(keyStr) // Latin1 w8m31+Yy/Nw6thPsMpO5fg==
// 	var srcs = CryptoJS.enc.Utf8.parse(word)
// 	var encrypted = CryptoJS.AES.encrypt(srcs, key, {
// 		mode: CryptoJS.mode.ECB,
// 		padding: CryptoJS.pad.Pkcs7,
// 	})
// 	return encrypted.toString()
// }
