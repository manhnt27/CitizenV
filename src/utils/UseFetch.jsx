import { useState, useEffect } from "react";
import axios from 'axios';
function useFetch() {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const current_token = localStorage.getItem('access_token')
        console.log(current_token)
        var header = {"Authorization": 'Bearer ' + current_token}
        axios.get('http://127.0.0.1:8000/api/home', {headers: header})
            .then(res => {
                setData(res.data);
                console.log(data);
            })
    }, []);
    return data;
  }
  export { useFetch };