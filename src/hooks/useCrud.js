
import axios from 'axios'
import { useState } from 'react'
import mensajesApp from '../components/js/mensajesApp'

const useCrud = (BASEURL) => {

    //principal para respuesta de data de la API
    const [response, setResponse] = useState()
    const [message, setMessage] = useState(null);

    const handleApiSuccess = (message) => {
        setMessage(message);
    };

    const getAPI = (path) =>{
        const url =`${BASEURL}${path}`
        axios.get(url)
        .then(res =>{
            //console.log(res.data);
            setResponse(res.data)
        })
        .catch(er =>console.log(er.data))
    }

    const postAPI = (path, data) =>{
        const url =`${BASEURL}${path}`
        axios.post(url, data)
        .then(res =>{
            //console.log(res.data);
            const { message, data: responseData } = res.data;
            setResponse([...response, responseData])
            handleApiSuccess(message);
            //console.log(res.data);
        })
        .catch(er =>console.log(er.data))
    }

    const deleteAPI = (path, id) =>{
        const url =`${BASEURL}${path}${id}/`
        axios.delete(url)
        .then(res =>{
            //console.log(res.data);
            setResponse(response.filter(e => e.id !== id))
            handleApiSuccess(mensajesApp.succes);  
        })
        .catch(er =>console.log(er.data))
    }

    const updateAPI = (path, id, data) =>{
        const url =`${BASEURL}${path}${id}/`
        axios.put(url,data)
        .then(res =>{
            //console.log(res.data);
            const { message, data: responseData } = res.data;
            setResponse(response.map(e => e.id === id ? responseData : e))
            handleApiSuccess(message);
        })
        .catch(er =>console.log(er.data))
    }

    return [response, message, getAPI, postAPI, deleteAPI, updateAPI]
}

export default useCrud