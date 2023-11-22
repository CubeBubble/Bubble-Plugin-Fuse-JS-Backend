async function(properties, context) {

const Fuse = require('fuse.js')

const sourceLength = await properties.source.length()
const source = await properties.source.get(0, sourceLength)
const list = await Promise.all(source.map(async item => {
	return {
        id: await item.get("_id"),
        searchField: await item.get(properties.searchField)
    }
})
)

const fuseOptions = {
    threshold: properties.threshold,
    findAllMatches: properties.findAllMatches,
    ignoreLocation: properties.ignoreLocation,
	keys: [
		"searchField"
	]
}

const fuse = new Fuse(list, fuseOptions);
const result = fuse.search(properties.searchPattern)
const matches = result.map(match => {return match.item.id})

return {
    matches: matches
}

}