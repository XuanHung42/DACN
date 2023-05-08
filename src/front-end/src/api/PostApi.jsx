import { get_api } from "./Method";



export async function getAllPost(){
  return get_api (`https://localhost:7284/api/posts`)
}
