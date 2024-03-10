import {useState, useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
export default function useCategory(){
    const [categories, setCategories] =  useState([]);
     const getCategories = async () => {
        try {
            const {data} = await axios.get(`/api/getall-category`);
            setCategories(data?.category);
        } catch (error) {
            toast.error("Something went wrong!!")
        }
     }
     useEffect(()=>{
        getCategories();
     },[])
     return categories;
}