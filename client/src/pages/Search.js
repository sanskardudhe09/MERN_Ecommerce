import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'

const Search = () => {
    const [values, setValues] = useSearch();
    return (
        <Layout>
            <div className='container text-center'>
                <h3>Search Results</h3>
                <h5>
                    {values?.results.length == 0 ? "No Results Found!!"
                        : `Found ${values?.results.length}`}
                </h5>
                <div className='d-flex flex-wrap'>
                    {values?.results.map((p) => (
                        <div className="card m-3" style={{ width: '25rem' }} key={p._id}>
                            <img src={`/api/product-photo/${p._id}`} className="card-img-top"
                                style={{ height: "300px" }} alt="product image" />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.desc}</p>
                                <button className='btn btn-primary ms-2'>View Details</button>
                                <button className='btn btn-secondary ms-2'>Add to Cart</button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </Layout>
    )
}

export default Search