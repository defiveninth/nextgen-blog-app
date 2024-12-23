import jwt, { JwtPayload } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'SATOSHI_NAKAMOTO'

export function generateAccessToken(user: { id: string; email: string }): string {
	return jwt.sign(
		{ id: user.id, email: user.email },
		JWT_SECRET,
		{ expiresIn: '5d' }
	)
}

export const verifyAccessToken = (token: string, secret: string): JwtPayload => {
	try {
		const decoded = jwt.verify(token, secret)

		if (typeof decoded === 'string') throw new Error('Invalid token format.')

		return decoded as JwtPayload
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		throw new Error('Invalid or expired token.')
	}
}