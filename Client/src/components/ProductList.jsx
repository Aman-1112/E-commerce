import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import { fetchAllProducts } from './actions';
import Card from './Card';

function ProductList(props) {
  const [allproducts, setAllproducts] = useState([])
  const [index, setIndex] = useState(0)
  const [items, setItems] = useState([])
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    props.fetchAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {//!
      firstUpdate.current = false;
      return;
    }
    if (props.fetchProductReducer.length !== 0) {
      setAllproducts([...props.fetchProductReducer])
    }
  }, [props])

  useEffect(() => {
    if (allproducts.length !== 0) {
      setItems([...items, ...allproducts.slice(index, index + 4)])
      setIndex(index + 4)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allproducts])


  function fetchData() {
    if (index >= allproducts.length) {
      setHasMore(false)
    } else {
      setItems([...items, ...allproducts.slice(index, index + 4)])
      setIndex(index + 4)
    }
  }
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMore}
      loader={
        <div className="m-5 d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {items.length !== 0 && (
        <div style={{ textAlign: 'center' }}>
          {items.map((ele, index) => (
            <Card
              key={index}
              id={ele._id}
              name={ele.name}
              imageUrl={ele.image}
              brand={ele.brand}
              price={ele.price}
            />
          ))}
        </div>
      )}
    </InfiniteScroll>
  )
}

function mapStateToProps(state) {
  return { fetchProductReducer: state.fetchProductReducer }
}

export default connect(mapStateToProps, { fetchAllProducts })(ProductList)
