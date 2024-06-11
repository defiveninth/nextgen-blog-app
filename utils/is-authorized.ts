import { cookies } from 'next/headers'

function IsAuthorized() {
  return cookies().has('token')
}

export default IsAuthorized