using MailKit.Net.Smtp;
using MimeKit;
using System.Threading.Tasks;

namespace FIN.Service.EmailServices
{
    public class EmailService : IEmailService
    {
        private readonly string smtpServer = "smtp.gmail.com";
        private readonly int smtpPort = 587;
        private readonly string smtpUser = "testmaila67@gmail.com";
        private readonly string smtpPass = "ccyd lrnw gofv qprg";

        public async Task EMailAsync(string toEmail, string subject, string htmlMessage)
        {
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress("testmaila67@gmail.com", smtpUser));
            email.To.Add(MailboxAddress.Parse(toEmail));
            email.Subject = subject;

            email.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = htmlMessage
            };

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(smtpServer, smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(smtpUser, smtpPass);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }


        /*
         * HELPER METHOD -> sends an OTP verification email
         */
        public async Task SendOtpEmailAsync(string email, string otp)
        {
            string htmlMessage = $@"
            <body style=""margin:0; padding:0; background-color:#f4f4f4;"">
              <table width=""100%"" cellpadding=""0"" cellspacing=""0"">
                <tr>
                  <td align=""center"" style=""padding:30px;"">

                    <!-- Email Container -->
                    <table width=""600"" cellpadding=""0"" cellspacing=""0"" 
                           style=""max-width:600px; background:#ffffff; border-radius:8px; 
                                  font-family:Arial, sans-serif;"">

                      <!-- Header -->
                      <tr>
                        <td style=""background:#b11226; padding:20px; border-radius:8px 8px 0 0;"">
                          <h2 style=""margin:0; color:#ffffff;"">StockVault Security</h2>
                        </td>
                      </tr>

                      <!-- Body -->
                      <tr>
                        <td style=""padding:30px; text-align:center;"">
                          <p style=""font-size:16px; color:#333;"">
                            Use the One-Time Password below to verify your account.
                          </p>

                          <div style=""margin:25px 0; font-size:32px; font-weight:bold; 
                                      letter-spacing:6px; color:#b11226;"">
                            {otp}
                          </div>

                          <p style=""font-size:14px; color:#666;"">
                            This OTP expires in <strong>5 minutes</strong>.<br/>
                            If you didn’t request this, please ignore this email.
                          </p>
                        </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                        <td style=""padding:15px; background:#f8f8f8; border-radius:0 0 8px 8px;"">
                          <p style=""font-size:12px; color:#999; margin:0;"">
                            © {DateTime.UtcNow.Year} StockVault. All rights reserved.
                          </p>
                        </td>
                      </tr>

                    </table>

                  </td>
                </tr>
              </table>
            </body>";


            await EMailAsync(email, "Your StockVault OTP Code", htmlMessage);
        }


        /*
 * HELPER METHOD -> sends a password reset email (link-only)
 * Must NOT reveal whether the email exists
 */
        public async Task SendPasswordResetEmailAsync(string email, string resetToken)
        {
            var resetLink = $"https://stockvault.co.za/reset-password?token={resetToken}";

            string htmlMessage = $@"
            <body style=""margin:0; padding:0; background-color:#f4f4f4;"">
                <table width=""100%"" cellpadding=""0"" cellspacing=""0"">
                <tr>
                    <td align=""center"" style=""padding:30px;"">

                    <!-- Email Container -->
                    <table width=""600"" cellpadding=""0"" cellspacing=""0"" 
                            style=""max-width:600px; background:#ffffff; border-radius:8px;
                                    font-family:Arial, sans-serif;"">

                        <!-- Header -->
                        <tr>
                        <td style=""background:#b11226; padding:20px; border-radius:8px 8px 0 0;"">
                            <h2 style=""margin:0; color:#ffffff;"">StockVault Password Reset</h2>
                        </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                        <td style=""padding:30px; text-align:center;"">
                            <p style=""font-size:16px; color:#333;"">
                            We received a request to reset the password for your StockVault account.
                            </p>

                            <p style=""font-size:16px; color:#333;"">
                            Click the button below to reset your password.
                            </p>

                            <a href=""{resetLink}""
                                style=""display:inline-block; margin-top:20px; padding:12px 24px;
                                    background:#b11226; color:#ffffff; text-decoration:none;
                                    border-radius:4px; font-weight:bold;"">
                            Reset Password
                            </a>

                            <p style=""margin-top:20px; font-size:14px; color:#666;"">
                            This link will expire in <strong>15 minutes</strong>.<br/>
                            If you didn’t request a password reset, you can safely ignore this email.
                            </p>
                        </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                        <td style=""padding:15px; background:#f8f8f8; border-radius:0 0 8px 8px;"">
                            <p style=""font-size:12px; color:#999; margin:0;"">
                            © {DateTime.UtcNow.Year} StockVault. All rights reserved.
                            </p>
                        </td>
                        </tr>

                    </table>

                    </td>
                </tr>
                </table>
            </body>";

            await EMailAsync(email, "Reset your StockVault password", htmlMessage);
        }

    }
}
