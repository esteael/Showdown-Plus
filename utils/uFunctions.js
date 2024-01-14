export function queryAndApply(selector, callback) {
    document.querySelectorAll(selector).forEach(callback);

}

export function getElement(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
        callback(element);
    }
}

