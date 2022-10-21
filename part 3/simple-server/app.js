/* Catalog
* 0. Relative file paths must be used for non js files so './' is necessary
* 1. Built in web server module
* 2. Desired port
* 3. Creates a new web server. Each time a request is made to the server, it will register an event handler.
* 4. A header response is given which specifies the content/data type that will be returned and a status code
* 5. Specifies the actual content that will be returned/displayed, also must be converted to JSON string type
*    otherwise it will throw an error. Just like JSON strings must be converted to objects with JSON.parse
* 6. Bind the http server to listen/respond to request made to the specified port
* */

const notes = require('./notes.json') // 0.

const http = require('http')// 1.

const PORT = 3001 // 2.

const app = http.createServer((req, res) => { // 3.
    res.writeHead(200, {'Content-Type': 'application/json'}); // 4.
    res.end(JSON.stringify(notes)) // 5.
}, 'utf-8')

app.listen(PORT, () => { // 6.
    console.log(`App is now listening on port  ${PORT}`)
})
