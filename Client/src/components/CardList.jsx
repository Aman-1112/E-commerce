import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";

export default function CardList() {
    const [product, setProduct] = useState([]);
    const [pages, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const waiting = async () => {
            let res = await fetchProductsLocal();
            let nextProductList = res.data.data;
            setProduct((product) => {
                return [...product, ...nextProductList];
            });
            if (nextProductList.length === 0 || product.length > 100) {
                console.log(`${__dirname}//Components//products.json`);
                setHasMore(false);
            }
        };
        waiting();
    }, [pages]);

    function fetchData() {
        console.log("fetchData called");
        setPage((pages) => pages + 1);
        console.log(`pages=${pages}`);
    }
    const fetchProductsLocal = async () => {
        const res = await axios.get(`/api/v1/product/List`, {
            headers: { "Content-type": "application/json" },
            params: {
                page:pages,
                limit:8,//for smooth rendering use limit=6
            },
        });
        console.log("resonse");
        console.log(res.data);
        return res;
    };

    return (
        <>
            <InfiniteScroll
                dataLength={product.length} //This is important field to render the next data
                next={fetchData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <div className="cardList">
                    {product && product.map((ele) => {
                            return (
                                <Card 
                                key={ele.name}
                                name={ele.name}
                                imageUrl={ele.image}
                                brand={ele.brand}
                                price={ele.price}
                                />
                            );
                        })}
                </div>
            </InfiniteScroll>
        </>
    );
}
