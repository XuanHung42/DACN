import { delete_api, get_api, put_api } from "./Method";

export async function getAllTopic(){
  return get_api (`https://localhost:7284/api/topics/getAll`)
}


export async function deleteTopic(id = 0) {
  return delete_api(`https://localhost:7284/api/topics/${id}`);
}


export async function getTopicById(id = 0) {
  if (id > 0) {
    return get_api(`https://localhost:7284/api/topics/${id}`);
  }
}

export async function CreateAndUpdateTopic(id = 0, formData) {
  return put_api(`https://localhost:7284/api/topics/${id}`, formData);
}

