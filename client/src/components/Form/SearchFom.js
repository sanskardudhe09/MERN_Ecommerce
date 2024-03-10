import React from 'react'
import { useSearch } from '../../context/search'
import {useNavigate} from "react-router-dom"
import {toast} from 'react-toastify'
import axios from 'axios';
const SearchFom = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const {data} =  await axios.get(`/api/search/${values.keyword}`);
        if(data){
            setValues({...values, results: data});
            navigate("/search");
        }
    } catch (error) {
        toast.error("Something went wrong!!")
    }

  }
  return (
        <div>
            <form className="d-flex me-5" role="search" onSubmit={handleSubmit}>
                <input className="form-control me-2" type="search" 
                placeholder="Search" aria-label="Search" 
                value={values.keyword}
                onChange={(e) => setValues({...values, keyword:e.target.value})}/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>     
    )
}

export default SearchFom