# GET /posts
Retrieves all posts from the local API.
Returns the complete collection of available post resources.
A successful response will have a 200 OK status, and should include some kind of response body.

# GET /posts/:id
This is a GET request to retrieve the contents of a post with a given ID.
A successful response will have a 200 OK status, and should include some kind of response body, an unsuccesful response will warrant a 404 Not Found response.

# GET /posts/:id/comments
A GET request to retrieve the comments on the post with the given ID.
A succesful request returns 200 OK, an unsuccesful request returns 404 Not Found

# DELETE /posts/:id
Deletes the post with the given ID.
A succesful response (given id exists) will return 204 No Content Found, an unsuccesful response (given id does not exist) will return 404 Not Found

# POST /posts
This request submits JSON data.
A successful request returns 201 Created response code, an unsuccesful request returns a 400 response

# POST /posts/:id/comments
Adds one or more comments to the post with the given ID.
Send a JSON body containing a comments array of strings. Each string is added as a comment to the post.
Successful response is 201 Created, unsuccesful response is 404 Not Found or 400

# PUT /posts/:id
Updates a post with a given ID with a new title and content.
Send a JSON body containing title and content. A successful request returns HTTP 204.
An unsuccesful request returns 400 or 404