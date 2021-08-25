const Router = require("express").Router();
const AuthorModel = require("../../database/authors")



/* 
Route       /a
Disc        get specific author by id
Acess       public
Parameter   author id
Method      GET
*/

Router.get("/a/id/:id",async(req,res)=>{

    GetAuthorbyId = await AuthorModel.findOne({id:parseInt(req.params.id)})
    if(GetAuthorbyId.length === 0){
        return res.json({error:`Can't find author of ${req.params.id} `});
    
    }
    return res.json({author:GetAuthorbyId});
    })


    /* 
Route       /a
Disc        get specific book on author
Acess       public
Parameter   author id
Method      GET
*/
Router.get("/a/:author",async(req,res)=>{
    const Getbookofauthor = await Bookmodel.findOne({authors:parseInt(req.params.author)}) //database.books.filter((book)=>book.authors.includes(parseInt(req.params.author)));
    
    if(Getbookofauthor.length===0){
        return res.json({error:`Can't find a book of ${req.params.author}`});
    }
    
    else
    return res.json({books:Getbookofauthor});
    });
    

    /* 
Route       /author
Disc        get all author
Acess       public
Parameter   none
Method      GET
*/

Router.get("/",async(req,res)=>{
    const getAllAuthors = await AuthorModel.find();
    return res.json({authors:getAllAuthors})
})



/* 
Route       /author
Disc        get a list of authors based on a book's isbn
Acess       public
Parameter   isbn
Method      GET
*/


Router.get("/:isbn",async(req,res)=>{
    const getspecificAuthoronbook = await AuthorModel.find({books:parseInt(req.params.isbn)});

if (getspecificAuthoronbook.length === 0){
    return res.json({error:`No author fond for the book ${req.params.isbn}`});
}

return res.json({author:getspecificAuthoronbook});
});



/*
Route       /author/new
Disc        add new author
Acess       public
Parameter   none
Method      POST
*/
Router.post("/new",async(req,res)=>{
    const { newAuthor}= req.body;
     AuthorModel.create(newAuthor)
    // database.authors.push(newAuthor);
    return res.json({message:"author war added"});
});



/*
Route       /author/update/
Disc        updating author name
Acess       public
Parameter   id
Method      PUT
*/

Router.put("/update/:id",async(req,res)=>{
  
    const NewAuthorname = await AuthorModel.findOneAndUpdate(

        {id:req.params.id},
        {name:req.body.Authorname},
        {new:true}
    );


    // database.authors.forEach((author)=>
    // {if(author.id === parseInt(req.params.id) ){
    //     author.name = req.body.Authorname;
    //     return;
    // }}
    //)
    return res.json({authors:NewAuthorname});
})


/*
Route       /author/delete/
Disc        delete author 
Acess       public
Parameter   id
Method      DELETE
*/

Router.delete("/delete/:id",(req,res)=>{
    
      
    const newAuthorList = database.authors.filter((author)=>author.id !== parseInt(req.params.id))
    database.authors = newAuthorList; 
    return res.json({authors:database.authors});
            
        
    })
    module.exports = Router;