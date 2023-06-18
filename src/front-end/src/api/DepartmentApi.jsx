import { delete_api, get_api, put_api } from "./Method";



export async function getAllDepartment(){
  return get_api (`https://localhost:7284/api/departments/getall`)
}

export async function getDepartmentBySlug(urlSlug = ''){
  return get_api (`https://localhost:7284/api/departments/slugDetail/${urlSlug}`)

}



export function getFilterDepartment(
  name = '',
  pageSize = 3,
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


export async function getDepartmentById(id = 0) {
  if (id > 0) {
    return get_api(`https://localhost:7284/api/departments/${id}`);
  }
}

export async function updateDepartment(id = 0, formData) {
  return put_api(`https://localhost:7284/api/departments/${id}`, formData);
}

export async function deleteDepartment(id = 0) {
  return delete_api(`https://localhost:7284/api/departments/${id}`);
}


// lấy ra giảng viên thuộc khoa qua slug của khoa
export function getUserByDepartmentSlug(slug) {
  return get_api(
    `https://localhost:7284/api/departments/user/${slug}?PageSize=11&PageNumber=1`
  );
}


// lấy ra giảng viên thuộc khoa qua slug của khoa
export function getPostByDepartmentSlug(slug) {
  return get_api(
    `https://localhost:7284/api/departments/post/${slug}?PageSize=11&PageNumber=1`
  );
}




