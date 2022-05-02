import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";
import { Link } from 'react-router-dom';

export default function SearchList(props) {
    const [product, setProduct] = useState([]);
    const [pages, setPages] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [lte, setLte] = useState('100');
    const [realTimeLte, setRealTimeLte] = useState('100');
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [price, setPrice] = useState('price');
    const [count, setCount] = useState(1);

    useEffect(() => {
        console.log("useEffect called");
        const waiting = async () => {
            let res = await fetchProductsLocal();
            let nextProductList = res.data.data;
            setProduct(() => {
                return [...product, ...nextProductList];
            });
            if (nextProductList.length === 0 || product.length > 100) {
                console.log(`${__dirname}//Components//products.json`);
                setHasMore(false);
            }
        };
        waiting();
    }, [count, pages, lte, category, price]);

    useEffect(()=>{
        setProduct([]);
        setPages(1);
        setHasMore(true);
    },[props])
    function fetchData() {
        console.log("fetchData called");
        setPages(pages + 1);
        console.log(`pages=${pages}`);
    }
    const fetchProductsLocal = async () => {
        console.log("axios called ...");
        const res = await axios.get(`/api/v1/product/search/${props.match.params.searchItem}`, {
            headers: { "Content-type": "application/json" },
            params: {
                page: pages,
                limit: 4,
                "price[lte]": lte,
                // "price[gte]":30,
                category,
                sort: price
            },
        });
        console.log("resonse");
        console.log(res.data);
        return res;
    };
    function handleFilter() {
        console.log('Apply Filter called')
        setLte(realTimeLte);
        setCategory(selectedCategory);
        ///***** */
        var select = document.querySelector('.form-select');
        var value = select.options[select.selectedIndex].value;
        if (value === 'Desc') {
            setPrice('-price');
        }
        else {
            setPrice('price');
        }
        ///*** */
        setCount(count + 1);
        setProduct([]);
        setPages(1);
        setHasMore(true);
    }
    function toggle(e) {
        if (selectedCategory.includes(e.target.id)) {
            let x = selectedCategory.filter((ele) => ele !== e.target.id);
            setSelectedCategory(x)
        }
        else {
            setSelectedCategory([...selectedCategory, e.target.id])
        }
    }
    return (
        <>             
        <Link className="btn btn-outline-secondary home " to="/">Home</Link>
            <div>
                <input type="range" onChange={(e) => setRealTimeLte(e.target.value)} value={realTimeLte} min="0" max="100" id="customRange3" />
                <p>less than:{realTimeLte}</p>
                <p>Category</p>
                <div className="d-block">
                    <input onClick={toggle} type="checkbox" id="men"></input>
                    <label htmlFor="men">men</label>
                </div >
                <div className="d-block">
                    <input onClick={toggle} type="checkbox" id="women"></input>
                    <label htmlFor="women">women</label>
                </div>
                <div className="d-block">
                    <input onClick={toggle} type="checkbox" id="electronics"></input>
                    <label htmlFor="electronics">electronics</label>
                </div>

                <h6>Sort By Price</h6>
                <select className="form-select" >
                    <option value="Asc">Asc</option>
                    <option value="Desc">Desc</option>
                </select>
                <button onClick={handleFilter}>Apply Filter</button>
            </div>


            <InfiniteScroll
                dataLength={product.length} //This is important field to render the next data
                next={fetchData}
                hasMore={hasMore}
                loader={<div className="m-5 d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <div className="cardList">
                    {product && product.map((ele, index) => {
                        return (
                            <Card
                                key={index}
                                id={ele._id}
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

// import { Link } from 'react-router-dom';
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import InfiniteScroll from "react-infinite-scroll-component";
// import Card from "./Card";

// function SearchList(props) {
//     const [product, setProduct] = useState([]);
//     const [pages, setPage] = useState(1);
//     const [hasMore, setHasMore] = useState(true);

//     useEffect(() => {
//         console.log("UseEffect Called");
//         const waiting = async () => {
//             let res = await fetchProductsLocal();
//             let nextProductList = res.data.data;
//             setProduct((product) => {
//                 return [...product, ...nextProductList];
//             });
//             if (nextProductList.length === 0 || product.length > 100) {
//                 console.log(`${__dirname}//Components//products.json`);
//                 setHasMore(false);
//             }
//         };
//         waiting();

//     }, [pages, props]);//mind

//     function fetchData() {
//         console.log("fetchData called");
//         setPage((pages) => pages + 1);
//         console.log(`pages=${pages}`);
//     }
//     const fetchProductsLocal = async () => {
//         const res = await axios.get(`/api/v1/product/search/${props.match.params.searchItem}`, {//mind
//             headers: { "Content-type": "application/json" },
//             params: {
//                 page: pages,
//                 limit: 4,
//             },
//         });
//         console.log("resonse");
//         console.log(res.data);
//         return res;
//     };

//     return (
//         <>
//             <Link className="btn btn-outline-secondary home" to="/">Home</Link>
//             <InfiniteScroll
//                 dataLength={product.length}
//                 next={fetchData}
//                 hasMore={hasMore}
//                 loader={<div className="m-5 d-flex justify-content-center">
//                             <div className="spinner-border" role="status">
//                                 <span className="visually-hidden">Loading...</span>
//                             </div>
//                         </div>}
//                 endMessage={
//                     <p style={{ textAlign: "center" }}>
//                         <b>Yay! You have seen it all</b>
//                     </p>
//                 }
//             >
//                 <div className="cardList">
//                     {product && product.map((ele) => {
//                         return (
//                             <Card
//                                 key={ele._id}
//                                 id={ele._id}
//                                 name={ele.name}
//                                 imageUrl={ele.image}
//                                 brand={ele.brand}
//                                 price={ele.price}
//                             />
//                         );
//                     })}
//                 </div>
//             </InfiniteScroll>
//         </>
//     );
// }

// export default SearchList;
