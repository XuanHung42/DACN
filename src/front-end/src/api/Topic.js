import { delete_api, get_api } from "./Method";

export async function getAllTopic(){
  return get_api (`https://localhost:7284/api/topics/getAll`)
}


export async function deleteTopic(id = 0) {
  return delete_api(`https://localhost:7284/api/topic/${id}`);
}