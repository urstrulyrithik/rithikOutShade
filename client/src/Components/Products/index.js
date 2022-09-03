import {useState, useEffect} from "react";
import { useAuth } from "../Auth";
import Axios from "axios";
import ProductBox from "../ProductBox";

const Products=()=>{
  const auth =useAuth()
  const [productName, setProductName]=useState('')
  const [productPrice, setProductPrice]=useState('')
  const [category, setCategory]=useState('')
  const [showAddErr, setAddErr]=useState(false)
  const [errorMsg, setErrMsg]=useState('')
  const [displayProducts, setDisplayProducts]=useState(false)
  const [productsData, setProductsData]=useState('')
console.log(productsData)



  const callProducts=async()=>{
        
    const response=await Axios.get("http://localhost:3005/getproducts")
    console.log(response.data)
    setProductsData(response.data)
    setDisplayProducts(true)
  }
        
  async function addProduct(event) {

        event.preventDefault();
        // const { username, password } = this.state
        if (category === "" || productName === "" || productPrice === "") {
            setErrMsg("Please fill all entries");
            setAddErr(!showAddErr);
        } else {
            setAddErr(false);
            const response = await Axios.post("http://localhost:3005/addproduct", {
                productName: productName,
                productPrice: productPrice,
                category: category
            });

            console.log(response);
            const data = await response.data;
            console.log(data);

            if (data) {
                setCategory('select');
                setProductName('');
                setProductPrice('');
            }

        }


    }



    return(
        <div>
            <button onClick={callProducts}>Display Products</button>
              {displayProducts && <div>
                               <ul>
                                {productsData.map(product=>(
                                    <ProductBox productData={product} key={product.id}/>
                                ))}
                                </ul>  
              </div>  }


                <div>
                <h1>Edit your products {auth.user}</h1>
                <form className="form-container" onSubmit={addProduct}>
                
                <h2 style={{color:"white"}}>Add product</h2>

                <div className="input-container"> <label className="input-label" htmlFor="name">
                    Product Name:
                    
                    </label>
                    <input
                    type="text"
                    id="name"
                    className="username-input-field"
                    value={productName}
                    onChange={(e)=> setProductName(e.target.value)}
                    placeholder="Product Name"
                    /></div>
                <div className="input-container"><label className="input-label" htmlFor="price">
                    Product Price in Rupees:
                    
                    </label>
                    <input
                    type="number"
                    id="price"
                    className="username-input-field"
                    value={productPrice}
                    onChange={(e)=> setProductPrice(e.target.value)}
                    placeholder="Product Price"
                    /></div>
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
                <button type="submit" className="login-button">
                    Add Item
                </button>
                
                {showAddErr && <p className="error-message">*{errorMsg}</p>}
                </form>
                </div>       
        </div>
    )
}

export default Products