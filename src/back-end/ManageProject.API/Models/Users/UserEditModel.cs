using ManageProject.API.Models.Project;
using ManageProject.Core.Entities;
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
        public int DepartmentId { get; set; }
        public int RoleId { get; set; }
        public DateTime BirthDate { get; set; }
        //public string SelectProject { get; set; }
        public IFormFile ImageFile { get; set; }
        //public List<string> GetSlectedProject()
        //{
        //    return (SelectProject ?? "")
        //        .Split(new[] { ',', ';', '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries)
        //        .ToList();
        //}
        public static async ValueTask<UserEditModel> BindAsync(HttpContext context)
        {
            var form = await context.Request.ReadFormAsync();
            return new UserEditModel()
            {
                ImageFile = form.Files["ImageFile"],
                UrlSlug= (form["UrlSlug"]),
                Id = int.Parse(form["Id"]),
                Name = (form["Name"]),
                Email = (form["Email"]),
                Password = (form["Password"]),
                DepartmentId = int.Parse(form["DepartmentId"]),
                RoleId = int.Parse(form["RoleId"]),
                BirthDate = DateTime.Now
                //SelectProject= form["SelectedProject"]
               
            };
        }
    }
}
