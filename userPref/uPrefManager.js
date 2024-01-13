 window.UserPrefManager = (function() {
    function queryAndApply(selector, callback) {
        document.querySelectorAll(selector).forEach(callback);
    }

    function getElement(selector, callback) {
        const element = document.querySelector(selector);
        if (element) {
            callback(element);
        }
    }

    function changeTextColor() {
        const savedColor = localStorage.getItem("usernametextColor") || "#000000";

        queryAndApply(".username", (e) => {
            e.style.color = savedColor;
        });

        const currentUserElement = document.querySelector('.userbar .username');
        if (currentUserElement) {
            const currentUserUsername = currentUserElement.getAttribute('data-name').trim();
            const chatMessageSelector = `.chatmessage-${currentUserUsername.replace(/\s+/g, '')} strong`;
            queryAndApply(chatMessageSelector, (e) => {
                if (!e.classList.contains('color-applied')) {
                    e.style.color = savedColor;
                    const usernameSpan = e.querySelector('.username'); 
                    if (usernameSpan) {
                        usernameSpan.style.color = savedColor;
                    }
                    e.classList.add('color-applied');
                }
            });
        }

        getElement('.battle-log-add label', (label) => {
            label.style.color = savedColor;
        });
    }

    function saveColor(color) {
        localStorage.setItem("usernametextColor", color);
        changeTextColor(); 
    }

    function changePlayerUsernameColor() {
        queryAndApply(".trainer strong", (playerUsername) => {
            playerUsername.style.color = '#ccc';
        });
    }

    // expose the methods that need to be accessed from outside

    return {
        saveColor: saveColor,
        changeTextColor: changeTextColor,
        changePlayerUsernameColor: changePlayerUsernameColor
    };
})();
