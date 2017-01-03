var book = {
    "title":"Proessional JavaScript",
    "authors":["Nicholas Zakas"],
    edition:3,
    year:2011
};
var jsonText = JSON.stringify(book,["title","edition"]);
