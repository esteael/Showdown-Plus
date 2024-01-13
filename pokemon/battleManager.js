const BattleManager = (function() {
  function queryAndApply(selector, callback) {
      document.querySelectorAll(selector).forEach(callback);
  }


  function clickAnalysis() {
      queryAndApply('.picon.has-tooltip', function(element) {
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
      queryAndApply('.trainer', function(trainer) {
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

  function customizeTrainerBox() {
      queryAndApply('.rightbar, .leftbar', function(bar) {
          bar.style.backgroundColor = 'rgba(0,0,0,0.5)';
          if (bar.classList.contains('rightbar')) {
              bar.style.borderLeft = '1px solid rgba(0, 0, 0, 0.5)';
          } else if (bar.classList.contains('leftbar')) {
              bar.style.borderRight = '1px solid rgba(0, 0, 0, 0.5)';
          }
      });
  }

  // expose the methods that need to be accessed from outside

  return {
      clickAnalysis: clickAnalysis,
      addPlayersRatingToName: addPlayersRatingToName,
      customizeTrainerBox: customizeTrainerBox
  };
})();