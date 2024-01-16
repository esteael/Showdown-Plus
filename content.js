function getElement(selector, callback) {
  const element = document.querySelector(selector);
  if (element) {
    callback(element);
  }
}

function queryAndApply(selector, callback) {
  document.querySelectorAll(selector).forEach(callback);
}

function saveColor(color) {
  localStorage.setItem('usernametextColor', color);
  changeTextColor();
}

function replaceLogo() {
  var logo = document.querySelector('.logo');
  if (logo) {
      logo.src = chrome.runtime.getURL('showdownlogo.svg');
      logo.srcset = '';
      logo.width = 292;
      logo.height = 88;
      logo.style.margin = "-20px 0 0 -20px";
  }
}

function replaceFavicon() {
  const newFaviconURL = chrome.runtime.getURL('favicon.ico');

  const existingFavicons = document.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']");
  existingFavicons.forEach(favicon => favicon.remove());

  const newFavicon = document.createElement('link');
  newFavicon.rel = 'icon';
  newFavicon.href = newFaviconURL;
  newFavicon.sizes = '256x256';

  document.head.appendChild(newFavicon);
}

window.addEventListener('load', replaceFavicon);

function makeBarSmaller() {
  var tabBar = document.querySelector('.maintabbarbottom');
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

function changeBarColorsAndBorders() {
  queryAndApply('.rightbar, .leftbar', bar => {
    bar.style.backgroundColor = 'rgba(0,0,0,0.5)';
    if (bar.classList.contains('rightbar')) {
      bar.style.borderLeft = '1px solid rgba(0, 0, 0, 0.5)';
    } else if (bar.classList.contains('leftbar')) {
      bar.style.borderRight = '1px solid rgba(0, 0, 0, 0.5)';
    }
  });
}

function removeColorPreview() {
  getElement('.preview', colorPreview => {
    colorPreview.parentElement.removeChild(colorPreview);
  });
}

function changeTextColor() {
  const savedColor = localStorage.getItem('usernametextColor') || '#000000';

  queryAndApply('.usernametext', element => {
    element.style.color = savedColor;
  });

  const currentUserElement = document.querySelector('.userbar .username');
  if (currentUserElement) {
    const currentUserUsername = currentUserElement.getAttribute('data-name').trim();
    const chatMessageSelector = `.chatmessage-${currentUserUsername.replace(/\s+/g, '')} strong`;
    queryAndApply(chatMessageSelector, strongElement => {
      if (!strongElement.classList.contains('color-applied')) {
        strongElement.style.color = savedColor;
        const usernameSpan = strongElement.querySelector('.username');
        if (usernameSpan) {
          usernameSpan.style.color = savedColor;
        }
        strongElement.classList.add('color-applied');
      }
    });
  }

  getElement('.battle-log-add label', label => {
    label.style.color = savedColor;
  });
}

function createCustomCat() {
  if (document.querySelector('.custom-cat')) {
    return;
  }

  const chatPreferencesLabel = Array.from(document.querySelectorAll('.ps-popup p label.optlabel'))
      .find(label => label.textContent.includes('Chat preferences:'));

  if (chatPreferencesLabel) {
    // Create the Showdown+ category and horizontal rule
    const hr = document.createElement('hr');
    const showdownParagraph = document.createElement('p');
    showdownParagraph.className = 'custom-cat';
    const showdownStrong = document.createElement('strong');
    showdownStrong.textContent = 'Showdown+';
    showdownParagraph.appendChild(showdownStrong);

    // Insert Showdown+ paragraph and hr
    const chatPreferencesParent = chatPreferencesLabel.parentNode;
    chatPreferencesParent.parentNode.insertBefore(showdownParagraph, chatPreferencesParent.nextSibling);
    chatPreferencesParent.parentNode.insertBefore(hr, showdownParagraph);

    // Create and add the custom color picker
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
    const pickerParagraph = document.createElement('p');
    pickerParagraph.appendChild(pickerLabel);

    // Insert the color picker paragraph
    showdownParagraph.parentNode.insertBefore(pickerParagraph, showdownParagraph.nextSibling);

    // Create and add the Auto-Close News checkbox
    const autoCloseNewsLabel = document.createElement('label');
    autoCloseNewsLabel.className = 'checkbox';
    const autoCloseNewsCheckbox = document.createElement('input');
    autoCloseNewsCheckbox.type = 'checkbox';
    autoCloseNewsCheckbox.name = 'autoCloseNews';
    autoCloseNewsLabel.appendChild(autoCloseNewsCheckbox);
    autoCloseNewsLabel.appendChild(document.createTextNode(' Auto-Close News'));

    // Insert the checkbox paragraph
    pickerParagraph.parentNode.insertBefore(autoCloseNewsLabel, pickerParagraph.nextSibling);
  }
}


function changePlayerUsernameColor() {
  queryAndApply('.trainer strong', playerUsername => {
    playerUsername.style.color = '#ccc';
  });
}

function addAvatarButton() {
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

function clickAnalysis() {
  queryAndApply('.picon.has-tooltip', element => {
    element.removeEventListener('click', pokemonClickListener);
    element.addEventListener('click', pokemonClickListener);
  });
}

function pokemonClickListener(event) {
  const element = event.currentTarget;
  const ariaLabel = element.getAttribute('aria-label');
  const match = ariaLabel && ariaLabel.match(/^[^\(]+/);
  if (match) {
    const pokemonName = match[0].trim();
    injectScriptToSendCommands(pokemonName);
  }
}

function injectScriptToSendCommands(pokemonName) {
  const script = document.createElement('script');
  script.textContent = `
    if (typeof app !== 'undefined' && app.curRoom && app.curRoom.send) {
      app.curRoom.send('/weak ${pokemonName}');
      app.curRoom.send('/analysis ${pokemonName}');
    }
  `;
  (document.head || document.documentElement).appendChild(script);
  script.remove();
}

function addPlayersRatingToName() {
  queryAndApply('.trainer', trainer => {
    const trainerSprite = trainer.querySelector('.trainersprite');
    const playerNameStrong = trainer.querySelector('strong');
    if (trainerSprite && playerNameStrong && !playerNameStrong.dataset.ratingAdded) {
      const ratingMatch = trainerSprite.title.match(/Rating: (\d+)/);
      if (ratingMatch) {
        const rating = ratingMatch[1];
        const ratingSpan = document.createElement('span');
        ratingSpan.textContent = ` (${rating})`;
        ratingSpan.style.color = 'rgb(255, 173, 239)';
        playerNameStrong.appendChild(ratingSpan);
        playerNameStrong.dataset.ratingAdded = 'true';
      }
    }
  });
}

function applyAllChanges() {
  replaceLogo();
  changeTextColor();
  removeColorPreview();
  changeBarColorsAndBorders();
  changePlayerUsernameColor();
  clickAnalysis();
  addPlayersRatingToName();
  makeBarSmaller();
  adjustTabBarMargin();
  adjustPsRoomTop();
  addAvatarButton();
  createCustomCat();
}

const observer = new MutationObserver(applyAllChanges);
observer.observe(document.body, { childList: true, subtree: true });
window.onload = applyAllChanges;

// Add Showdown+ Custom Backgrounds. (super easy, settings > change bg button)
// <button name="setBg" value="solidblue" class="option"><span class="bg" style="background: #344b6c"></span>Solid blue</button>
// use this line to create a 3 new boxes under it with 3 different new backgrouds.

// "Showdown" Grey (#151515)
// Customizable CSS Moving Gradient (maybe??)
// Customizable Solid (???)

// Replace Meloetta with random pokemon, make this option toggleable (MAKE THIS A CHECKBOX UNDER CUSTOMCAT)
// under the Showdown+ Category (createCustomCat).
/*
.roomcounters .usercount {
  display: block;
  width: 49px;
  height: 63px;
  position: absolute;
  left: -30px;
  bottom: -5px;
  background: url(https://play.pokemonshowdown.com/sprites/gen5/meloetta.png) center no-repeat
}

.roomcounters button:hover .usercount {
  background: url(https://play.pokemonshowdown.com/sprites/gen5ani/meloetta.gif) center no-repeat
}

.roomcounters .battlecount {
  display: block;
  width: 46px;
  height: 76px;
  position: absolute;
  right: -30px;
  bottom: -10px;
  background: url(https://play.pokemonshowdown.com/sprites/gen5/meloetta-pirouette.png) center no-repeat
}

.roomcounters button:hover .battlecount {
  background: url(https://play.pokemonshowdown.com/sprites/gen5ani/meloetta-pirouette.gif) center no-repeat
}
*/

// Auto-Close "News." News auto opens when the site opens, add a checkbox that auto closes
// the news when the site starts. (Harder)


// Add support for custom avatars. (ignore this for now)
// Properly implement the avatar changing system. Save all avatars
// to a backup folder, and delete them whenever the user presses
// the "fa fa-trash" icon next to it in the menu. We can use the 
// button on the bottom of the screen to tell the program where
// to put the "next" avatar. (ignore this for now)

// Add way to add custom accent colors. (ignore this for now)

// Smogon+. (Hard to explain, leave this to lana)

// Custom Command Support. (Hard to explain dw ab it for now)

// Self Team Analysis button. (Leave to lana)

// Black and White Scaling (leave to lana)