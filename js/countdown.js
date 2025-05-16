 // Fecha objetivo: 24 de mayo de 2025 a las 8:00 PM hora Perú (UTC-5)
      const countdownDate = new Date("2025-05-24T20:00:00-05:00").getTime();

      const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
          document.getElementById("countdown").innerHTML =
            "<p class='text-success fs-5 mt-3'>🎉 ¡Ya empezó la fiesta! 🎉</p>";
          return;
        }

        const days = String(
          Math.floor(distance / (1000 * 60 * 60 * 24))
        ).padStart(2, "0");
        const hours = String(
          Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        ).padStart(2, "0");
        const minutes = String(
          Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        ).padStart(2, "0");
        const seconds = String(
          Math.floor((distance % (1000 * 60)) / 1000)
        ).padStart(2, "0");

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;
      };

      updateCountdown(); // Llamada inicial
      setInterval(updateCountdown, 1000); // Actualizar cada segundo