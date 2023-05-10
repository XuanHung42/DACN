import { get_api } from "./Method";



export async function getAllPost(){
  return get_api (`https://localhost:7284/api/posts`)
}

export async function getPostDetailBySlug(urlSlug = ''){
  return get_api (`https://localhost:7284/api/posts/slugDetail/${urlSlug}`)

}