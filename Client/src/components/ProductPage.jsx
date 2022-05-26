import React,{useState,useEffect} from 'react';
import { GlassMagnifier } from 'react-image-magnifiers';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductPage.css';

function ProductPage(props) {
  const [product, setProduct] = useState('');
  const [active, setActive] = useState(false);

  useEffect(() => {
    console.log("useEffect called");
    const fetchData=async()=>{
      const product = await axios.get(`/api/v1/product/${props.match.params.productId}`);
      console.log(product.data.data);
      setProduct(product.data.data);
    }
  fetchData();
  }, [])
  if(!product){
    return <div class="loader">Loading...</div>
  }
  return (
    <>
    <Link class="btn btn-outline-secondary home" to="/">Home</Link>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-5 ">
            <GlassMagnifier class="productImg" imageSrc={`https://${product.image}`} imageAlt='Product image'/>
        </div>
        <div class="col-12 col-md-4 productDetail" >
          <h2>{product && product.brand[0].toUpperCase()+product.brand.slice(1)}</h2>
          <hr/>
          <h2>{product.name}</h2>
          <hr/>
          <h6>Rating:⭐⭐⭐⭐⭐</h6>
          <hr />
            <p><strong>Price:</strong> ₹{product.price}</p>
            <hr />
            <p><strong>Description:</strong>{product.description?product.description:product.name}</p>
            <p><strong>Category:</strong>{product.category}</p>
        </div>
        <div class="col-12 col-md-3">
              <div class="card card-of-detail" >
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Price:<p class="price">₹{product.price}</p></li>
                  <li  class="list-group-item">Quantity:<input onClick={(e)=>{if(e.target.value>=1)setActive(true)}} type="number" min="1" max="10" ></input></li>
                  <li class="list-group-item cart"><a href='/#'class={active?"btn btn-dark":"btn btn-dark disabled"}>Add to Cart</a></li>
                </ul>
              </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProductPage