/**
 * =========================================================================
 * 🌹 BELOVED - WAX-SEALED BIRTHDAY LOVE LETTER CONTROLLER
 * =========================================================================
 */

class RomanticLetter {
  constructor() {
    this.container = document.getElementById('envelopeContainer');
    this.wrap = document.getElementById('envelopeWrap');
    this.waxSealBtn = document.getElementById('waxSealBtn');
    this.prompt = document.getElementById('envelopePrompt');
    this.letterBody = document.getElementById('letterBody');
    this.letterSalutation = document.getElementById('letterSalutation');
    this.letterClosing = document.getElementById('letterClosing');
    this.letterSignature = document.getElementById('letterSignature');
    this.letterPostscript = document.getElementById('letterPostscript');
    this.letterDateStamp = document.getElementById('letterDateStamp');
    this.waxSealIcon = document.getElementById('waxSealIcon');
    this.promptText = document.getElementById('envelopePromptText');

    this.isOpen = false;
    this.init();
  }

  init() {
    if (typeof CONFIG !== 'undefined' && CONFIG.letter) {
      this.populateLetter(CONFIG.letter);
    }

    if (this.waxSealBtn) {
      this.waxSealBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openLetter();
      });
    }

    if (this.wrap) {
      this.wrap.addEventListener('click', () => {
        if (!this.isOpen) {
          this.openLetter();
        }
      });
    }
  }

  populateLetter(data) {
    if (this.waxSealIcon && data.waxSealIcon) {
      this.waxSealIcon.textContent = data.waxSealIcon;
    }
    if (this.promptText && data.envelopePrompt) {
      this.promptText.textContent = data.envelopePrompt;
    }
    if (this.letterSalutation && data.salutation) {
      this.letterSalutation.textContent = data.salutation;
    }
    if (this.letterClosing && data.closing) {
      this.letterClosing.textContent = data.closing;
    }
    if (this.letterSignature && data.signature) {
      this.letterSignature.textContent = data.signature;
    }
    if (this.letterPostscript && data.postscript) {
      this.letterPostscript.textContent = data.postscript;
    }
    if (this.letterDateStamp && typeof CONFIG !== 'undefined' && CONFIG.dates) {
      this.letterDateStamp.textContent = CONFIG.dates.birthday || 'Today';
    }

    if (this.letterBody && Array.isArray(data.paragraphs)) {
      this.letterBody.innerHTML = '';
      data.paragraphs.forEach(pText => {
        const p = document.createElement('p');
        p.textContent = pText;
        this.letterBody.appendChild(p);
      });
    }
  }

  openLetter() {
    if (this.isOpen) return;
    this.isOpen = true;

    // 1. Play seal break sound effect
    if (window.romanticAudio && typeof window.romanticAudio.playSealBreakSfx === 'function') {
      window.romanticAudio.playSealBreakSfx();
    }

    // 2. Break wax seal animation
    if (this.waxSealBtn) {
      this.waxSealBtn.classList.add('broken');
    }

    // 3. Hide prompt
    if (this.prompt) {
      this.prompt.classList.add('hidden');
    }

    // 4. Open envelope flap and slide out parchment letter
    setTimeout(() => {
      if (this.wrap) {
        this.wrap.classList.add('opened');
      }
    }, 200);

    // 5. Spawn celebratory sparkles around the letter
    this.spawnLetterSparkles();
  }

  spawnLetterSparkles() {
    if (!window.romanticParticles) return;
    const rect = this.container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        window.romanticParticles.floatingHearts.push(
          window.romanticParticles.createHeart(
            centerX + (Math.random() - 0.5) * 200,
            centerY + (Math.random() - 0.5) * 100
          )
        );
      }, i * 60);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.romanticLetter = new RomanticLetter();
});
