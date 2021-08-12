require("dotenv").config();
const express = require("express");
const mongoose = require ("mongoose");
const database = require("./database/index")

//models
const BookModels = require("./database/book")
const AuthorModels = require("./database/authors")
const PublicationModels = require("./database/publications")



const app = express();
app.use(express.json());
// database connection
mongoose.connect(process.env.MONGOURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>console.log("conection estableshed"));

/* 
Route       /
Disc        get all books
Acess       public
Parameter   none
Method      GET
*/

app.get("/",(req,res)=>{
    return res.json({books:database.books})
})
/* 
Route       /
Disc        get specific book
Acess       public
Parameter   isbn
Method      GET
*/

app.get("/isbn/:isbn",(req,res)=>{
    const getSpecificbook = database.books.filter((book)=>book.ISBN === req.params.isbn);
if (getSpecificbook.length===0){
    return res.json({error:`No book fount of isbn ${req.params.isbn}`,})
} 

    return res.json({books:getSpecificbook});

}); 

/* 
Route       /c
Disc        get specific book on catogary
Acess       public
Parameter   category
Method      GET
*/

app.get("/c/:category",(req,res)=>{
    const Getbookbycategory = database.books.filter((book)=>book.category.includes(req.params.category));

if (Getbookbycategory.length===0)
{
    return res.json({error:`Can't find the books of ${req.params.category}`})
}
else
return res.json({books:Getbookbycategory});

})
/* 
Route       /a
Disc        get specific book on author
Acess       public
Parameter   author id
Method      GET
*/
app.get("/a/:author",(req,res)=>{
const Getbookofauthor = database.books.filter((book)=>book.authors.includes(parseInt(req.params.author)));

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

app.get("/author/",(req,res)=>{
    return res.json({authors:database.authors})
})

/* 
Route       /author
Disc        get a list of authors based on a book's isbn
Acess       public
Parameter   isbn
Method      GET
*/


app.get("/author/:isbn",(req,res)=>{
    const getspecificAuthoronbook = database.authors.filter((author)=>author.books.includes(parseInt(req.params.isbn)));

if (getspecificAuthoronbook === 0){
    return res.json({error:`No author fond for the book ${req.params.isbn}`});
}

return res.json({author:getspecificAuthoronbook});
});

/* 
Route       /publications
Disc        get all publications
Acess       public
Parameter   none
Method      GET
*/


app.get("/publications/",(req,res)=>{

    return res.json({publications:database.publication});
})
/* 
Route       /publications
Disc        get specific publication
Acess       public
Parameter   publication id
Method      GET
*/

app.get("/publications/:pubid",(req,res)=>{

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

app.get("/pubonbook/:isbn",(req,res)=>{
    const specificpublicationBook = database.publication.filter((author)=>author.books.includes(parseInt(req.params.isbn)));

if( specificpublicationBook.length===0){
return res.json({error:`can't find author of ${req.params.isbn}`});
}
else
{return res.json({publication: specificpublicationBook});}

});


/*
Route       /book/new
Disc        add new book
Acess       public
Parameter   none
Method      POST
*/

app.post("/book/new",(req,res)=>
{
const{ newBook }= req.body;
database.books.push(newBook);
return res.json({books: database.books,message:"book was added!"});


});


/*
Route       /author/new
Disc        add new author
Acess       public
Parameter   none
Method      POST
*/
app.post("/author/new",(req,res)=>{
    const { newAuthor}= req.body;
    database.authors.push(newAuthor);
    return res.json({authors:database.authors,message:"author war added"});
});

/*
Route       /publication/new
Disc        add new publication
Acess       public
Parameter   none
Method      POST
*/

app.post("/publication/new",(req,res)=>{
    const {newPublication}= req.body;
    database.publication.push(newPublication);
    return res.json({publication:database.publication,message:"publication was added"});
})

/*
Route       /book/update/
Disc        updating book title
Acess       public
Parameter   isbn
Method      PUT
*/

app.put("/book/update/:isbn",(req,res)=>{
database.books.forEach((book)=>{
if(book.ISBN === parseInt(req.params.isbn)){

    book.title = req.body.bookTitle;
    return;
}
});
return res.json({books:database.books});
});



/*
Route       /book/author/update
Disc        update/add new author
Acess       public
Parameter   isbn
Method      PUT
*/


app.put("/book/author/update/:isbn",(req,res)=>{

database.books.forEach((book)=>{
if(book.ISBN === parseInt(req.params.isbn))return book.authors.push(req.body.newAuthor)
});

database.authors.forEach((author)=>{
    if(author.id === req.body.newAuthor)
    return author.books.push(parseInt(req.params.isbn))
})
return res.json({
    books:database.books,
    authors:database.authors,
    message:"author and book updated"
})

})

/*
Route       /author/update/
Disc        updating author name
Acess       public
Parameter   id
Method      PUT
*/

app.put("/author/update/:id",(req,res)=>{

    database.authors.forEach((author)=>
    {if(author.id === parseInt(req.params.id) ){
        author.name = req.body.Authorname;
        return;
    }}
    )
    return res.json({authors:database.authors});
})


/*
Route       /publication/update/
Disc        updating publication name
Acess       public
Parameter   id
Method      PUT
*/

app.put("/publication/update/:id",(req,res)=>{
database.publication.forEach((publication)=>{
    if(publication.id === parseInt(req.params.id)){
        publication.name =req.body.newPubName;
        return;
    }
})
return  res.json({publication:database.publication});

})

/*
Route       /book/publication/update
Disc        update/add new author
Acess       public
Parameter   isbn
Method      PUT
*/
// app.put("/book/publication/update/:isbn",(req,res)=>{
// database.books.forEach((book)=>{
//     if(database.books.ISBN === parseInt(req.params.isbn)){
//        return book.publication=parseInt(req.body.newPublication);
//     }
// })
// database.publication.forEach((book)=>{
//     if(database.publication.id === parseInt(req.body.newPublication) ){
//         return book.books.push(parseInt(req.params.isbn))
//     }
// })


// return res.json
//     ({publication:database.publication,
//     books:database.books});
// })




app.put("/publication/update/book/:isbn",(req,res)=>{


    database.publication.forEach((publication)=>{
        if(publication.id === req.body.pubId){
            return publication.books.push(parseInt(req.params.isbn));
        }
    });

//updationg book database

database.books.forEach((book)=>{
    if(book.ISBN === parseInt(req.params.isbn)){
        book.publication = parseInt(req.body.pubId);
        return;
    }
    return res.json({books:database.books,
                     publications:database.publication,
                    message:"Successfully updated",
                });
                
});

});
/*
Route       /book/delete/
Disc        delete book using isbn
Acess       public
Parameter   id
Method      DELETE
*/

app.delete("/book/delete/:isbn",(req,res)=>{
const updatedBookDatabase = database.books.filter(
    (book)=>book.ISBN !== parseInt(req.params.isbn )

)

database.books = updatedBookDatabase;
return res.json({books:database.books});
})
/*
Route       /book/delete/author
Disc        delete a uthor from book 
Acess       public
Parameter   isbn authorid
Method      DELETE
*/

app.delete("/book/delete/author/:isbn/:authorId",(req,res)=>{
//update book database
database.books.forEach((book)=>{
    if (book.ISBN === parseInt(req.params.isbn)){
       const newAuthorList = book.authors.filter((author)=>author!== parseInt(req.params.authorId))
       book.authors = newAuthorList;
        return;
    }
})
//update book from author
database.authors.forEach((author)=>{
    if(author.id === parseInt(req.params.authorId)){
        const newauthorBook = author.books.filter((book)=>book !== parseInt(req.params.isbn)
        );
        author.books= newauthorBook;
        return;
    }
})
    return res.json({books:database.books,authors:database.authors});



});
/*
Route       /book/delete/publication
Disc        delete a book from publication 
Acess       public
Parameter   isbn publicationid
Method      DELETE
*/


app.delete("/book/delete/publication/:isbn/:pubid",(req,res)=>{
//deleting from book
database.books.forEach((book)=>{
    if(book.ISBN === parseInt(req.params.isbn)){
        book.publication = 0; //no publicatio available
        return;
    }
    
})

//deteting from publication
database.publication.filter((publication)=>{
    if(publication.id === parseInt(req.params.pubid)){
        const newpubBooklist = publication.books.filter((book)=>book !== parseInt(req.params.isbn));  
        publication.books = newpubBooklist;
        return;
    }
})
return res.json({books:database.books,publication:database.publication,message:"sucessfull in deletion"})
});

/*
Route       /author/delete/
Disc        delete author 
Acess       public
Parameter   id
Method      DELETE
*/

app.delete("/author/delete/:id",(req,res)=>{
    
      
const newAuthorList = database.authors.filter((author)=>author.id !== parseInt(req.params.id))
database.authors = newAuthorList; 
return res.json({authors:database.authors});
        
    
})

/*
Route       /publication/delete/
Disc        delete publication 
Acess       public
Parameter   pubid
Method      DELETE
*/


app.delete("/publication/delete/:id",(req,res)=>{
  const newPublication = database.publication.filter((publication)=>publication.id !== parseInt(req.params.id))
database.publication = newPublication;

return res.json({publications:database.publication});


})

app.listen(3000,()=>console.log("server started"));





//library
