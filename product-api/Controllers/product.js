const productModel = require('../Models/productModel');

exports.getProductList=async(req,res)=>{
    let query={...req.query};
try {
//FILTERING
    const excludeKey=['sort','field','page','limit'];
    excludeKey.forEach(ele=>delete query[ele]);

    let queryJson=JSON.stringify(query);
    queryJson=queryJson.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
    query=JSON.parse(queryJson);
    console.log(query);
    let queryObj =  productModel.find(query);
//SORTING
    if(req.query.sort){
        let sortBy=req.query.sort;
        sortBy=sortBy.split(',').join(' ');
        queryObj=queryObj.sort(sortBy);
    }
//PROJECTION
    if(req.query.fields){
        let fields=req.query.fields;
        fields=fields.split(',').join(' ');
        queryObj=queryObj.select(fields);
    }
// PAGINATION
console.log(req.query);
const page=Number(req.query.page)||1;
console.log(page);
const limit=Number(req.query.limit)||5;
const skip=(page-1)*limit;

queryObj=queryObj.skip(skip).limit(limit);
const productList=await queryObj;
res.status(200).json({ 
    status:"success",
    results:productList.length,
    data:productList
})
} catch (error) {
    res.status(500).json({
        message:"Some Error happened on Our Side",
        Error:error
    });
}
}

exports.getProduct=async(req,res)=>{
    const product=await productModel.findById(req.params.id);
    res.status(200).json({ 
        status:"success",
        data:product
    })
}

exports.getSearchItem=async(req,res)=>{
    let str=req.params.searchItem;
    const pattern=new RegExp(`(\\S)*${str}(\\S)*`,'ig')
    console.log({name:pattern,...req.query});

/***repeated Code***/
    let query={...req.query};
//FILTERING
    const excludeKey=['sort','field','page','limit'];
    excludeKey.forEach(ele=>delete query[ele]);

    let queryJson=JSON.stringify(query);
    queryJson=queryJson.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
    query=JSON.parse(queryJson);
    let queryObj =  productModel.find({name:pattern,...query});
//SORTING
    if(req.query.sort){
        let sortBy=req.query.sort;
        sortBy=sortBy.split(',').join(' ');
        queryObj=queryObj.sort(sortBy);
    }
//PROJECTION
    if(req.query.fields){
        let fields=req.query.fields;
        fields=fields.split(',').join(' ');
        queryObj=queryObj.select(fields);
    }
// PAGINATION
console.log(req.query);
const page=Number(req.query.page)||1;
console.log(page);
const limit=Number(req.query.limit)||5;
const skip=(page-1)*limit;

queryObj=queryObj.skip(skip).limit(limit);
const productList=await queryObj;
res.status(200).json({ 
    status:"success",
    results:productList.length,
    data:productList
})
/***repeated Code ***/
}