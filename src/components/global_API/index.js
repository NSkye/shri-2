const globalAPI = {}

module.exports = {
    add(name, item) {
        globalAPI[name] = item;
    },
    get(name) {
        return globalAPI[name]
    }
}