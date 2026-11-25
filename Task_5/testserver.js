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
    const post = posts.find(post => post.id === given_id)
    if (!post) {
        return res.status(404).send("Id not found.")
    }
    console.log(`Sending post ${given_id}`)
    return res.json(post);
});

app.get("/posts/:id/comments", (req, res) => {
    const given_id = parseInt(req.params.id)
    const post = posts.find((post => post.id === given_id))
    if (!post) {
        return res.status(404).send("Id not found.")
    }
    console.log(`Sending comments of post ${given_id}`)
    return res.json(post["comments"]);
})

app.delete("/posts/:id", (req, res) => {
    const given_id = parseInt(req.params.id)
    console.log(`Deleting post ${given_id}`)
    const post_index = posts.findIndex((post) => post.id === given_id)
    if (post_index === -1) {
        return res.status(404).send("Id not found.")
    }
    posts.splice(post_index, 1)
    return res.status(204).end()
})

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

app.post("/posts/:id/comments", (req, res) => {
    const given_id = parseInt(req.params.id)
    if (!req.body || !Array.isArray(req.body["comments"])){
        return res.status(400).send("Request body must contain a 'comments' array.")
    }
    const comments = req.body["comments"]
    const post_index = posts.findIndex(post => post.id === given_id)
    if (post_index === -1) {
        return res.status(404).send("Id not found.")
    }
    posts[post_index] = {...posts[post_index], "comments": [...posts[post_index]["comments"], ...comments]}
    console.log(`Posting comment to post ${given_id}`)
    return res.status(201).end()
})

app.put("/posts/:id", (req, res) => {
    if (!req.body || (!Object.hasOwn(req.body, "title") && !Object.hasOwn(req.body, "content"))){
        return res.status(400).send("Request body does not match keys or is empty.")
    }
    const given_id = parseInt(req.params.id)
    const post_index = posts.findIndex(post => post.id === given_id)
    if (post_index === -1) {
        return res.status(404).send("Id not found.")
    }
    posts[post_index] = {...posts[post_index], "title": Object.hasOwn(req.body, "title") ? req.body["title"] : posts[post_index].title, "content": Object.hasOwn(req.body, "content") ? req.body["content"] : posts[post_index].content}
    console.log(`Updating post ${given_id}`)
    return res.status(204).end()
})

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000")
});