using ManageProject.Core.Contracts;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Core.Entities
{
    public class Process :IEntity
    {
        public int Id { get; set; }
        public string ExcutionTime { get; set; }
        public int CheckProcessId { get; set; }
		//public CheckProcess CheckProcess { get; set; }
		//Hello

		public Project Project { get; set; }
		public IList<CheckProcess> CheckProcesses { get; set; }


	}
}
