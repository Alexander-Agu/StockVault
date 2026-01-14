using Backend.Entities;

namespace Backend.Repository.UserRepository
{
    public interface IUserRepository
    {
        /*
         * TODO: Save database changes
         */
        public Task SaveChanges();


        /*
         * TODO: Uses the user entity to add new user to the Database
        */
        public void AddUserAsync(User user);


        /*
         * TODO: Checks if email exists
         */
        public Task<bool> EmailExistsAsync(string email);


        /*
         * TODO: Fetches user by email
         */
        public Task<User> GetUserByEmailAsync(string email);


        /*
         * TODO: Fetches user by id
         */
        public Task<User> GetUserByIdAsync(int id);


        /*
         * TODO: Find user by password token
         */
        public Task<User> GetUserByPasswordToken(string passwordToken);
    }
}
