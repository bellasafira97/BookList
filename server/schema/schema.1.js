const graphql = require('graphql');
const _ = require('lodash'); //look into an array
const Book = require('../models/books');
const Author = require('../models/authors');
// const Album = require('../models/album');

const {
    GraphQLObjectType,
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

// dummy data
var books = [
    {name:'Name of the Wind', genre:'Fantasy', id:'1', authorId:'1'},
    {name:'The Final Empire', genre:'Fantasy', id:'2', authorId:'3'},
    {name:'The Long Earth', genre:'Sci-Fi', id:'3', authorId:'2'},
    {name:'The Long Earth 2', genre:'Sci-Fi', id:'4', authorId:'2'},
];

var authors = [
    {name:'Patrick R', age:44, id:'1'},
    {name:'Brandon S', age:42, id:'2'},
    {name:'Terry Pratchett', age:66, id:'3'},
]

const BookType = new GraphQLObjectType({
    name : 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name:{type: GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent, args){
                console.log(parent);
                return _.find(authors, {id:parent.authorId})
                
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name : 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name:{type: GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorId:parent.id})
            }
        }
    })
});

// const AlbumType = new GraphQLObjectType({
//     name : 'Album',
//     fields: () => ({
//         id: {type: GraphQLID},
//         name:{type: GraphQLString},
//         released:{type:GraphQLInt},
//         author:{
//             type: new GraphQLList(AuthorType),
//             resolve(parent, args){
                
//             }
//         }
//     })
// });

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type: GraphQLID}},
            resolve(parent, args){
                // code to get data from database
                // console.log(typeof(args.id));
                return _.find(books,{id:args.id});
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type: GraphQLID}},
            resolve(parent, args){
                // code to get data from database
                // console.log(typeof(args.id));
                return _.find(authors,{id:args.id});
            }
        },
        // album:{
        //     type:AlbumType,
        //     args:{id:{type:GraphQLID}},
        //     resolve(parent, args){
                
        //     }
        // },
        // to get all the data 
        books:{
            type:GraphQLList(BookType),
            resolve(parent, args){
                return books 
            }
        },
        authors:{
            type:GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        },
        // album:{
        //     type:GraphQLList(AlbumType),
        //     resolve(parent,args){

        //     }
        // }
    }
})

// const Mutation = new GraphQLObjectType({
//     name:'Mutation',
//     fields:{
//         addBook:{
//             type: BookType,
//             args:{
//                 name:{type:GraphQLString},
//                 genre:{type:GraphQLString},
//                 authorId:{type:GraphQLID}
//             },
//             resolve(parent,args){
//                 let book = new Book({
//                     name:args.name,
//                     genre:args.genre,
//                     authorId: args.authorId
//                 });
//                 return book.save()
//             }
//         },
//         addAuthor:{
//             type: AuthorType,
//             args:{
//                 name:{type:GraphQLString},
//                 age:{type:GraphQLInt}
//             },
//             resolve(parent,args){
//                 let author = new Author({
//                     name:args.name,
//                     age:args.age
//                 });
//                 return author.save()
//             }
//         },
//         // addAlbum:{
//         //     type: AlbumType,
//         //     args:{
//         //         name:{type:GraphQLString},
//         //         released:{type:GraphQLInt},
//         //         authorId:{type:GraphQLString},
//         //     },
//         //     resolve(parent,args){
//         //         let album = new Album({
//         //             name:args.name,
//         //             released:args.released,
//         //             authorId:args.authorId
//         //         });
//         //         return album.save()
//         //     }
//         // }
//     }
// })

module.exports = new GraphQLSchema({
    query: RootQuery,
    // mutation: Mutation
})