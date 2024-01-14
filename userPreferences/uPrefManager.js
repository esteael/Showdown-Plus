export class UserPrefManager {
    saveColor(color) {
        localStorage.setItem("usernametextColor", color);
        this.changeTextColor();
    }

    changeTextColor() {
        savedColor = localStorage.getItem("usernametextColor") || "#000000";

        queryAndApply(".username", (e) => {
            e.style.color = savedColor;
        });

        const currentUserElement = document.querySelector('.userbar .username');
        if (currentUserElement) {
            const currentUserUsername = currentUserElement.getAttribute('data-name').trim();
            const chatMessageSelector = `.chatmessage-${currentUserUsername.replace(/\s+/g, '')} strong`;
            queryAndApply(chatMessageSelector, (e) => {
                if(!e.classList.contains('color-applied')) {
                    e.style.color = savedColor;
                    const usernameSpan = strongElement.querySelector('.username');
                    if(usernameSpan) {
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

    changePlayerUsernameColor() {
        queryAndApply(".trainer strong", (playerUsername) => {
            playerUsername.style.color = '#ccc';
        });
    }
}