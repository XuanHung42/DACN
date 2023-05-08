import { get_api } from "./Method";



export async function getAllDepartment(){
  return get_api (`https://localhost:7284/api/departments/getall`)
}
