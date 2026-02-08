document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const responseDiv = document.getElementById('response');
    const contentDiv = document.querySelector('.content');
    const floatingHearts = document.querySelector('.floating-hearts');
    
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
    noBtn.addEventListener('mouseover', function() {
        if (responseDiv.style.display === 'flex') return;
        
        attempts++;
        
        // Change button text
        const messageIndex = Math.min(attempts - 1, messages.length - 1);
        noBtn.textContent = messages[messageIndex];
        
        // Elegant movement (subtle, not jumpy)
        const movements = [
            { x: 20, y: -10 },
            { x: -15, y: 15 },
            { x: 10, y: -15 },
            { x: -20, y: 10 },
            { x: 15, y: -20 }
        ];
        
        const moveIndex = (attempts - 1) % movements.length;
        noBtn.style.transform = `translate(${movements[moveIndex].x}px, ${movements[moveIndex].y}px)`;
        
        // Fade button slightly on many attempts
        if (attempts > 4) {
            noBtn.style.opacity = '0.9';
        }
        
        // After several attempts, change button style
        if (attempts >= 7) {
            noBtn.textContent = "Yes?";
            noBtn.style.background = 'linear-gradient(135deg, #af5a78 0%, #8a4360 100%)';
            noBtn.style.color = 'white';
            noBtn.style.borderColor = '#8a4360';
            noBtn.style.transform = 'translate(0, 0)';
            noBtn.style.opacity = '1';
        }
    });
    
    // Handle Yes button click
    yesBtn.addEventListener('click', function() {
        // Hide the content
        contentDiv.style.display = 'none';
        
        // Show the response
        responseDiv.style.display = 'flex';
        
        // Create more hearts
        createHearts(20);
        
        // Gentle animation
        responseDiv.style.animation = 'fadeIn 1s ease';
        
        // Add subtle confetti
        createSubtleConfetti();
        
        // Animate the panda
        animatePanda();
        
        // Change button colors
        yesBtn.style.background = 'linear-gradient(135deg, #8a4360 0%, #6a3248 100%)';
        noBtn.style.display = 'none';
    });
    
    // Animate panda
    function animatePanda() {
        const panda = document.querySelector('.panda');
        const leftArm = document.querySelector('.left-arm');
        const rightArm = document.querySelector('.right-arm');
        const head = document.querySelector('.head');
        
        // Panda bounce
        panda.style.animation = 'pandaBounce 2s infinite';
        
        // Arms waving
        leftArm.style.animation = 'waveLeft 1.5s infinite';
        rightArm.style.animation = 'waveRight 1.5s infinite';
        
        // Head tilt
        head.style.animation = 'headTilt 3s infinite';
        
        // Create CSS animations
        const style = document.createElement('style');
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
            
            // Gentle animation
            confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 0.8 },
                { transform: `translateY(${Math.random() * 200 + 100}px) rotate(${Math.random() * 180}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 2000 + 1500,
                easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)'
            });
            
            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, 3500);
        }
    }
    
    // Reset button position when mouse leaves
    noBtn.addEventListener('mouseleave', function() {
        setTimeout(() => {
            noBtn.style.transform = 'translate(0, 0)';
        }, 300);
    });
});