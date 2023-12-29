import { delete_api, get_api, put_api } from "./Method";

export async function getAllProcess(){
  return get_api (`https://localhost:7284/api/processes/notrequired`)
}



export async function deleteProcess(id = 0) {
  return delete_api(`https://localhost:7284/api/processes/${id}`);
}


export async function getProcessById(id = 0) {
  if (id > 0) {
    return get_api(`https://localhost:7284/api/processes/${id}`);
  }
}


export async function newAndUpdateProcess(id = 0, formData) {
  return put_api(`https://localhost:7284/api/processes/${id}`, formData);
}
