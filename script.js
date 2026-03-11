const textInput = document.getElementById('text-input');
const totalChars = document.getElementById('total-chars');
const remainingChars = document.getElementById('remaining-chars');
const progressBar = document.getElementById('progress-bar');
const counterCard = document.getElementById('counter-card');

const maxLength = parseInt(textInput.getAttribute('maxlength'));

textInput.addEventListener('input', () => {
    updateCounters();
});

function updateCounters() {
    const currentLength = textInput.value.length;
    const remaining = maxLength - currentLength;

    // Update numbers
    totalChars.textContent = currentLength;
    remainingChars.textContent = remaining;

    // Update progress bar
    const percentage = (currentLength / maxLength) * 100;
    progressBar.style.width = `${percentage}%`;

    // Dynamic coloring for progress bar and text
    if (percentage > 90) {
        progressBar.style.background = 'linear-gradient(90deg, #ef4444, #f87171)';
        remainingChars.style.color = '#ef4444';
    } else if (percentage > 70) {
        progressBar.style.background = 'linear-gradient(90deg, #f59e0b, #fbbf24)';
        remainingChars.style.color = '#f59e0b';
    } else {
        progressBar.style.background = 'linear-gradient(90deg, #4f46e5, #818cf8)';
        remainingChars.style.color = '#64748b';
    }

    // Subtle shake effect when hitting limit
    if (currentLength === maxLength) {
        counterCard.classList.add('shake');
        setTimeout(() => {
            counterCard.classList.remove('shake');
        }, 500);
    }
}

// Add CSS for shake animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateY(-5px) translateX(0); }
        25% { transform: translateY(-5px) translateX(-4px); }
        50% { transform: translateY(-5px) translateX(4px); }
        75% { transform: translateY(-5px) translateX(-4px); }
    }
    .shake {
        animation: shake 0.4s ease-in-out;
    }
`;
document.head.appendChild(style);

// Initial call to set values correctly
updateCounters();
