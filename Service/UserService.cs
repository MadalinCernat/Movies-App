using System.Collections.Generic;
using MoviesAPI.Models;
using MoviesAPI.Repository;

namespace MoviesAPI.Service
{
    public class UserService
    {
        private readonly IRepository<User> _userRepository;

        public UserService(IRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _userRepository.GetAll();
        }

        public User GetUserById(string id)
        {
            return _userRepository.GetById(id);
        }

        public void AddUser(User user)
        {
            _userRepository.Add(user);
        }

        public void UpdateUser(string id, User updatedUser)
        {
            try
            {
                _userRepository.Update(id, updatedUser);
            }
            catch (KeyNotFoundException)
            {
                throw;
            }
        }

        public void DeleteUser(string id)
        {
            try
            {
                _userRepository.Delete(id);
            }
            catch (KeyNotFoundException)
            {
                throw;
            }
        }
    }
}
