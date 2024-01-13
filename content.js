import { UIManager  }           from "./ui/UIManager";
import { userPrefManager }       from "./userPref/userPrefManager";
import { battleManager }       from "./pokemon/battleManager";

const UIManager = new UIManager();

const userPrefManager = new userPrefManager();

const battleManager = new battleManager();


uiManager.replaceLogo();
userPrefManager.changeTextColor();
battleManager.ClickAnalysis();
battleManager.pokemonClickListener();

function applyAllChanges() {
  uiManager.applyAllChanges();
}

const observer = new MutationObserver(applyAllChanges);
observer.observe(document.body, { childList: true, subtree: true });

window.onload =  applyAllChanges;



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