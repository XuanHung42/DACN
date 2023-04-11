using ManageProject.Core.Contracts;

namespace ManageProject.Core.Collections;

public class PaginationResult<T>
{
	public IEnumerable<T> Items { get; set; }

	public PagingMetadata Metadata { get; set; }
	
	public PaginationResult(IPagedList<T> pagedList)
	{
		Items = pagedList;
		Metadata = new PagingMetadata(pagedList);
	}
}