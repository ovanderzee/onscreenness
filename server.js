import http from 'http'
import url from 'url'
import fs from 'fs'
import path from 'path'
import * as mimeDb from './mime-db.json' assert {type: 'json'}

const port = 9630
const moduleRoot = path.dirname(url.fileURLToPath(import.meta.url))

// https://stackoverflow.com/questions/6084360/using-node-js-as-a-simple-web-server#26354478
// https://stackoverflow.com/questions/10623798/how-do-i-read-the-contents-of-a-node-js-stream-into-a-string-variable#63361543

const mimeEntries = Object.entries(mimeDb.default)

function getMimeType(url) {
    const extension = url.match(/(?<=.)[a-z0-9]+$/)[0]
    const types = mimeEntries.filter(me => me[1]?.extensions?.includes(extension))
//    const charsOk = extOk.filter(me => me[1]?.charset?.includes(extension))
    console.log(url, extension , types[0][0])
    return extOk[0][0] || 'application/octet-stream'
}

/*
    Read the file
*/
async function streamToString(stream) {
    // lets have a ReadableStream as a stream variable
    const chunks = [];

    for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk));
    }

    return Buffer.concat(chunks).toString("utf-8");
}

const testServer = http.createServer(async function (request, response) {
    const locator = new url.URL(request.url, `http://localhost:${port}`)
    const fileStream = fs.createReadStream(moduleRoot + locator.pathname)
    const responseHeader = {}

    try {
        const contents = await streamToString(fileStream)
        const mimeType = getMimeType(locator.pathname)
        const contentType = mimeType ? {'Content-Type': mimeType} : {}
        response.writeHead(200);//, responseHeader.assign(contentType))
        response.write(contents)
    }
    catch (err) {
        // implicit 404
        response.write('<h2>nothing to serve</h2>')
        response.write('<p>' + JSON.stringify(err, null, 2) + '</p>')
    }
    finally {
        response.end()
    }
})

testServer.listen(port)

console.log('home made http server', testServer)
console.log(
    '\n------------------\n',
    'listening on port', port,
    'looking at', moduleRoot,
    '\n==================\n\n',
)
