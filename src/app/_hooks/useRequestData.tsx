"use client"

import axios from "axios"
import { useEffect, useState } from "react"

const useRequestData = (url:string, headers?:{})=>{
    const [ data, setData ] = useState([])
    const [ error, setError ] = useState([])
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ page, setPage ]= useState(false) 

    useEffect(()=>{
        setIsLoading(true)
        axios.get(url, headers)
        .then((resp)=>{
            setIsLoading(false)
            setData(resp.data)
        })
        .catch((err)=>{
            setIsLoading(false)
            setError(err.response)
        })
    },[url, page])
    return [ data, error ]
}

export default useRequestData