using ManageProject.Core.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Core.Entities
{
	public class UserToken : IEntity
	{
		public int Id { get; set; }// Mã token 
		public string Token { get; set; }// token 
		public DateTime Expired { get; set; }// thời gian hết hạn token
		public bool Status { get; set; }// trạng thái token  ví dụ active / logout
		public int UserId { get; set; }
		public User User { get; set; }
	}
}
