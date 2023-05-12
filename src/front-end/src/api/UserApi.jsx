import { get_api, put_api } from "./Method";



export async function getAllUser(){
  return get_api (`https://localhost:7284/api/users/getAll`)
}

export async function getUserDetailBySlug(urlSlug = ''){
  return get_api (`https://localhost:7284/api/users/slugDetail/${urlSlug}`)

}



export function getFilterResearch(
  name = '',
  email = '',
  pageSize = 10,
  pageNumber = 1,
  sortColumn = '',
  sortOrder = ''
) {
  let url = new URL(`https://localhost:7284/api/users`);
  name !== '' && url.searchParams.append('Name', name);
  email !== '' && url.searchParams.append('Email', email);
  sortColumn !== '' && url.searchParams.append('SortColumn', sortColumn);
  sortOrder !== '' && url.searchParams.append('SortOrder', sortColumn);
  url.searchParams.append('PageSize', pageSize);
  url.searchParams.append('PageNumber', pageNumber);

  return get_api(url.href);
}


export async function getUserResearchertById(id = 0) {
  if (id > 0) {
    return get_api(`https://localhost:7284/api/users/${id}`);
  }
}


export async function updateUserResearcher( formData) {
  return put_api(`https://localhost:7284/api/users`, formData);
}