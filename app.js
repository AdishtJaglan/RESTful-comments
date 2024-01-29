// get: /comments- list all comments
// post: /comments- create a new comment
// get: /comments/:id- get one commment (using id)
// patch: /comments/:id- update one comment
// delete: /comments/:id- delete a comment 

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("styles"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//harcoded "database" 
let comments = [
    {
        id: uuid(),
        username: "Todd",
        comment: "Lol that is so funny !"
    },
    {
        id: uuid(),
        username: "Skyler",
        comment: "I like to go birdwatching with my dog"
    },
    {
        id: uuid(),
        username: "Sk8tBoi",
        comment: "Plz delete your account, Tddd"
    },
    {
        id: uuid(),
        username: "onlysaywoof",
        comment: "woof woof woof"
    },
]

//listing all comments
app.get("/comments", (req, res) => {
    res.render("comments/index", { comments });
});

//creating form to input new commment
app.get("/comments/new", (req, res) => {
    res.render("comments/new");
});

//creating new commment
app.post("/comments", (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect("/comments");
});

//get a specific comments
app.get("/comments/:id", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);

    res.render("comments/show", { comment });
});

//getting comment to be updated
app.get("/comments/:id/edit", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);

    res.render("comments/edit", { comment });
});

//updating a comment
app.patch("/comments/:id", (req, res) => {
    const { id } = req.params;
    const newComment = req.body.comment;
    const foundComment = comments.find(c => c.id === id);

    foundComment.comment = newComment;

    res.redirect("/comments");
});

//deleting a comment
app.delete("/comments/:id", (req, res) => {
    const { id } = req.params;

    comments = comments.filter(c => c.id !== id);

    res.redirect("/comments");
});

//listening on port 3000
app.listen(3000, () => {
    console.log("Listening on port 3000");
});