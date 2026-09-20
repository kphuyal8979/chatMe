export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ChatMe</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f5f7;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 35px; text-align: center; border-radius: 12px 12px 0 0;">
      <div style="width: 80px; height: 80px; margin: 0 auto 20px auto; border-radius: 50%; background-color: white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
        <span style="font-size: 32px; line-height: 80px;">💬</span>
      </div>
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 0.5px;">Welcome to ChatMe!</h1>
    </div>
    <div style="background-color: #ffffff; padding: 35px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
      <p style="font-size: 18px; color: #667eea;"><strong>Hello ${name},</strong></p>
      <p>We're thrilled to have you on board! ChatMe brings you closer to the people who matter most with seamless, secure, and lightning-fast messaging.</p>
      
      <div style="background-color: #f8f9fa; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 4px solid #667eea;">
        <p style="font-size: 16px; margin: 0 0 15px 0; color: #2d3748;"><strong>Here is how to dive right in:</strong></p>
        <ul style="padding-left: 20px; margin: 0; color: #4a5568;">
          <li style="margin-bottom: 10px;">Personalize your profile and status</li>
          <li style="margin-bottom: 10px;">Connect with friends and start chatting</li>
          <li style="margin-bottom: 10px;">Create group chats for family or teams</li>
          <li style="margin-bottom: 0;">Share moments through media and voice notes</li>
        </ul>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${clientURL}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 14px 35px; border-radius: 50px; font-weight: 600; display: inline-block; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);">Launch ChatMe</a>
      </div>
      
      <p style="margin-bottom: 5px; color: #4a5568;">If you have any questions or need a hand, our support team is always here for you.</p>
      <p style="margin-top: 0; color: #4a5568;">Happy chatting!</p>
      
      <p style="margin-top: 25px; margin-bottom: 0; color: #2d3748;">Warm regards,<br><strong>The ChatMe Team</strong></p>
    </div>
    
    <div style="text-align: center; padding: 20px; color: #a0aec0; font-size: 12px;">
      <p>© 2026 ChatMe. All rights reserved.</p>
      <p>
        <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Privacy Policy</a> • 
        <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Terms of Service</a> • 
        <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Support</a>
      </p>
    </div>
  </body>
  </html>
  `;
}
