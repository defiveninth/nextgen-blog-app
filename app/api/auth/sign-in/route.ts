import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export function POST(req: NextApiRequest, res: NextApiResponse) {
	const { email, password }: {
		email: string,
		password: string
	} = req.body
}