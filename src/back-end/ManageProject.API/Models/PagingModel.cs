using ManageProject.Core.Contracts;

namespace ManageProject.API.Models
{
    public class PagingModel : IPagingParams
    {
        public int PageSize { get ; set ; }
        public int PageNumber { get ; set ; }
        public string SortColumn { get; set; } = "Id";
        public string SortOrder { get; set; } = "DESC";
    }
}
