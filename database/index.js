let books=[
{
ISBN:43021,
title:"code with jk",
authors:[1,2],
language:"en",
pubdate:"2001-07-07",
numofpage:225,
category:["programing","tech","fiction"],
publication:1,
},

{
ISBN:43022,
title:"advanced c programing",
authors:[2],
language:"hi",
pubdate:"2002-07-07",
numofpage:2525,
category:["programing",],
publication:1,
},

{
    ISBN:43023,
    title:"legends of modi",
    authors:[1],
    language:"hi",
    pubdate:"2014-08-05",
    numofpage:600,
    category:["lifeskills","biography"],
    publication:1,
 },

 {
     ISBN:43024,
     title:"A Backward Place",
     authors:[2,3],
     language:"en",
     pubdate:"2014-09-9",
     numofpage:200,
     category:["science","crime"],
     publication:3
 },
 {
    ISBN:43025,
    title:"A Bend in the Ganges",
    authors:[3,2],
    language:"hi",
    pubdate:"2006-08-05",
    numofpage:600,
    category:["romance","love"],
    publication:3
}, {
    ISBN:43026,
    title:"A Bend in the River",
    authors:[4],
    language:"ma",
    pubdate:"2016-08-05",
    numofpage:650,
    category:["crime","adventure"],
    publication:3
},
{
    ISBN:43027,
    title:"Back to Methuselah",
    authors:[5,4],
    language:"en",
    pubdate:"2009-08-05",
    numofpage:900,
    category:["lifestyle","family"],
    publication:2
}, {
    ISBN:43028,
    title:"Beyond Belief",
    authors:[1,5],
    language:"mal",
    pubdate:"2014-09-05",
    numofpage:800,
    category:["religious",],
    publication:1
}, {
    ISBN:43029,
    title:"Bin Laden–The Man Who Declared War on America",
    authors:[2,4],
    language:"en",
    pubdate:"2003-09-06",
    numofpage:600,
    category:["war","america"],
    publication:3
}, {
    ISBN:43030,
    title:"Business Legends",
    authors:[2,3,5],
    language:"en",
    pubdate:"2009-04-15",
    numofpage:900,
    category:["business","money"],
    publication:2
}, {
    ISBN:43031,
    title:"Childe Harold's Pilgrimage",
    authors:[2,5],
    language:"en",
    pubdate:"2016-12-25",
    numofpage:600,
    category:["children","science"],
    publication:2
},  {
    ISBN:43033,
    title:"Comus",
    authors:[6,1],
    language:"en",
    pubdate:"2020-04-06",
    numofpage:1600,
    category:["adventure","science"],
    publication:3
},

]
let authors = [
{

    id:1,
    name:"jayakrishnan",
    books:[43021],
},
{
    id:2,
    name:"Nabdagopal",
    books:[43022,43023,43021],

},
{
    id:3,
    name:"Maxim Gorky",
    books:[43026,43033,43031],
    
},

{
    id:4,
    name:"Thomas Paine ",
    books:[43028,43029,43030],
    
},
{
    id:5,
    name:" Rabindranath Tagore",
    books:[43030,43022,43024],
    
},

];
const publication = [

{
    id:1,
    name:"jkpublications",
    books:[43021,43022,43030],
},
{
    id:2,
    name:"NGpublications",
    books:[43023,43022],
},
{
    id:3,
    name:"Sreepadmam",
    books:[43023,43022,43024,43025,43026,43027,43028,43029,43030,43031,43032,43033,],
},

];
module.exports={books,authors,publication}