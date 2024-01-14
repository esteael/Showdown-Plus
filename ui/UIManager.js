export class UIManager {
    replaceLogo() {
        var logo = document.querySelector(".logo");
        if (logo) {
            logo.src = chrome.runtime.getURL("showdownlogo.svg");
            logo.srcset = '';
            logo.width = 292;
            logo.height = 88;
            logo.style.margin = "-20px 0 0 -20px";
        }

    }

    makeBarSmaller() {
        var tabBar = document.querySelector(".maintabbarbottom");
        if (tabBar) {
            tabBar.style.height = '1px';
            tabBar.style.bottom = '0px';
            tabBar.style.border = 'none';
        }

    }

    adjustTabBarMargin() {
        var tabBar = document.querySelector('.tabbar.maintabbar');
        if (tabBar) {
            tabBar.style.marginLeft = '250px';
        }
    }

    adjustPsRoomTop() {
        var psRooms = document.querySelector('.ps-room');
        psRooms.forEach(function(psRoom) {
            psRoom.style.top = '50px';
        })
    }

    removeColorPreview() {
        getElement('.preview', colorPreview => {
            colorPreview.parentElement.removeChild(colorPreview);
          });
    }

    addAvatarButton() {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
              if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(addedNode) {
                  if (addedNode.querySelector) {
                    var popupDiv = addedNode.querySelector('.ps-popup');
                    if (popupDiv) {
                      var avatarListDiv = popupDiv.querySelector('.avatarlist');
                      if (avatarListDiv) {
                        var closeButtons = Array.from(popupDiv.querySelectorAll('p button[name="close"]'));
                        var lastCloseButton = closeButtons[closeButtons.length - 1];
                        if (lastCloseButton && !popupDiv.querySelector('p button[name="add-avatar-button"]')) {
                          var newButton = document.createElement('button');
                          newButton.textContent = 'Add Avatar';
                          newButton.name = 'add-avatar-button';
                          newButton.className = 'button';
                          var space = document.createTextNode('   ');
                          lastCloseButton.parentNode.insertBefore(space, lastCloseButton.nextSibling);
                          lastCloseButton.parentNode.insertBefore(newButton, space.nextSibling);
                        }
                      }
                    }
                  }
                });
              }
            });
          });
        
          var config = { childList: true, subtree: true };
        
          observer.observe(document.body, config);
    }

    createCustomCat() {
        if (document.querySelector('.custom-cat')) {
            return;
          }
        
          var chatPreferencesLabel = Array.from(document.querySelectorAll('.ps-popup p label.optlabel'))
              .find(label => label.textContent.includes('Chat preferences:'));
        
          if (chatPreferencesLabel) {
            const hr = document.createElement('hr');
            const showdownParagraph = document.createElement('p');
            showdownParagraph.className = 'custom-cat';
            const showdownStrong = document.createElement('strong');
            showdownStrong.textContent = 'Showdown+';
            showdownParagraph.appendChild(showdownStrong);
            const chatPreferencesParent = chatPreferencesLabel.parentNode;
            chatPreferencesParent.parentNode.insertBefore(showdownParagraph, chatPreferencesParent.nextSibling);
            chatPreferencesParent.parentNode.insertBefore(hr, showdownParagraph);
          }        
    }

    addCustomButton() {
        if (document.querySelector('.custom-color-picker')) {
            return;
          }
        
          var chatPreferencesLabel = Array.from(document.querySelectorAll('.ps-popup p label.optlabel'))
              .find(label => label.textContent.includes('Chat preferences:'));
        
          if (chatPreferencesLabel) {
            const colorPicker = document.createElement('input');
            colorPicker.type = 'color';
            colorPicker.className = 'custom-color-picker';
            colorPicker.value = localStorage.getItem('usernametextColor') || '#FFFFFF';
            colorPicker.style.background = 'none';
            colorPicker.style.border = 'none';
            colorPicker.style.boxShadow = 'none';
            colorPicker.addEventListener('input', () => {
              saveColor(colorPicker.value);
            });
            const pickerLabel = document.createElement('label');
            pickerLabel.className = 'optlabel';
            pickerLabel.style.display = 'flex';
            pickerLabel.style.alignItems = 'center';
            pickerLabel.textContent = 'Username color: ';
            pickerLabel.appendChild(colorPicker);
            colorPicker.style.marginLeft = '-1px';
            const pickerParagraph = document.createElement('p');
            pickerParagraph.appendChild(pickerLabel);
            chatPreferencesLabel.parentNode.parentNode.insertBefore(pickerParagraph, chatPreferencesLabel.parentNode.nextSibling);
          }        
    }



}