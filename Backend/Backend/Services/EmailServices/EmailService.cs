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


        public async Task SendWeeCodeEmailAsync(string email, string code)
        {
            string htmlMessage = $@"
    <body style=""margin:0; padding:0; background-color:#f4f4f4;"">
        <table width=""100%"" cellpadding=""0"" cellspacing=""0"">
        <tr>
            <td align=""center"" style=""padding:30px;"">

            <table width=""600"" cellpadding=""0"" cellspacing=""0"" 
                    style=""max-width:600px; background:#ffffff; border-radius:12px;
                            font-family:Arial, sans-serif; overflow:hidden; border: 1px solid #eee;"">

                <td style=""background:#b11226; padding:30px; text-align:center;"">
                    <h2 style=""margin:0; color:#ffffff; letter-spacing:1px;"">StockVault Withdrawal</h2>
                    <p style=""color:#ff9999; margin:5px 0 0 0; font-size:14px; font-weight:bold; uppercase"">Your Cash Collection Code</p>
                </td>

                <tr>
                <td style=""padding:40px; text-align:center;"">
                    <p style=""font-size:16px; color:#666; margin-bottom:20px;"">
                        Your withdrawal request was successful. Use the code below to collect your cash at any supported retailer.
                    </p>

                    <div style=""background:#f8f9fa; border:2px dashed #b11226; padding:20px; border-radius:8px; margin:20px 0;"">
                        <span style=""font-size:12px; color:#b11226; font-weight:bold; display:block; margin-bottom:10px; text-transform:uppercase;"">
                            Your 12-Digit WeeCode
                        </span>
                        <h1 style=""font-family:'Courier New', monospace; font-size:36px; color:#333; margin:0; letter-spacing:5px;"">
                            {code}
                        </h1>
                    </div>

                    <div style=""text-align:left; background:#fff5f5; padding:20px; border-radius:8px; margin-top:30px;"">
                        <h4 style=""margin:0 0 10px 0; color:#b11226;"">How to redeem:</h4>
                        <ol style=""font-size:14px; color:#444; padding-left:20px; line-height:1.6;"">
                            <li>Visit any <strong>Checkers, Shoprite, Pick n Pay, or Boxer</strong>.</li>
                            <li>Tell the cashier you are collecting a <strong>'WeeCode'</strong>.</li>
                            <li>Provide the 12-digit code shown above.</li>
                        </ol>
                    </div>

                    <p style=""margin-top:30px; font-size:13px; color:#999;"">
                        For your security, do not share this code with anyone other than the retail cashier. 
                        StockVault staff will never ask for this code.
                    </p>
                </td>
                </tr>

                <tr>
                <td style=""padding:20px; background:#f8f8f8; text-align:center;"">
                    <p style=""font-size:12px; color:#999; margin:0;"">
                        © {DateTime.UtcNow.Year} StockVault South Africa. All rights reserved.
                    </p>
                    <p style=""font-size:11px; color:#bbb; margin-top:5px;"">
                        If you did not authorize this withdrawal, contact support immediately.
                    </p>
                </td>
                </tr>

            </table>

            </td>
        </tr>
        </table>
    </body>";

            await EMailAsync(email, "Your StockVault WeeCode - Cash Withdrawal", htmlMessage);
        }

    }
}
