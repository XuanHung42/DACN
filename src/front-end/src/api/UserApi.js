
import axios from "axios";
import { delete_api, get_api, post_api, put_api } from "./Method";



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

export async function getUserProfileById(id = 0) {
  if (id > 0) {
    return get_api(`https://localhost:7284/api/users/${id}`);
  }
}



export async function updateUserResearcher( formData) {
  return post_api(`https://localhost:7284/api/users`, formData);
}

export async function updateProfileUser( formData) {
  return post_api(`https://localhost:7284/api/users`, formData);
}


export async function deleteUserResearcher(id = 0) {
  return delete_api(`https://localhost:7284/api/users/${id}`);
}


export async function getUserFilterRole() {
  return get_api(`https://localhost:7284/api/users/get-filter`);
}


export async function getUserFilterDepartment() {
  return get_api(`https://localhost:7284/api/users/filterDepartment`);
}

export async function addProjectsToUser(userId , projectId) {
  try {
    const response = await axios.post(`https://localhost:7284/api/users/addProjects?userId=${userId}`, projectId);


    if (response.status === 201) {

      console.log(response.data.message);
    } else {
  
      console.log(response.data.message);
    }
  } catch (error) {
    
    console.error(error);
  }
}