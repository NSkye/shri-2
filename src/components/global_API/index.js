module.exports = {
    add(name, item) {
        if (!window.globalAPI) {
            window.globalAPI = {}
        }
        window.globalAPI[name] = item;
    },
    get(name) {
        if (!window.globalAPI) {
            return;
        }
        return window.globalAPI[name]
    }
}