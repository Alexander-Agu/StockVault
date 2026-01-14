namespace FIN.Service.EmailServices
{
    public interface IEmailService
    {
        // Sends an email to users or admins
        public Task VerificationMailAsync(string toEmail, string subject, string htmlMessage);

        public Task SendOtpEmailAsync(string email, string otp);
    }
}
