window.onload =  function() {

  console.log('Page loaded');
  console.log('UIManager:', window.UIManager);
  console.log('UserPrefManager:', window.UserPrefManager);

  window.UIManager.replaceLogo();
  window.UIManager.makeBarSmaller();
  window.UIManager.adjustTabBarMargin();
  window.UIManager.adjustPsRoomTop();
  window.UIManager.removeColorPreview();
  window.UIManager.addAvatarButton();
  window.UIManager.createCustomCat();
  window.UIManager.addCustomButton();

  window.UserPrefManager.saveColor('#ff0000');
  window.UserPrefManager.changePlayerUsernameColor();
  
};

const observer = new MutationObserver(function(mutationsList) {
  mutationsList.forEach(function(mutation) {
    if (mutation.type === 'childList') {

      // call UIManager methods if certain elements are added to the DOM
      //
      // example:
      // if (elementAddedCondition) {
      // UIManager.addAvatarButton();
      // example end

    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });



// Add Showdown+ Custom Backgrounds.
// Solid Grey
// Accented
// ...

// Replace Meloetta with random pokemon, make this option toggleablle
// under the Showdown+ Category (createCustomCat).

// Auto-Close "News."

// Replace the site's favicon with our own. (I think we need to
// update to a different manifest version to do this, but I might
// wrong.)

// Properly implement the avatar changing system. Save all avatars
// to a backup folder, and delete them whenever the user presses
// the "fa fa-trash" icon next to it in the menu. We can use the 
// button on the bottom of the screen to tell the program where
// to put the "next" avatar.

// Add way to add custom accent colors.

// Upgrade from Manifest 2.0

// Add support for custom avatars.

// Smogon+.

// Custom Command Support.

// Self Analysis button.

// Black and White Scaling