 const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const playIcon = playBtn.querySelector('i');
    const progressBar = document.querySelector('.progress-bar');
    const progressContainer = document.getElementById('progressContainer');
    const progressHeart = document.getElementById('progressHeart');
    const progressWrapper = document.getElementById('progressWrapper');

    let isPlaying = false;
    let isDragging = false;

    function playPause() {
      if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
        playIcon.classList.remove('bi-pause-fill');
        playIcon.classList.add('bi-play-fill');
      } else {
        audioPlayer.play();
        isPlaying = true;
        playIcon.classList.remove('bi-play-fill');
        playIcon.classList.add('bi-pause-fill');
      }
    }

    function updateProgress() {
      if (isDragging) return;

      const { duration, currentTime } = audioPlayer;
      if (isNaN(duration)) return;

      const progressPercent = (currentTime / duration) * 100;
      progressBar.style.width = `${progressPercent}%`;

      const wrapperWidth = progressWrapper.clientWidth;
      const newLeft = (progressPercent / 100) * wrapperWidth;
      progressHeart.style.left = `${newLeft}px`;
    }

    function setProgressByOffsetX(offsetX) {
      const width = progressContainer.clientWidth;
      offsetX = Math.max(0, Math.min(offsetX, width)); // dentro de la barra
      const progressPercent = (offsetX / width) * 100;
      progressBar.style.width = `${progressPercent}%`;
      progressHeart.style.left = `${offsetX}px`;
      const duration = audioPlayer.duration;
      if (!isNaN(duration)) {
        audioPlayer.currentTime = (progressPercent / 100) * duration;
      }
    }

    function setProgress(event) {
      const rect = progressContainer.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      setProgressByOffsetX(offsetX);
    }

    // Mouse events
    progressHeart.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isDragging = true;
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const rect = progressContainer.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      setProgressByOffsetX(offsetX);
    });

    // Touch events
    progressHeart.addEventListener('touchstart', (e) => {
      isDragging = true;
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      const rect = progressContainer.getBoundingClientRect();
      const offsetX = touch.clientX - rect.left;
      setProgressByOffsetX(offsetX);
    });

    // Click en la barra de progreso
    progressContainer.addEventListener('click', setProgress);

    // Play/Pause
    playBtn.addEventListener('click', playPause);
    audioPlayer.addEventListener('timeupdate', updateProgress);