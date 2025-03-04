const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Шлях до вхідного файлу
const inputFile = path.join(__dirname, 'emails.txt');
const outputFile = path.join(__dirname, 'email.txt');

const rl = readline.createInterface({
    input: fs.createReadStream(inputFile),
    output: process.stdout,
    terminal: false
});

const gmailEmails = [];

rl.on('line', (line) => {
    const parts = line.split(/\s+/);
    if (parts.length > 1) {
        const email = parts[1];
        if (email.endsWith('@gmail.com')) {
            gmailEmails.push(email);
        }
    }
});

rl.on('close', () => {
    fs.writeFile(outputFile, gmailEmails.join('\n'), 'utf8', (err) => {
        if (err) {
            console.error(`Помилка запису файлу ${outputFile}:`, err);
        } else {
            console.log(`Файл ${outputFile} успішно створено!`);
        }
    });
});



