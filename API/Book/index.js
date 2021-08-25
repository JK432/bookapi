//intializing Express router

const Router = require("express").Router();
const BookModel = require("../../database/book")
const AuthorModel = require("../../database/authors")

/* 
Route       /c
Disc        get specific book on catogary
Acess       public
Parameter   category
Method      GET
*/

Router.get("/c/:category",async(req,res)=>{
    const Getbookbycategory = await Bookmodel.findOne({category:req.params.category})
   // const Getbookbycategory = database.books.filter((book)=>book.category.includes(req.params.category));

if (!Getbookbycategory)
{
    return res.json({error:`Can't find the books of ${req.params.category}`})
}
else
return res.json({books:Getbookbycategory});

})


/* 
Route       /
Disc        get all books
Acess       public
Parameter   none
Method      GET
*/

Router.get("/",async(req,res)=>{
    const getAllBooks = await BookModel.find(); 
    return res.json({books:getAllBooks})
})


/* 
Route       /
Disc        get specific book
Acess       public
Parameter   isbn
Method      GET
*/

Router.get("/isbn/:isbn",async (req,res)=>{
    const getSpecificbook = await BookModel.findOne({ISBN:parseInt(req.params.isbn)})
    
    
    
       // const getSpecificbook = database.books.filter((book)=>book.ISBN === req.params.isbn);
    if (!getSpecificbook){
        return res.json({error:`No book fount of isbn ${req.params.isbn}`,})
    } 
    
        return res.json({books:getSpecificbook});
    
    }); 






/*
Route       /book/new
Disc        add new book
Acess       public
Parameter   none
Method      POST
*/

Router.post("/new",async(req,res)=>
{
const{ newBook }= req.body;
Bookmodel.create(newBook); 


return res.json({message:"book was added!"});


});



/*
Route       /book/update/
Disc        updating book title
Acess       public
Parameter   isbn
Method      PUT
*/

Router.put("/update/:isbn",async(req,res)=>{

    const updatedBook = await Bookmodel.findOneAndUpdate(
        {ISBN : parseInt(req.params.isbn),},
        {title: req.body.bookTitle,},
        {new:true,}
        );
    
    
    // database.books.forEach((book)=>{
    // if(book.ISBN === parseInt(req.params.isbn)){
    
    //     book.title = req.body.bookTitle;
    //     return;
    // }
    // });
    return res.json({books:updatedBook});
    });
    
    
    
    /*
    Route       /book/author/update
    Disc        update/add new author
    Acess       public
    Parameter   isbn
    Method      PUT
    */
    
    
    Router.put("/author/update/:isbn",async(req,res)=>{
    
        const UpdatedBook = await Bookmodel.findOneAndUpdate({
            ISBN:parseInt(req.params.isbn),
        },
        {
            $addToSet:{ authors: parseInt(req.body.newAuthor)}
        },
        {
            new:true,
        }
        )
    
    // database.books.forEach((book)=>{
    // if(book.ISBN === parseInt(req.params.isbn))return book.authors.push(req.body.newAuthor)
    // });
    
    
    const UpdatedAuthor = await AuthorModel.findOneAndUpdate({
        id:req.body.newAuthor,
    },
    {
        $addToSet:{
            books:parseInt(req.params.isbn)
        }
    
    },
    {
        new:true,
    })
    // database.authors.forEach((author)=>{
    //     if(author.id === req.body.newAuthor)
    //     return author.books.push(parseInt(req.params.isbn))
    // })
    return res.json({
        books:UpdatedBook,
        authors:UpdatedAuthor,
        message:"author and book updated"
    })
    
    })
    


    /*
Route       /book/publication/update
Disc        update/add new author
Acess       public
Parameter   isbn
Method      PUT
*/
// Router.put("/book/publication/update/:isbn",(req,res)=>{
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




Router.put("/publication/update/book/:isbn",async(req,res)=>{

    const newpubBook = await Bookmodel.findOneAndUpdate(
    {ISBN:req.params.isbn},
    {publication:parseInt(req.body.newPubid)},
    {new:true})
    
    //updationg book database
    
    const newbookPub = await PublicationModel.findOneAndUpdate(
        {id:parseInt(req.body.newPubid)},
        {$addToSet:{books:parseInt(req.params.isbn)}},
        {new:true})
    return res.json({books:newpubBook,publication:newbookPub});
    
    // database.books.forEach((book)=>{
    //     if(book.ISBN === parseInt(req.params.isbn)){
    //         book.publication = parseInt(req.body.pubId);
    //         return;
    //     }
    //     return res.json({books:database.books,
    //                      publications:database.publication,
    //                     message:"Successfully updated",
    //                 });
                    
    // });
    
    });


    
/*
Route       /book/delete/
Disc        delete book using isbn
Acess       public
Parameter   id
Method      DELETE
*/

Router.delete("/delete/:isbn",async(req,res)=>{

    const updatedBookDatabase = await Bookmodel.findOneAndDelete({
        ISBN:parseInt(req.params.isbn),
    })
    // const updatedBookDatabase = database.books.filter(
    //     (book)=>book.ISBN !== parseInt(req.params.isbn )
    
    // )
    
    // database.books = updatedBookDatabase;
    return res.json({books:updatedBookDatabase});
    })




    /*
Route       /book/delete/author
Disc        delete author from book 
Acess       public
Parameter   isbn authorid
Method      DELETE
*/

Router.delete("/delete/author/:isbn/:authorId",async(req,res)=>{
    //update book database
    const UpdatedBook = await Bookmodel.findOneAndUpdate(
        {ISBN:req.params.isbn},
        {$pull:{authors: parseInt(req.params.authorId),},},
        {new:true}
        )
    
        const UpdatedAuthor = await AuthorModel.findOneAndUpdate({id:parseInt(req.params.authorId)},{$pull:{books:parseInt(req.params.isbn)}},{new:true})
        return res.json({books:UpdatedBook,authors: UpdatedAuthor});




    // const updatedBookDatabase = await Bookmodel.findOneAndDelete({
    //     ISBN:parseInt(req.params.isbn),
    // })
    // database.books.forEach((book)=>{
    //     if (book.ISBN === parseInt(req.params.isbn)){
    //        const newAuthorList = book.authors.filter((author)=>author!== parseInt(req.params.authorId))
    //        book.authors = newAuthorList;
    //         return;
    //     }
    // })
    // //update book from author
    // return res.json({books:UpdatedBook.author,UpdatedAuthor})
    // database.authors.forEach((author)=>{
    //     if(author.id === parseInt(req.params.authorId)){
    //         const newauthorBook = author.books.filter((book)=>book !== parseInt(req.params.isbn)
    //         );
    //         author.books= newauthorBook;
    //         return;
    //     }
    // })
    //     return res.json({books:database.books,authors:database.authors});
    
    
    
    });



    /*
Route       /book/delete/publication
Disc        delete a book from publication 
Acess       public
Parameter   isbn publicationid
Method      DELETE
*/


Router.delete("/delete/publication/:isbn/:pubid",(req,res)=>{
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
    


    module.exports = Router;