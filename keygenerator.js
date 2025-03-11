document.getElementById('generate').addEventListener('click', function() {
    const uppercase = document.getElementById('uppercase').checked;
    const lowercase = document.getElementById('lowercase').checked;
    const numbers = document.getElementById('numbers').checked;
    const symbols = document.getElementById('symbols').checked;
    const length = parseInt(document.getElementById('length').value);
    
    const password = generatePassword(uppercase, lowercase, numbers, symbols, length);
    document.getElementById('password').value = password;
    document.getElementById('strength').innerText = getPasswordStrength(password);
});

function generatePassword(uppercase, lowercase, numbers, symbols, length) {
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*_+;:,.';
    
    let allChars = '';
    if (uppercase) allChars += upperChars;
    if (lowercase) allChars += lowerChars;
    if (numbers) allChars += numberChars;
    if (symbols) allChars += symbolChars;

    if (allChars.length === 0) return '';

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }
    return password;
}

function getPasswordStrength(password) {
    let strength = 'Weak';
    const lengthCriteria = password.length >= 8;
    const varietyCriteria = (/[A-Z]/.test(password) ? 1 : 0) +
                            (/[a-z]/.test(password) ? 1 : 0) +
                            (/[0-9]/.test(password) ? 1 : 0) +
                            (/[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password) ? 1 : 0);
    
    // Check for common patterns (this is a simple example)
    const commonPasswords = ['123456', 'password', '123456789', '12345678', '12345', 'qwerty', 'abc123', 'letmein'];
    if (commonPasswords.includes(password)) {
        return 'Very Weak';
    }

    // Determine strength based on criteria
    if (lengthCriteria && varietyCriteria >= 3) {
        strength = 'Strong';
    } else if (lengthCriteria && varietyCriteria === 2) {
        strength = 'Medium';
    }

    return strength;
}