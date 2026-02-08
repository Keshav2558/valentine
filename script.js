document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const responseDiv = document.getElementById('response');
    const contentDiv = document.querySelector('.content');
    const floatingHearts = document.querySelector('.floating-hearts');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    let attempts = 0;
    const messages = [
        "Are you sure?",
        "Maybe reconsider?",
        "I'd be honored",
        "Think about it?",
        "One more thought?",
        "I'd be so pleased",
        "I hope you'll say yes"
    ];
    
    // Create subtle floating hearts
    function createHearts(count) {
        for (let i = 0; i < count; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = '❤';
            
            const left = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = Math.random() * 10 + 10;
            const size = Math.random() * 15 + 8;
            
            heart.style.left = `${left}%`;
            heart.style.fontSize = `${size}px`;
            heart.style.animationDelay = `${delay}s`;
            heart.style.animationDuration = `${duration}s`;
            
            floatingHearts.appendChild(heart);
        }
    }
    
    // Initial subtle hearts
    createHearts(8);
    
    // Handle No button interaction
    function updateNoButtonMessage() {
        if (responseDiv.style.display === 'flex') return;
        
        const messageIndex = attempts % messages.length;
        noBtn.textContent = messages[messageIndex];
        
        const movements = [
            { x: 20, y: -10 },
            { x: -15, y: 15 },
            { x: 10, y: -15 },
            { x: -20, y: 10 },
            { x: 15, y: -20 },
            { x: -10, y: 20 },
            { x: 5, y: -5 }
        ];
        
        const moveIndex = attempts % movements.length;
        noBtn.style.transform = `translate(${movements[moveIndex].x}px, ${movements[moveIndex].y}px)`;
        
        if (attempts > 4) {
            noBtn.style.opacity = '0.9';
        } else {
            noBtn.style.opacity = '1';
        }
        
        noBtn.style.background = 'transparent';
        noBtn.style.color = '#8a8a8a';
        noBtn.style.borderColor = '#d0d0d0';
    }
    
    // Click handler for No button
    noBtn.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        if (responseDiv.style.display === 'flex') return;
        
        attempts++;
        updateNoButtonMessage();
        
        noBtn.style.opacity = '0.8';
        setTimeout(() => {
            noBtn.style.opacity = attempts > 4 ? '0.9' : '1';
        }, 200);
    });
    
    // Mobile touch support
    noBtn.addEventListener('touchstart', function(event) {
        event.preventDefault();
        if (responseDiv.style.display === 'flex') return;
        
        attempts++;
        updateNoButtonMessage();
    });
    
    // Music Player Functionality
    let isMusicPlaying = false;
    
    if (backgroundMusic && musicToggle) {
        // Set initial volume (30%)
        backgroundMusic.volume = 0.3;
        
        // Initialize music button
        musicToggle.innerHTML = '<i class="fas fa-play"></i>';
        musicToggle.title = "Click to play music";
        
        // Music toggle button click
        musicToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (isMusicPlaying) {
                // Pause music
                backgroundMusic.pause();
                musicToggle.innerHTML = '<i class="fas fa-play"></i>';
                musicToggle.classList.remove('playing');
                musicToggle.title = "Play music";
            } else {
                // Play music
                const playPromise = backgroundMusic.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        isMusicPlaying = true;
                        musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                        musicToggle.classList.add('playing');
                        musicToggle.title = "Pause music";
                    }).catch(error => {
                        console.log("Music play failed:", error);
                        musicToggle.innerHTML = '<i class="fas fa-play"></i>';
                        musicToggle.title = "Click Yes first, then play music";
                    });
                }
            }
            isMusicPlaying = !isMusicPlaying;
        });
        
        // Handle music errors
        backgroundMusic.addEventListener('error', function(e) {
            console.log("Music error code:", backgroundMusic.error?.code);
            console.log("Music error message:", backgroundMusic.error?.message);
            musicToggle.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
            musicToggle.title = "Music failed to load. Check file.";
            musicToggle.style.background = '#ff6b6b';
        });
        
        // Update icon when music starts playing
        backgroundMusic.addEventListener('playing', function() {
            isMusicPlaying = true;
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            musicToggle.classList.add('playing');
        });
        
        // Update icon when music is paused
        backgroundMusic.addEventListener('pause', function() {
            isMusicPlaying = false;
            musicToggle.innerHTML = '<i class="fas fa-play"></i>';
            musicToggle.classList.remove('playing');
        });
    }
    
    // Handle Yes button click
    function handleYesButtonClick() {
        // Hide the content
        contentDiv.style.display = 'none';
        
        // Show the response
        responseDiv.style.display = 'flex';
        
        // Create more hearts
        createHearts(20);
        
        // Add subtle confetti
        createSubtleConfetti();
        
        // Animate the panda
        animatePanda();
        
        // Try to play music automatically
        if (backgroundMusic && backgroundMusic.paused) {
            setTimeout(() => {
                backgroundMusic.volume = 0.3;
                const playPromise = backgroundMusic.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        isMusicPlaying = true;
                        if (musicToggle) {
                            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                            musicToggle.classList.add('playing');
                            musicToggle.title = "Pause music";
                        }
                    }).catch(error => {
                        console.log("Auto-play blocked, click music button to play");
                    });
                }
            }, 1000);
        }
        
        // Change button colors
        yesBtn.style.background = 'linear-gradient(135deg, #8a4360 0%, #6a3248 100%)';
        noBtn.style.display = 'none';
    }
    
    // Animate panda
    function animatePanda() {
        const panda = document.querySelector('.panda');
        const leftArm = document.querySelector('.left-arm');
        const rightArm = document.querySelector('.right-arm');
        const head = document.querySelector('.head');
        
        if (panda) panda.style.animation = 'pandaBounce 2s infinite';
        if (leftArm) leftArm.style.animation = 'waveLeft 1.5s infinite';
        if (rightArm) rightArm.style.animation = 'waveRight 1.5s infinite';
        if (head) head.style.animation = 'headTilt 3s infinite';
        
        // Add CSS animations if not already present
        if (!document.getElementById('panda-animations')) {
            const style = document.createElement('style');
            style.id = 'panda-animations';
            style.textContent = `
                @keyframes pandaBounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes waveLeft {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(-20deg); }
                }
                
                @keyframes waveRight {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(20deg); }
                }
                
                @keyframes headTilt {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(5deg); }
                    75% { transform: rotate(-5deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Subtle confetti effect
    function createSubtleConfetti() {
        const colors = ['rgba(175, 90, 120, 0.1)', 'rgba(175, 90, 120, 0.15)', 'rgba(175, 90, 120, 0.2)'];
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '6px';
            confetti.style.height = '6px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.top = '-20px';
            confetti.style.left = Math.random() * 100 + '%';
            
            document.querySelector('.card').appendChild(confetti);
            
            confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 0.8 },
                { transform: `translateY(${Math.random() * 200 + 100}px) rotate(${Math.random() * 180}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 2000 + 1500,
                easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)'
            });
            
            setTimeout(() => {
                confetti.remove();
            }, 3500);
        }
    }
    
    // Reset button position
    noBtn.addEventListener('mouseleave', function() {
        setTimeout(() => {
            noBtn.style.transform = 'translate(0, 0)';
            noBtn.style.opacity = attempts > 4 ? '0.9' : '1';
        }, 300);
    });
    
    // Event listeners
    yesBtn.addEventListener('click', handleYesButtonClick);
    
    // Initialize
    noBtn.textContent = "No";
    attempts = -1;
});