const fs = require('fs');

let data_types = {
    "html": "text/html",
    "js": "text/javascript",
    "css": "text/css",
    "json": "application/json",
    "png": "image/png",
    "ico": "image/png",
    "jpg": "image/jpg",
    "gif": "image/gi",
    "svg": "image/svg+xml",
    "wav": "audio/wav",
    "mp4": "video/mp4",
    "woff": "application/font-woff",
    "ttf": "application/font-ttf",
    "eot": "application/vnd.ms-fontobject",
    "otf": "application/font-otf",
    "wasm": "application/wasm"
};

module.exports = {
    /**
     * To Do:
     * Write XML db client for modules
     * ~notU
     */
    module_client: class {
        constructor(module_name) {
            console.log(module_name)
        }
        write() {
            return
        }
        read() {
            return
        }
    },
    
    find_asset: (url) => {
        let root = "./pages";
        return new Promise((resolve, reject) => {
            fs.readFile(root+"/"+url, (err, c) => {
                if (err) {
                    console.log("[!] "+err)
                    reject()
                }
                else {
                    resolve({
                        file: c,
                        type: data_types[url.split(".").pop()]
                    })
                }
            })
        })
    }
}