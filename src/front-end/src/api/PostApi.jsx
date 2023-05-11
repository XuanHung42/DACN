import { get_api } from "./Method";



export async function getAllPost(){
  return get_api (`https://localhost:7284/api/posts`)
}

export async function getPostDetailBySlug(urlSlug = ''){
  return get_api (`https://localhost:7284/api/posts/slugDetail/${urlSlug}`)

}


export function getFilterPost(
  title = '',
  shortDescription = '',
  pageSize = 10,
  pageNumber = 1,
  sortColumn = '',
  sortOrder = ''
) {
  let url = new URL(`https://localhost:7284/api/users`);
  title !== '' && url.searchParams.append('Title', title);
  shortDescription !== '' && url.searchParams.append('ShortDescription', shortDescription);
  sortColumn !== '' && url.searchParams.append('SortColumn', sortColumn);
  sortOrder !== '' && url.searchParams.append('SortOrder', sortColumn);
  url.searchParams.append('PageSize', pageSize);
  url.searchParams.append('PageNumber', pageNumber);

  return get_api(url.href);
}

