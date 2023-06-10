using ManageProject.Core.Contracts;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Core.Entities
{
    public class Project: IEntity
    {
        public Project() { 
        Users= new List<User>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string UrlSlug { get; set; }
        public string CostProject { get; set; }
        public int UserNumber { get; set; }
        // thêm trường dữ liệu
        public DateTime StartDate { get; set; } = DateTime.Now;  // ngày bắt đầu đăng ký
		public DateTime EndDate{ get; set; }   // ngày kết thúc
        public string Note { get; set; }        // ghi chú dành cho dự án
        public bool Register { get; set; }  // trạng thái
        public int UserId { get; set; }
        public int ProcessId { get; set; }
        public int TopicId { get; set; }
        public IList<User> Users { get; set; }
        public IList<Post> Posts { get; set; }
        public Process Process { get; set; }
        public Topic Topic { get; set; }    // chủ đề lĩnh vực của dự án thuộc về lĩnh vực nào: kinh tế, giáo dục

    }
}
