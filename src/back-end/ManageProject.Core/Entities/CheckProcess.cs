using ManageProject.Core.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Core.Entities
{
    public class CheckProcess:IEntity
    {
        public int Id { get; set; }
        public bool Start { get; set; }
        public bool StartMaking { get; set; }
        public bool WriteReport { get; set; }
        public bool Complete { get; set; }
        public bool Status { get; set; }
        
    }
}
