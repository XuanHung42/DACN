using System.Globalization;

namespace ManageProject.API.Models.Users
{
    public class UserEditModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string UrlSlug { get; set; }
        public DateTime BirthDate { get; set; }
    }
}
