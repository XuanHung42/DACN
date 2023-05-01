using ManageProject.Core.DTO;
using ManageProject.Services.Manage.Departments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Services.Manage.Posts
{
	public interface IPostRepository
	{
		// get all
		Task<IList<PostItem>> GetAllPostAsync(
			CancellationToken cancellationToken = default);
	}
}
