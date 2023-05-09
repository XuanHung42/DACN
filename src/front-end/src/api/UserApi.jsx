import { get_api } from "./Method";



export async function getAllUser(){
  return get_api (`https://localhost:7284/api/users/getAll`)
}

export async function getUserBySlug(urlSlug = ''){
  return get_api (`/${urlSlug}`)

}
