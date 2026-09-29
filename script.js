document.addEventListener("DOMContentLoaded", () => {

    const scenes = document.querySelectorAll(".scene");
    const nextButtons = document.querySelectorAll(".next-btn");
    const bunny = document.getElementById("bunny");
    const speech = document.getElementById("speech");
    const mascotText = document.getElementById("mascotText");
    const talkBtn = document.getElementById("talkBtn");
    const cards = document.querySelectorAll(".info-card");
    const cardMessage = document.getElementById("cardMessage");
    const hearts = document.querySelectorAll(".hidden-heart");
    const heartCount = document.getElementById("heartCount");
    const gameMessage = document.getElementById("gameMessage");
    const gameNext = document.getElementById("gameNext");
    const yesBtn = document.getElementById("yesBtn");
    const thinkBtn = document.getElementById("thinkBtn");
    const finalResponse = document.getElementById("finalResponse");
    const musicBtn = document.getElementById("musicBtn");
    const music = document.getElementById("music");
    const particlesContainer = document.getElementById("particles");

    let currentScene = "scene1";
    let foundHearts = 0;
    let dialogueIndex = 0;
    let musicPlaying = false;

    const dialogues = [
        {
            speech: "Carla, hola otra vez ♡",
            text: "Te prometo que esta pequeña ayudante tiene buenas intenciones."
        },
        {
            speech: "Tengo una confesión... 👀",
            text: "Alejandro me pidió que te contara algunas cosas que piensa de ti."
        },
        {
            speech: "Y creo que te van a sacar una sonrisa 🌷",
            text: "Porque hay personas que simplemente se vuelven especiales sin que uno se dé cuenta."
        },
        {
            speech: "Ahora sí... ✨",
            text: "Vamos a descubrir poquito a poquito lo que quería decirte."
        }
    ];

    function showScene(id) {
        scenes.forEach(scene => {
            scene.classList.remove("active");
        });

        const nextScene = document.getElementById(id);

        if (nextScene) {
            nextScene.classList.add("active");
            currentScene = id;

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            createBurst();
        }
    }

    nextButtons.forEach(button => {
        button.addEventListener("click", () => {
            const next = button.dataset.next;

            if (next) {
                showScene(next);
            }
        });
    });

    talkBtn.addEventListener("click", () => {

        dialogueIndex++;

        if (dialogueIndex >= dialogues.length) {
            dialogueIndex = 0;
        }

        speech.textContent = dialogues[dialogueIndex].speech;
        mascotText.textContent = dialogues[dialogueIndex].text;

        bunny.classList.remove("talking");

        void bunny.offsetWidth;

        bunny.classList.add("talking");

        talkBtn.textContent = "Otra cosa... ✨";
    });

    cards.forEach(card => {

        card.addEventListener("click", () => {

            const message = card.dataset.message;

            cardMessage.textContent = message;

            cards.forEach(item => {
                item.classList.remove("selected");
            });

            card.classList.add("selected");

            createMiniHearts(card);
        });

    });

    hearts.forEach(heart => {

        heart.addEventListener("click", () => {

            if (heart.classList.contains("found")) {
                return;
            }

            heart.classList.add("found");

            foundHearts++;

            heartCount.textContent = foundHearts;

            if (foundHearts === 1) {
                gameMessage.textContent = "¡Encontraste uno! 💕";
            }

            if (foundHearts === 2) {
                gameMessage.textContent = "¡Ya casi! Falta uno 👀";
            }

            if (foundHearts === 3) {

                gameMessage.textContent = "¡Los encontraste todos! 💗";

                gameNext.classList.add("show");

                createConfetti(45);
                createHeartRain();
            }

        });

    });

    yesBtn.addEventListener("click", () => {

        finalResponse.innerHTML = "Entonces tenemos algo bonito que seguir descubriendo. 💗";

        createConfetti(80);
        createHeartRain();

        yesBtn.textContent = "♡ Me hiciste feliz ♡";

        yesBtn.disabled = true;
    });

    thinkBtn.addEventListener("click", () => {

        finalResponse.innerHTML = "Está bien 🌷 Tómate tu tiempo. Lo importante es que te sientas cómoda.";

        thinkBtn.textContent = "Sin presión ♡";

        createMiniHearts(thinkBtn);
    });

    musicBtn.addEventListener("click", async () => {

        try {

            if (!musicPlaying) {

                await music.play();

                musicPlaying = true;

                musicBtn.textContent = "❚❚";

            } else {

                music.pause();

                musicPlaying = false;

                musicBtn.textContent = "♫";

            }

        } catch (error) {

            musicBtn.textContent = "♫";

        }

    });

    document.addEventListener("keydown", event => {

        if (event.key === "Enter" || event.key === " ") {

            if (currentScene === "scene1") {
                showScene("scene2");
            }

        }

        if (event.key.toLowerCase() === "c") {

            if (currentScene === "scene2") {
                talkBtn.click();
            }

        }

        if (event.key.toLowerCase() === "m") {
            musicBtn.click();
        }

    });

    if (window.matchMedia("(pointer: fine)").matches) {

        document.addEventListener("mousemove", event => {

            const eyes = document.querySelectorAll(".eye");

            eyes.forEach(eye => {

                const rect = eye.getBoundingClientRect();

                const eyeX = rect.left + rect.width / 2;
                const eyeY = rect.top + rect.height / 2;

                const angle = Math.atan2(
                    event.clientY - eyeY,
                    event.clientX - eyeX
                );

                const distance = Math.min(
                    4,
                    Math.hypot(
                        event.clientX - eyeX,
                        event.clientY - eyeY
                    ) / 50
                );

                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;

                eye.style.transform = `translate(${x}px, ${y}px)`;

            });

        });

    }

    function createParticle() {

        const particle = document.createElement("span");

        particle.className = "particle";

        const symbols = ["♡", "✦", "·", "♥"];

        particle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.left = Math.random() * 100 + "%";

        particle.style.fontSize =
            10 + Math.random() * 13 + "px";

        particle.style.animationDuration =
            7 + Math.random() * 8 + "s";

        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 15000);
    }

    setInterval(createParticle, 850);

    function createBurst() {

        for (let i = 0; i < 8; i++) {

            setTimeout(() => {

                const particle = document.createElement("span");

                particle.className = "particle";
                particle.textContent = "♡";

                particle.style.left =
                    45 + Math.random() * 10 + "%";

                particle.style.bottom =
                    35 + Math.random() * 15 + "%";

                particle.style.animationDuration = "3s";

                particlesContainer.appendChild(particle);

                setTimeout(() => {
                    particle.remove();
                }, 3500);

            }, i * 80);

        }

    }

    function createMiniHearts(element) {

        const rect = element.getBoundingClientRect();

        for (let i = 0; i < 5; i++) {

            const heart = document.createElement("span");

            heart.textContent = "♡";

            heart.style.position = "fixed";
            heart.style.left =
                rect.left + rect.width / 2 + "px";
            heart.style.top =
                rect.top + rect.height / 2 + "px";

            heart.style.color = "#b9506b";
            heart.style.fontSize = "18px";
            heart.style.pointerEvents = "none";
            heart.style.zIndex = "300";

            document.body.appendChild(heart);

            const angle =
                Math.random() * Math.PI * 2;

            const distance =
                40 + Math.random() * 70;

            const x =
                Math.cos(angle) * distance;

            const y =
                Math.sin(angle) * distance;

            heart.animate(
                [
                    {
                        transform: "translate(-50%, -50%) scale(.5)",
                        opacity: 0
                    },
                    {
                        transform: "translate(-50%, -50%) scale(1)",
                        opacity: 1
                    },
                    {
                        transform:
                            `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(.7)`,
                        opacity: 0
                    }
                ],
                {
                    duration: 900,
                    easing: "ease-out"
                }
            );

            setTimeout(() => {
                heart.remove();
            }, 950);

        }

    }

    function createConfetti(amount) {

        const symbols = ["♡", "♥", "✦", "✿", "•"];

        for (let i = 0; i < amount; i++) {

            setTimeout(() => {

                const piece = document.createElement("div");

                piece.className = "confetti";

                piece.textContent =
                    symbols[Math.floor(Math.random() * symbols.length)];

                piece.style.left =
                    Math.random() * 100 + "vw";

                piece.style.fontSize =
                    10 + Math.random() * 15 + "px";

                piece.style.color =
                    Math.random() > 0.5
                        ? "#b9506b"
                        : "#e8899c";

                piece.style.animationDuration =
                    2 + Math.random() * 2 + "s";

                document.body.appendChild(piece);

                setTimeout(() => {
                    piece.remove();
                }, 4500);

            }, i * 25);

        }

    }

    function createHeartRain() {

        for (let i = 0; i < 25; i++) {

            setTimeout(() => {

                const heart = document.createElement("div");

                heart.className = "confetti";
                heart.textContent = "♡";

                heart.style.left =
                    Math.random() * 100 + "vw";

                heart.style.color = "#b9506b";

                heart.style.fontSize =
                    14 + Math.random() * 14 + "px";

                heart.style.animationDuration =
                    2.5 + Math.random() * 2 + "s";

                document.body.appendChild(heart);

                setTimeout(() => {
                    heart.remove();
                }, 5000);

            }, i * 70);

        }

    }

    setInterval(() => {

        if (currentScene === "scene2") {

            speech.animate(
                [
                    { transform: "translateX(-50%) scale(1)" },
                    { transform: "translateX(-50%) scale(1.04)" },
                    { transform: "translateX(-50%) scale(1)" }
                ],
                {
                    duration: 1200,
                    easing: "ease-in-out"
                }
            );

        }

    }, 5000);

});