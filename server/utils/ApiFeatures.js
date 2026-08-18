class ApiFeatures {
    constructor(query,queryStr){
        this.query = query,
        this.queryStr = queryStr
    }


    search(){
        let keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                $options:'i'
            }
        }:{}

        this.query.find({...keyword})
        return this
    }

    filter(){
        const queryStrCopy = {...this.queryStr};
        console.log("query str", queryStrCopy);

        // remove the other fields from query
        const removeFields = ['keyword','limit','page'];
        removeFields.forEach(key => delete queryStrCopy[key]);
        console.log("after filter out other keywords", queryStrCopy);
        
        this.query.find(queryStrCopy);
        return this
        
    }
}


module.exports = ApiFeatures;