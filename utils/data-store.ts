// 'use server'

// import { cookies } from 'next/headers'

// const dataStore = (data: any) => {
// 	const dataString = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`).join('&')
// 	const oneDay = 24 * 60 * 60 * 1000
// 	cookies().set('user', dataString, { expires: Date.now() - oneDay })
// }

// export default dataStore