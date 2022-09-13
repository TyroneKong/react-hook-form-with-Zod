import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'


const fetchAllPosts=()=>{
return axios.get("http://localhost:3000/posts")
}



export const useGetPosts=()=>{
    return useQuery(["posts"], fetchAllPosts)
}

const addPost=(post:any)=>{
    return axios.post("http://localhost:3000/posts",{
post
    })
}

const editPost=(id:number)=>{
return axios.get(`http://localhost:3000/posts/${id}`)


}



export const useEditPost=()=>{
    return useMutation(editPost)
}



export const useAddPost=()=>{
    return useMutation(addPost)
}