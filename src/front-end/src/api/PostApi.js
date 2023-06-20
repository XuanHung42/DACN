

import { delete_api, get_api, post_api } from "./Method";




export async function getAllPost(){
  return get_api (`https://localhost:7284/api/posts`)
}

export async function getAllPostByViewCount(){
  return get_api (`https://localhost:7284/api/posts/topView/3`)
}


export async function getAllLimitNewPost(){
  return get_api (`https://localhost:7284/api/posts/newPost/3`)
}

export async function getPostDetailBySlug(urlSlug = ''){
  return get_api (`https://localhost:7284/api/posts/slugDetail/${urlSlug}`)

}

export function getFilterPost(
  title = '',
  shortDescription = '',
  pageSize = 5,
  pageNumber = 1,
  sortColumn = '',
  sortOrder = ''
) {
  let url = new URL(`https://localhost:7284/api/posts/filter`);
  title !== '' && url.searchParams.append('Title', title);
  shortDescription !== '' && url.searchParams.append('ShortDescription', shortDescription);
  sortColumn !== '' && url.searchParams.append('SortColumn', sortColumn);
  sortOrder !== '' && url.searchParams.append('SortOrder', sortColumn);
  url.searchParams.append('PageSize', pageSize);
  url.searchParams.append('PageNumber', pageNumber);

  return get_api(url.href);
}



export async function getPostById(id = 0) {
  return get_api(`https://localhost:7284/api/posts/${id}`);
}



export async function updateAndAddPost(formData){
  return post_api('https://localhost:7284/api/posts',formData)
}

 




export async function updateAndAddNewPost(formData){
  return post_api('https://localhost:7284/api/posts',formData)
}

export async function deletePost(id = 0) {
  return delete_api(`https://localhost:7284/api/posts/${id}`);
}


export function getPostByResearchSlug(slug) {
  return get_api(
    `https://localhost:7284/api/users/posts/${slug}?PageSize=11&PageNumber=1`
  );
}
