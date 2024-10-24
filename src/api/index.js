import axios from 'axios'

export const BASE_URL = 'http://localhost:5115/';
export const END_POINTS = {
    participant: 'Participant',
    question: 'Question'
}


export const creatAPIEndpoint = endpoint => {
    let url = BASE_URL + "api/" +endpoint + '/';

    return {
        get: () => axios.get(url),
        getById: id => axios.get(url + id),
        post: newRecord => axios.post(url, newRecord),
        put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id)
    }
};