module.exports = {
    collect: (req) => {
		  return new Promise((resolve, reject) => {
			  let buffer = "";
			  req.on('data', (chunk) => {buffer+=chunk})
			  req.on('error', (err) => reject(err))
			  req.on('end', () => {resolve(JSON.parse(buffer))})
		  })
    },

    set: (req) => {
			return new Promise((resolve) => {
				let data = req.url.split("/");
				switch (req.url) {
					case "/": // intial website load
						page = "index", asset = "index.html"
						break
					case "/favicon.ico": // **** you google
						page = "global", asset = "favicon.ico"
						break
					case req.url.match(/[\s\S]*\/\w+/)[0]: // inital page load ex (/account)
						page = data[1], asset = "index.html"
						break
					default: // already set in req.url
						page = data[1], asset = data[2]
				}
				resolve(page+"/"+asset)
			})
		}
}