import React from 'react';
import  '../components/Card.css';
function Card(props) {
    return (
        <div className="card ">
            <img className="card-img-top" src={`http://${props.imageUrl}`} alt="..." />
            <div className="card-body">
                <h5 className="card-title">{props.brand}</h5>
                <p>Rating:⭐⭐⭐⭐⭐</p>
                <p>Rs{props.price * 100}</p>
                {/* <p className="card-text">{props.name}</p> */}
            </div>
        </div>
    )
}

export default Card
