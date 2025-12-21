function createHeart() {
      const heart = document.createElement('div');
      heart.className = 'heart';
      
      const size = Math.floor(Math.random() * 50) + 15;
      const left = Math.floor(Math.random() * 100);
      const hue = Math.floor(Math.random() * 30) + 330; // Pink/red range
      const duration = Math.floor(Math.random() * 5) + 5;
      
      heart.style.width = size + 'px';
      heart.style.height = size + 'px';
      heart.style.left = left + '%';
      heart.style.background = `hsl(${hue}, 80%, 70%)`;
      heart.style.animation = `float-up ${duration}s linear forwards`;
      
      document.querySelector('.bg-heart').appendChild(heart);
      
      setTimeout(() => heart.remove(), duration * 1000);
    }

    setInterval(createHeart, 400);

    // Envelope interaction
    const envelope = document.getElementById('envelope');
    const sticker = document.getElementById('sticker');
    const content = document.getElementById('content');
    const resetBtn = document.getElementById('resetBtn');
    const instruction = document.getElementById('instruction');
    const notes = document.querySelectorAll('.note');
    
    let stickerRemoved = false;
    let envelopeOpened = false;

    // Step 1: Click sticker to remove it
    sticker.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!stickerRemoved) {
        sticker.classList.add('removed');
        stickerRemoved = true;
        
        // Update instruction
        setTimeout(() => {
          instruction.textContent = '💌Now click the envelope to open it 💌';
        }, 300);
      }
    });

    // Step 2: Click envelope to open it
    envelope.addEventListener('click', () => {
      if (stickerRemoved && !envelopeOpened) {
        envelope.classList.add('open');
        instruction.classList.add('hidden');
        setTimeout(() => {
          content.classList.add('visible');
          resetBtn.classList.add('visible');
        }, 400);
        envelopeOpened = true;
      }
    });

    // Step 3: Click notes to expand them
    notes.forEach(note => {
      note.addEventListener('click', (e) => {
        e.stopPropagation();
        if (envelopeOpened) {
          // Check if this note is already expanded
          const isExpanded = note.classList.contains('expanded');
          
          // Close all notes first
          notes.forEach(n => n.classList.remove('expanded'));
          
          // If it wasn't expanded, expand it now
          if (!isExpanded) {
            note.classList.add('expanded');
          }
        }
      });
    });

    // Reset functionality
    resetBtn.addEventListener('click', () => {
      envelope.classList.remove('open');
      content.classList.remove('visible');
      sticker.classList.remove('removed');
      resetBtn.classList.remove('visible');
      instruction.classList.remove('hidden');
      instruction.textContent = '💌 Click the heart to open the letter 💌';
      notes.forEach(n => n.classList.remove('expanded'));
      stickerRemoved = false;
      envelopeOpened = false;
    });