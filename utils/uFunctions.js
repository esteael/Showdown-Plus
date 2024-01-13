window.UFunctions = (function() {
    function queryAndApply(selector, callback) {
        document.querySelectorAll(selector).forEach(callback);
    }

    function getElement(selector, callback) {
        const element = document.querySelector(selector);
        if (element) {
            callback(element);
        }
    }

    return {
        queryAndApply: queryAndApply,
        getElement: getElement
    };
})();
