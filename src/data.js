const path = require('path');
const fs = require('fs');
const data_types = require(path.resolve('./src/data_types.json'))

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