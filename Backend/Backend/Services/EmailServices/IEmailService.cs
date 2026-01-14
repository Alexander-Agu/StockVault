namespace FIN.Service.EmailServices
{
    public interface IEmailService
    {
        // Creates an email service to allow sending emails
        public Task EMailAsync(string toEmail, string subject, string htmlMessage);

        // Sends an email verification email
        public Task SendOtpEmailAsync(string email, string otp);

        // Sends a forgotten password email
        public Task SendPasswordResetEmailAsync(string email, string resetToken);
    }
}
