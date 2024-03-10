import React from 'react'

const CategoryForm = ({value, setValue, handleSubmit}) => {
    return (
        <>
            <form className='w-50' onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <input type="text" value={value}className="form-control" 
                    onChange={(e)=> setValue(e.target.value)}placeholder="Enter category" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default CategoryForm