import { delete_api, get_api, post_api, put_api } from "./Method";



export async function getAllProject(){
  return get_api (`https://localhost:7284/api/projects/getAll`)
}

// 
export function getFilterProject(
  name = '',
  pageSize = 5,
  pageNumber = 1,
  sortColumn = '',
  sortOrder = ''
) {
  let url = new URL(`https://localhost:7284/api/projects`);
  name !== '' && url.searchParams.append('Name', name);
  sortColumn !== '' && url.searchParams.append('SortColumn', sortColumn);
  sortOrder !== '' && url.searchParams.append('SortOrder', sortColumn);
  url.searchParams.append('PageSize', pageSize);
  url.searchParams.append('PageNumber', pageNumber);

  return get_api(url.href);
}



export async function getProjectById(id = 0) {
  
    return get_api(`https://localhost:7284/api/projects/${id}`);
  }



export async function deleteProject(id = 0) {
  return delete_api(`https://localhost:7284/api/projects/${id}`);
}


export async function updateAndAddProject(formData){
  return post_api('https://localhost:7284/api/projects',formData)
}



export async function getProcessListCombobox() {
  return get_api(`https://localhost:7284/api/processes/combobox`);
}



export async function getTopicListCombobox() {
  return get_api(`https://localhost:7284/api/topics/combobox`);
}


// lấy ra dự án qua slug của nhà khoa học
export function getProjectByResearchSlug(slug) {
  return get_api(
    `https://localhost:7284/api/projects?UserSlug=${slug}&PageSize=10&PageNumber=1`
  );
}



export function getProjectByResearchId(id) {
  return get_api(
    `https://localhost:7284/api/projects?UserId=${id}&PageSize=10&PageNumber=1`
  );
}