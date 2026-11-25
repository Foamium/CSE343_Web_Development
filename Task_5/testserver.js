const express = require('express');
const app = express();

app.use(express.json());

const posts = [];
let latestid = 0;

app.get("/posts", (req, res) => {
    console.log("Sending all posts")
    return res.json(posts);
});

app.get("/posts/:id", (req, res) => {
    const given_id = parseInt(req.params.id)
    try {
        const post = posts.find(post => post.id === given_id)
        if (!post) {
            return res.status(404).send("Id not found.")
        }
        console.log(`Sending post ${given_id}`)
        return res.json(post);
    }
    catch (error) {
        console.log(error)
        return res.status(400).send("Id not found.")
    }
});

app.post("/posts", (req, res) => {
    if (!req.body || !Object.hasOwn(req.body, "title") || !Object.hasOwn(req.body, "content"))
    {
        return res.status(400).send("Request body does not match keys or is empty.")
    }
    const post = {
        "id": ++latestid,
        "title": req.body["title"],
        "content": req.body["content"],
        "comments": []
    }
    posts.push(post)
    console.log(`Adding post ${JSON.stringify(post)}`)
    return res.status(201).end()
});

app.put("/posts/:id", (req, res) => {
    const given_id = parseInt(req.params.id)
    try {
        const post_index = posts.findIndex(post => post.id === given_id)
        posts[post_index] = {...posts[post_index], "title": Object.hasOwn(req.body, "title") ? req.body["title"] : posts[post_index].title, "content": Object.hasOwn(req.body, "content") ? req.body["content"] : posts[post_index].content}
        console.log(`Updating post ${given_id}`)
        return res.status(201).end()
    }
    catch (error) {
        console.log(error)
        return res.status(400).send("Id not found.")
    }
})

app.delete("/posts/:id", (req, res) => {
    const given_id = parseInt(req.params.id)
    try {
        console.log(`Deleting post ${given_id}`)
        posts.splice(posts.findIndex((post) => post.id === given_id), 1)
        return res.status(204).end()
    }
    catch (error) {
        console.log(error)
        return res.status(400).send("Id not found.")
    }
})

app.get("/posts/:id/comments", (req, res) => {
    const given_id = parseInt(req.params.id)
    try {
        console.log(`Sending comments of post ${given_id}`)
        return res.json(posts.find(post => post.id === given_id)["comments"]);
    }
    catch (error) {
        console.log(error)
        return res.status(400).send("Id not found.")
    }
})

app.post("/posts/:id/comments", (req, res) => {
    const given_id = parseInt(req.params.id)
    const comments = req.body["comments"]
    try {
        const post_index = posts.findIndex(post => post.id === given_id)
        posts[post_index] = {...posts[post_index], "comments": comments}
        console.log(`Posting comment to post ${given_id}`)
        return res.status(201).end()
    }
    catch (error) {
        console.log(error)
        return res.status(400).send("Id not found.")
    }
})

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000")
});