var express = require('express');
var app = express();

var fs = require('fs-extra');
var glob = require('glob');
const path = require('path');
var markdown = require('markdown-parse')

/**
 * Allows to recover all posts
 */
app.get('/content/:contentType/:postId?', (req, res) => {
    var folder = './content/'+req.params.contentType;
    var posts = [];

    if (!req.params.postId) {
        fs.readdir(path.resolve(folder), 'utf8', function (error, files) {
            if (error) throw error

            files.forEach(function (file) {
                var post = fs.readFileSync(path.resolve(folder, file), 'utf8')

                markdown(post, function (error, result) {
                    result.attributes.body = result.body;
                    posts.push(result.attributes)
                })
            })

            return res.json(posts)
        })
    } else {
        glob(folder + '/*' + req.params.postId + '.md', function (err, files) {
            var file = files[0]

            if (undefined === file) {
                return res.status(404).send('No data found')
            }

            fs.readFile(file, 'utf8', function (error, post) {
                if (error) console.error(error)
                var fileContent = {}

                markdown(post, function (error, result) {
                    result.attributes.body = result.body;
                    fileContent = result.attributes;
                })

                return res.json(fileContent)
            })
        })
    }
});

app.post('/blog', (req, res) => {
    res.end(JSON.stringify({method: "POST"}));
});

// Start the server on port 8081
const PORT = process.env.PORT || 3000;
var server = app.listen(PORT, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server api listening at http://%s:%s", host, port);
});

