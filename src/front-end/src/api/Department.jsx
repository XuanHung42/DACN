import { get_api } from "./Method";



export async function getAllDepartment(){
  return get_api (`https://localhost:7284/api/departments/getall`)
}

export async function getDepartmentBySlug(urlSlug = ''){
  return get_api (`https://localhost:7284/api/departments/slugDetail/${urlSlug}`)

}



export function getFilterDepartment(
  name = '',
  pageSize = 10,
  pageNumber = 1,
  sortColumn = '',
  sortOrder = ''
) {
  let url = new URL(`https://localhost:7284/api/departments`);
  name !== '' && url.searchParams.append('Name', name);
  sortColumn !== '' && url.searchParams.append('SortColumn', sortColumn);
  sortOrder !== '' && url.searchParams.append('SortOrder', sortColumn);
  url.searchParams.append('PageSize', pageSize);
  url.searchParams.append('PageNumber', pageNumber);

  return get_api(url.href);
}

