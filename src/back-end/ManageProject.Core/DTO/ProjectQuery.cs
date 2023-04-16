using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Core.DTO
{
    public class ProjectQuery
    {
        public string Keyword { get; set; } = "";
        public string UserSlug { get; set; } = " ";
        public string PostsSlug { get; set; }=" ";
    }
}
