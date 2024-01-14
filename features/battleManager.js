import { queryAndApply }        from "../utils/uFunctions";

export class battleManager {
    clickAnalysis() {
        queryAndApply('.picon.has-tooltip' , (e) => {
            e.removeEventListener('click', this.clickAnalysis);
            e.addEventListener('click', this.clickAnalysis);
        });
    }

    pokemonClickListener(e) {
        const element = event.currentTarget;
        const ariaLabel = element.getAttribute('aria-label');
        const match = ariaLabel && ariaLabel.match(/^[^\(]+/);
        if (match) {
          const pokemonName = match[0].trim();
          injectScriptToSendCommands(pokemonName);
        }
    }

    injectScriptToSendCommands(pokemonName) {
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

    addPlayersRatingToName() {
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

        customizeTrainerBox() {
            queryAndApply('.rightbar, .leftbar', bar => {
                bar.style.backgroundColor = 'rgba(0,0,0,0.5)';
                if (bar.classList.contains('rightbar')) {
                  bar.style.borderLeft = '1px solid rgba(0, 0, 0, 0.5)';
                } else if (bar.classList.contains('leftbar')) {
                  bar.style.borderRight = '1px solid rgba(0, 0, 0, 0.5)';
                }
              });
        }

    
}