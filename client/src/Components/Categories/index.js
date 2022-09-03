import React from "react";
import {useState, useEffect} from "react";
import { useAuth } from "../Auth";
import Axios from "axios";
import ProductBox from "../ProductBox";




const Categories=()=>{
    const [productsData, setProductsData]=useState('')
    const [callProducts, setCallProducts]=useState(false)
    const [category, setCategory]=useState('')

console.log(productsData)



    const getProducts=async()=>{

        const response = await Axios.post("http://localhost:3005/getcategory", {
      
                category: category,
              })
              setProductsData(response.data)
              setCallProducts(true)
              
      }


    return(
        <div>
        <h2>Select Category to view products</h2>
        <div className="input-container"><label className="input-label" htmlFor="category">
                    Product Category:
                    </label>
                        <select id='category' onChange={()=>setCategory(document.getElementById("category").value)}>
                            <option >Select Category</option>
                            <option value="grocery" >Grocery</option>
                            <option value="furniture" >Furniture</option>
                            <option value="electronics" >Electronics</option>
                        </select>
                                
                    </div>
                    <button type="button" onClick={getProducts}>Get Products</button>

                    {callProducts&& <div>
                        <ul>
                    {productsData.map(product=>(
                                    <ProductBox productData={product} key={product.id}/>
                                ))}
                        </ul>
                        </div>}
        </div>
    )
}

export default Categories