import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { GlassMagnifier } from "react-image-magnifiers";

import { fetchProduct } from './actions/index';
import './ProductPage.css';

function ProductPage(props) {
  const [active, setActive] = useState(false);

  const productId = props.match.params.productId;

  useEffect(() => {
    props.fetchProduct(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const product = props.Products.find(({ _id }) => _id === productId)

  if (!product) {
    return <div className="loader">Loading...</div>
  }

  return (
    <>
      <button className="btn btn-secondary home" onClick={()=>window.history.back()}>Go Back</button>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 ">
            <GlassMagnifier
              className="productImg"
              imageSrc={`https://${product.image}`}
              magnifierBorderColor="grey"
              magnifierSize="30%"
              imageAlt="Product image"
            />
          </div>
          <div className="col-12 col-md-4 productDetail" >
            <h2>{product && product.brand[0].toUpperCase() + product.brand.slice(1)}</h2>
            <hr />
            <h2>{product.name}</h2>
            <hr />
            <h6>Rating:⭐⭐⭐⭐⭐</h6>
            <hr />
            <p><strong>Price:</strong> ₹{product.price}</p>
            <hr />
            <p><strong>Description:</strong>{product.description ? product.description : product.name}</p>
            <p><strong>Category:</strong>{product.category}</p>
          </div>
          <div className="col-12 col-md-3">
            <div className="card card-of-detail" >
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Price:<p className="price">₹{product.price}</p></li>
                <li className="list-group-item">Quantity:<input onClick={(e) => { if (e.target.value >= 1) setActive(true) }} type="number" min="1" max="10" ></input></li>
                <li className="list-group-item cart"><a href='/#' className={active ? "btn btn-dark" : "btn btn-dark disabled"}>Add to Cart</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
function mapStateToProps(state) {
  return { Products: state.fetchProductReducer }
}
export default connect(mapStateToProps, { fetchProduct })(ProductPage)