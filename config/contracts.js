//BOOKMGMT Server Contracts

module.exports.protocol = "http";
module.exports.server = "localhost";
module.exports.port = "8080";
module.exports.dir="/BOOKMGMT";

/***********BOOKMGMT Page Contracts************/

module.exports.authUser = "/authService/authUser";
module.exports.addUser = "/authService/addUser";
module.exports.logoffUser = "/authService/logoffUser";

module.exports.listGenres = "/bookService/listGenres";
module.exports.listAuthors = "/bookService/listAuthors";
module.exports.createBook = "/bookService/createBook";
module.exports.listBooks = "/bookService/listBooks";
module.exports.listBookDetails = "/bookService/listBookDetails";
module.exports.deleteBook = "/bookService/deleteBook";
module.exports.editBook = "/bookService/editBook";