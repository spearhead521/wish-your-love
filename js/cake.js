/**
 * =========================================================================
 * 🌹 BELOVED - INTERACTIVE BIRTHDAY CAKE, CANDLE & CONFETTI
 * =========================================================================
 */

class RomanticCake {
  constructor() {
    this.candleFlame = document.getElementById('candleFlame');
    this.candleSmoke = document.getElementById('candleSmoke');
    this.blowBtn = document.getElementById('blowCandleBtn');
    this.blowBtnText = document.getElementById('blowButtonText');
    this.cakeAssembly = document.getElementById('cakeAssembly');
    this.wishModal = document.getElementById('wishGrantedModal');
    this.closeModalBtn = document.getElementById('closeWishModalBtn');
    this.cakeTitle = document.getElementById('cakeTitle');
    this.cakeInstruction = document.getElementById('cakeInstruction');
    this.wishGrantedTitle = document.getElementById('wishGrantedTitle');
    this.wishGrantedMessage = document.getElementById('wishGrantedMessage');

    this.isBlownOut = false;
    this.init();
  }

  init() {
    if (typeof CONFIG !== 'undefined' && CONFIG.cake) {
      if (this.cakeTitle) this.cakeTitle.textContent = CONFIG.cake.title;
      if (this.cakeInstruction) this.cakeInstruction.textContent = CONFIG.cake.instruction;
      if (this.blowBtnText) this.blowBtnText.textContent = CONFIG.cake.buttonText;
      if (this.wishGrantedTitle) this.wishGrantedTitle.textContent = CONFIG.cake.wishGrantedTitle;
      if (this.wishGrantedMessage) this.wishGrantedMessage.textContent = CONFIG.cake.wishGrantedMessage;
    }

    if (this.blowBtn) {
      this.blowBtn.addEventListener('click', () => this.blowOutCandle());
    }
    if (this.candleFlame) {
      this.candleFlame.addEventListener('click', () => this.blowOutCandle());
    }
    if (this.cakeAssembly) {
      this.cakeAssembly.addEventListener('click', () => this.blowOutCandle());
    }
    if (this.closeModalBtn) {
      this.closeModalBtn.addEventListener('click', () => this.closeWishModal());
    }
  }

  blowOutCandle() {
    if (this.isBlownOut) return;
    this.isBlownOut = true;

    // 1. Extinguish candle flame
    if (this.candleFlame) {
      this.candleFlame.classList.add('blown-out');
    }

    // 2. Spawn smoke puff
    if (this.candleSmoke) {
      this.candleSmoke.classList.remove('hidden');
    }

    // 3. Play audio SFX
    if (window.romanticAudio && typeof window.romanticAudio.playCandleBlowSfx === 'function') {
      window.romanticAudio.playCandleBlowSfx();
    }

    // 4. Update button
    if (this.blowBtnText) {
      this.blowBtnText.textContent = "Wish Made! ✨";
    }
    if (this.blowBtn) {
      this.blowBtn.style.opacity = '0.7';
    }

    // 5. Fire celebratory fireworks & confetti
    this.launchCelebrationConfetti();

    // 6. Show wish granted modal
    setTimeout(() => {
      if (this.wishModal) {
        this.wishModal.classList.add('active');
        this.wishModal.setAttribute('aria-hidden', 'false');
      }
    }, 1200);
  }

  closeWishModal() {
    if (this.wishModal) {
      this.wishModal.classList.remove('active');
      this.wishModal.setAttribute('aria-hidden', 'true');
    }
  }

  launchCelebrationConfetti() {
    const confettiColors = ['#ffd8a8', '#f4a8b8', '#ff4d6d', '#ffffff', '#dfba86', '#c9184a'];
    const confettiCount = 120;

    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        const isHeart = Math.random() > 0.5;
        
        confetti.className = 'confetti-piece';
        confetti.style.position = 'fixed';
        confetti.style.zIndex = '10005';
        confetti.style.pointerEvents = 'none';
        
        const startX = window.innerWidth / 2 + (Math.random() - 0.5) * 100;
        const startY = window.innerHeight / 2 + 50;
        confetti.style.left = `${startX}px`;
        confetti.style.top = `${startY}px`;

        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        
        if (isHeart) {
          confetti.innerHTML = '❤️';
          confetti.style.fontSize = `${Math.random() * 16 + 12}px`;
        } else {
          confetti.style.width = `${Math.random() * 10 + 6}px`;
          confetti.style.height = `${Math.random() * 14 + 8}px`;
          confetti.style.backgroundColor = color;
          confetti.style.borderRadius = '2px';
        }

        document.body.appendChild(confetti);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 14 + 8;
        let vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity - 10;
        let x = startX;
        let y = startY;
        let rot = 0;
        const rotSpeed = (Math.random() - 0.5) * 15;
        let opacity = 1;

        const animateConfetti = () => {
          x += vx;
          y += vy;
          vy += 0.4; // gravity
          vx *= 0.98; // drag
          rot += rotSpeed;
          opacity -= 0.008;

          confetti.style.left = `${x}px`;
          confetti.style.top = `${y}px`;
          confetti.style.transform = `rotate(${rot}deg)`;
          confetti.style.opacity = Math.max(0, opacity);

          if (opacity > 0 && y < window.innerHeight + 50) {
            requestAnimationFrame(animateConfetti);
          } else {
            confetti.remove();
          }
        };

        requestAnimationFrame(animateConfetti);
      }, Math.random() * 400);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.romanticCake = new RomanticCake();
});
