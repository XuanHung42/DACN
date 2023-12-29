import axios from "axios";

export async function get_api(your_api) {
  try {
    const response = await axios.get(your_api);

    const data = response.data;
    // console.log("data endpoint: ", data);
    if (data.isSuccess) return data.result;
    
    else return null;


  } catch (error) {
    console.log("Error ", error.message);
    return null;
  }
}


export async function post_api(your_api, formData) {
  try {
    const response = await axios.post(your_api, formData);
    const data = response.data;
    console.log("postdata", data);
    if (data.isSuccess)
      return data.result;
    else
      return null;
  } catch (error) {
    console.log('Error', error.message);
    return null;
  }
}

export async function put_api(your_api, formData){
 
  try {
    let formDataObject = Object.fromEntries(formData.entries());
    // Format the plain form data as JSON
    let formDataJsonString = JSON.stringify(formDataObject);

    const response = await axios({
      method: 'put',
      url: your_api,
      data: formDataJsonString,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    const data = response.data;
    if (data.isSuccess){
      return data.result;
    }
    else{
      return null;
    }
  } catch (error) {
    console.log("Error ", error.message);
    return null;
  }
}


export async function delete_api(your_api){
  try {
    const response = await axios.delete(your_api);

    const data = response.data;
    if (data.isSuccess){
      return data.result;
    }
    else{
      return null;
    }

  } catch (error) {
    console.log("Error ", error.message);
    return null;
  }
}