const Router = require("express").Router();
const PublicationModel = require("../../database/publications")
/* 
Route       /publications
Disc        get all publications
Acess       public
Parameter   none
Method      GET
*/


Router.get("/",async(req,res)=>{
    const GetAllpublication =await PublicationModels.find()
        return res.json({publications:GetAllpublication});
    })



    /* 
Route       /publications
Disc        get specific publication
Acess       public
Parameter   publication id
Method      GET
*/

Router.get("/:pubid",(req,res)=>{

    const publicationOnId = database.publication.filter((publication)=>publication.id === parseInt(req.params.pubid));
    
    if(publicationOnId.length === 0){
        return res.json({error:`can't find publication on requested id ${req.params.pubid}`})
    }
    return res.json({publication:publicationOnId});
    });


    /*
Route       /publications
Disc        get specific book on publication
Acess       public
Parameter   publication id
Method      GET
*/

Router.get("/pubonbook/:isbn",(req,res)=>{
    const specificpublicationBook = database.publication.filter((author)=>author.books.includes(parseInt(req.params.isbn)));

if( specificpublicationBook.length===0){
return res.json({error:`can't find author of ${req.params.isbn}`});
}
else
{return res.json({publication: specificpublicationBook});}

});


/*
Route       /publication/new
Disc        add new publication
Acess       public
Parameter   none
Method      POST
*/

Router.post("/new",(req,res)=>{
    const {newPublication}= req.body;
    PublicationModel.create(newPublication);
    return res.json({message:"publication was added"});
})



/*
Route       /publication/update/
Disc        updating publication name
Acess       public
Parameter   id
Method      PUT
*/


Router.put("/update/:id",async(req,res)=>{

    const newpubname = await PublicationModel.findOneAndUpdate(
        {id:parseInt(req.params.id)},
        {name:req.body.newpubname},
        {new:true})
// database.publication.forEach((publication)=>{
//     if(publication.id === parseInt(req.params.id)){
//         publication.name =req.body.newPubName;
//         return;
//     }
// })
return  res.json({publication:newpubname});

})


/*
Route       /publication/delete/
Disc        delete publication 
Acess       public
Parameter   pubid
Method      DELETE
*/


Router.delete("/delete/:id",(req,res)=>{
    const newPublication = database.publication.filter((publication)=>publication.id !== parseInt(req.params.id))
  database.publication = newPublication;
  
  return res.json({publications:database.publication});
  
  
  })
  
//   Router.listen(3000,()=>console.log("server started"));
  
  module.exports = Router; 
  
  
  