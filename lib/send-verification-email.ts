import nodemailer from 'nodemailer'

export async function sendVerificationEmail(email: string, verifyToken: string) {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD,
		},
	})

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		subject: 'Welcome to our NextJs Blog Post App',
		text: `Please click on the following link to verify your email: ${process.env.APP_URL}/auth/verify/${verifyToken}`,
	}

	await transporter.sendMail(mailOptions)
}
