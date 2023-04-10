﻿using ManageProject.Core.Contracts;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Core.Entities
{
    public class Post:IEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ShortDecription { get; set; }
        public string UrlSlug { get; set; }
        public string File { get; set; }
        public int UserId { get; set; }
        public int ProjectId { get; set; }
        public bool Status { get; set; }
        public DateTime Created { get; set; }
        public Department Departments { get; set; }
        public IList<Project> Projects { get; set; }
        public User User { get; set; }
    }
}