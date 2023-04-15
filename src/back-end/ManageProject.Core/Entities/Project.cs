﻿using ManageProject.Core.Contracts;
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
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string UrlSlug { get; set; }
        public string CostProject { get; set; }
        public int UserNumber { get; set; }
        public bool Register { get; set; }
		public int UserId { get; set; }
        public IList<User> Users { get; set; }
        public IList<Post> Posts { get; set; }
		public IList<Process> Processes { get; set; }

	}
}
