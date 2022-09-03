const ProductBox=props=>{
    const {productData}=props

    return(
        <li>
            <div style={{marginTop:"32px", backgroundColor:"blue"}}>
                <h2>Name of Product: {productData.name} </h2>
                <h2>Price of Product: {productData.price} </h2>
                <h2>Category of Product: {productData.category} </h2>
            </div>
        </li>
    )
}

export default ProductBox