import { get_api } from "./Method";



export async function getAllDepartment(){
  return get_api (`https://localhost:7284/api/departments/getall`)
}

export async function getDepartmentBySlug(urlSlug = ''){
  return get_api (`https://localhost:7284/api/departments/slugDetail/${urlSlug}`)

}

export async function getUseBySlugDepartment(urlSlug = ''){
  return get_api (`https://localhost:7284/api/departments/user/${urlSlug}`)

}