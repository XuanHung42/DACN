using ManageProject.Core.Entities;

namespace ManageProject.API.Models.Project
{
    public class AddUserModel
    {
        public int ProjectId { get; set; }
        public IList<int> UserId { get; set; }
    }
}
