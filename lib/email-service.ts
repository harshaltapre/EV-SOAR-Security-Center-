// This is a mock email service for demonstration purposes.
// In a real application, you would integrate with a service like SendGrid, AWS SES, or Resend.

interface EmailOptions {
  to: string
  subject: string
  text: string
  html?: string
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  console.log(`
--- SIMULATING EMAIL SEND ---
To: ${options.to}
Subject: ${options.subject}
Body:
${options.text}
-----------------------------
`)
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  // In a real scenario, you'd call your email service API here.
  // For now, we'll always return true to simulate success.
  return true
}
