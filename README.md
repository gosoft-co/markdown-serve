# Markdown Serve
REST API built in TS.ED using markdown files to serve content

The purpose of this project is to create an api for the creation and edition of the markdown files of the content/ and archetypes/ directories

## Install

npm install

## Run server

npm run start

## API
## content/:contentType
### GET
http://localhost:3000/api/v1/content/blog
output: 
```[{post1}, {post2}, {etc}, {etc}]```

### POST
http://localhost:3000/api/v1/content/blog/my-first-post

Body
```
{
	"attributes": {
		"title": "My first post",
		"description": "Post description",
		"draft": false
	},
	"body": "#New Post - My first post"
}
```
