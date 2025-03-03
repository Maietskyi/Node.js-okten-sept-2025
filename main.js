// console.log('Hello from NodeJs');
//
// console.log(__dirname);
// console.log(__filename);
// console.log(process.cwd());
//
// const {a, myFunc} = require ('./services/test');
// console.log(a);
// myFunc();

// Стандартні імпорти ноди
// ////////////////////////////////////////////////////////////////
// http
//////////////////////////////////////////////////////////////////
// const http = require('node:http');
//
// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'application/json'});
//
//     if (req.url === '/cars') {
//         switch (req.method) {
//             case 'GET':
//                 return res.end(JSON.stringify({
//                     data: 'my cars'
//                 }));
//             case 'POST':
//                 return res.end(JSON.stringify({
//                     data: 'Want to create a car?'
//                 }))
//         }
//     }
// });
//
// server.listen(5555);

// ////////////////////////////////////////////////////////////////
// path
//////////////////////////////////////////////////////////////////
// const path = require('node:path');
// const fs = require("node:fs");
//
// const filePath = path.join(process.cwd(), 'services', 'test.js');
//
// console.log(filePath);
//
// console.log(path.basename(filePath)); // остання частина шляху
// console.log(path.dirname(filePath)); // все окрім останньої частини шляху
// console.log(path.extname(filePath)); // віддає розширення файлу
// console.log(path.parse(filePath)); // формує об'єкт про шлях
// console.log(path.normalize('////house/\\/detail///')); // нормалізує урлу, забирає лишні слеші
// console.log(path.isAbsolute(filePath)); // перевіряє чи абсолютний, чи відносний шлях
// console.log(path.isAbsolute('./services/test.js')); // перевіряє чи абсолютний, чи відносний шлях
//

// ////////////////////////////////////////////////////////////////
// readLine
//////////////////////////////////////////////////////////////////

// const readLine = require('node:readline/promises');
//
// const start = async () => {
//     const rlInterface = readLine.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });
//
//     const name = await rlInterface.question('What is your name? ');
//     const age = await rlInterface.question('How old are you? ');
//
//     console.log(`Hello, ${name} - ${age} `);
//     rlInterface.close(); // Так можна зробити якщо відкриваємо через create
//     // process.exit(0); // Так можна завжди
// };
//
// start();

// ////////////////////////////////////////////////////////////////
// fs
//////////////////////////////////////////////////////////////////

const fs = require('node:fs/promises');
const path = require('node:path');

const start = async () => {
    // await fs.mkdir(path.join('storage', 'files'), {recursive: true});  // Створювати директорії
    const filePath = path.join('storage', 'asd', 'myFile2.txt')
    // await fs.writeFile(filePath, 'Hello1\n');  // написати щось у файлі
    // await fs.appendFile(filePath, 'Hello2\n'); // Написати щось нове не стираючи попередні написи
    // const arrayReadFile = await fs.readFile(filePath); // Прочитати напис як буфер
    // const arrayReadFile = await fs.readFile(filePath, {encoding:'utf-8'}); // Прочитати напис нормально
    // console.log(arrayReadFile);
    // await fs.rename(filePath, path.join(process.cwd(), 'storage', 'asd', 'myFile2.txt')); // Перемістити файл
    // await fs.rename(filePath, path.join(path.dirname(filePath), 'myFile3.txt')); // Перейменувати файл
    // await fs.copyFile(filePath, path.join(path.dirname(filePath), 'myFile.txt')); // Копіювати файл
    // await fs.rm(path.dirname(filePath)); // Видалити
    // await fs.rmdir(path.join(process.cwd(), 'storage'), {recursive: true}); // Видалити
    // await fs.unlink('1111.txt'); // Мало б видаляти, але видаляє тільки з основної директорії
    // console.log(await fs.stat('services/test.js')); // повертає директорію, щоб подивитись
    // const stats = await fs.stat('services/test.js')// Перевірити чи шлях є директорією чи файлом
    // console.log(stats.isDirectory());
};

start();







