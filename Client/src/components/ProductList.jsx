import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import { fetchAllProducts } from './actions';
import Card from './Card';

function ProductList(props) {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    props.fetchAllProducts(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const firstUpdate = useRef(true);

  useEffect(() => {//WILL NOT RUN ON INITIAL RENDER so we used firstUpdate
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (props.fetchProductReducer.length < (page * 4)) {//where 4 is limit
      setHasMore(false);
    }
    setProductList(props.fetchProductReducer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  function fetchData() {
    setPage(page + 1);
  }

  useEffect(() => {
    if (productList.length !== 0) {
      props.fetchAllProducts(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  return (
    <InfiniteScroll
      dataLength={productList.length}
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
      {productList.length !== 0 && (
        <div style={{ textAlign: 'center' }}>
          {productList.map((ele, index) => (
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

