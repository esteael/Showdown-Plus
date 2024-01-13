window.UIManager = (function() {

  // util function to get element and call a callback with it

  function getElement(selector, callback) {
      const element = document.querySelector(selector);
      if (element) {
          callback(element);
      }
  }


  function replaceLogo() {
      var logo = document.querySelector(".logo");
      if (logo) {
          logo.src = chrome.runtime.getURL("showdownlogo.svg"); 
          logo.srcset = '';
          logo.width = 292;
          logo.height = 88;
          logo.style.margin = "-20px 0 0 -20px";
      }
  }

  function makeBarSmaller() {
      var tabBar = document.querySelector(".maintabbarbottom");
      if (tabBar) {
          tabBar.style.height = '1px';
          tabBar.style.bottom = '0px';
          tabBar.style.border = 'none';
      }
  }

  function adjustTabBarMargin() {
      var tabBar = document.querySelector('.tabbar.maintabbar');
      if (tabBar) {
          tabBar.style.marginLeft = '250px';
      }
  }

  function adjustPsRoomTop() {
      var psRooms = document.querySelectorAll('.ps-room');
      psRooms.forEach(function(psRoom) {
          psRoom.style.top = '50px';
      });
  }

  function removeColorPreview() {
      getElement('.preview', function(colorPreview) {
          if(colorPreview && colorPreview.parentElement){
              colorPreview.parentElement.removeChild(colorPreview);
          }
      });
  }

  function addAvatarButton() {

      // create an observer instance linked to the callback function

      var observer = new MutationObserver(function(mutationsList, observer) {
          mutationsList.forEach(function(mutation) {
              mutation.addedNodes.forEach(function(addedNode) {
                  if (addedNode.nodeType === Node.ELEMENT_NODE) {
                      var popupDiv = addedNode.querySelector('.ps-popup');
                      if (popupDiv) {
                          var avatarListDiv = popupDiv.querySelector('.avatarlist');
                          if (avatarListDiv && !popupDiv.querySelector('p button[name="add-avatar-button"]')) {
                              var newButton = document.createElement('button');
                              newButton.textContent = 'Add Avatar';
                              newButton.name = 'add-avatar-button';
                              newButton.className = 'button';
                              avatarListDiv.appendChild(newButton);
                          }
                      }
                  }
              });
          });
      });

      // start observing the target node for configured mutations

      observer.observe(document.body, { childList: true, subtree: true });
  }

  function createCustomCat() {
      if (!document.querySelector('.custom-cat')) {
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
  }

  function addCustomButton() {
      if (!document.querySelector('.custom-color-picker')) {
          var chatPreferencesLabel = Array.from(document.querySelectorAll('.ps-popup p label.optlabel'))
              .find(label => label.textContent.includes('Chat preferences:'));
          if (chatPreferencesLabel) {
              const colorPicker = document.createElement('input');
              colorPicker.type = 'color';
              colorPicker.className = 'custom-color-picker';
              colorPicker.value = localStorage.getItem('usernametextColor') || '#FFFFFF';
              colorPicker.addEventListener('input', function() {
                  saveColor(colorPicker.value);
              });
              const pickerLabel = document.createElement('label');
              pickerLabel.className = 'optlabel';
              pickerLabel.textContent = 'Username color: ';
              pickerLabel.appendChild(colorPicker);
              const pickerParagraph = document.createElement('p');
              pickerParagraph.appendChild(pickerLabel);
              chatPreferencesLabel.parentNode.parentNode.insertBefore
                  (pickerParagraph, chatPreferencesLabel.parentNode.nextSibling);
          }
      }
  }

  return {
    replaceLogo: replaceLogo,
    makeBarSmaller: makeBarSmaller,
    adjustTabBarMargin: adjustTabBarMargin,
    adjustPsRoomTop: adjustPsRoomTop,
    removeColorPreview: removeColorPreview,
    addAvatarButton: addAvatarButton,
    createCustomCat: createCustomCat,
    addCustomButton: addCustomButton
};
})();