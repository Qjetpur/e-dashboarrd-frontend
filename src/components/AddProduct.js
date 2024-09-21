import React from 'react';
import { useNavigate } from 'react-router-dom';
const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompnay] = React.useState('');
    const navigate=useNavigate();

    const addProduct = async () => {
        const token = localStorage.getItem('token'); 
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        try {
            
        let result = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`,  
            }
       

        });
        if (result.status === 401) {
         
            // navigate('/login');
        } else {
            result = await result.json();
            console.log(result);
        }
    }catch (error) {
        console.error("Error adding product:", error);
    }

    }

    return (
        <div className='product'>
            <h1>Add Product</h1>
            <input type="text" placeholder='Enter product name' className='inputBox'
                value={name} onChange={(e) => {setName(e.target.value)}}
            />
         

            <input type="text" placeholder='Enter product price' className='inputBox'
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />
         

            <input type="text" placeholder='Enter product category' className='inputBox'
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            />
           

            <input type="text" placeholder='Enter product company' className='inputBox'
                value={company} onChange={(e) => { setCompnay(e.target.value) }}
            />
          


            <button onClick={addProduct} className='appButton'>Add Product</button>
        </div>
    )
}

export default AddProduct;