using System.Globalization;

namespace ManageProject.API.Models.Users
{
    public class UserFilterModel:PagingModel
    {
        public string Name { get; set; }
    }
}
