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

// const afs = require('node:fs/promises');
// const path = require('node:path');
//
// const fs = require('node:fs');
// const readline = require("node:readline/promises");
//
// const start = async () => {
//     // await fs.mkdir(path.join('storage', 'files'), {recursive: true});  // Створювати директорії
//     const filePath = path.join('storage', 'asd', 'myFile2.txt')
//     // await afs.writeFile(filePath, 'Hello1\n');  // написати щось у файлі
//     // await afs.appendFile(filePath, 'Hello2\n'); // Написати щось нове не стираючи попередні написи
//     // const arrayReadFile = await fs.readFile(filePath); // Прочитати напис як буфер
//     // const arrayReadFile = await fs.readFile(filePath, {encoding:'utf-8'}); // Прочитати напис нормально
//     // console.log(arrayReadFile);
//     // await afs.rename(filePath, path.join(process.cwd(), 'storage', 'asd', 'myFile2.txt')); // Перемістити файл
//     // await afs.rename(filePath, path.join(path.dirname(filePath), 'myFile3.txt')); // Перейменувати файл
//     // await afs.copyFile(filePath, path.join(path.dirname(filePath), 'myFile.txt')); // Копіювати файл
//     // await afs.rm(path.dirname(filePath)); // Видалити
//     // await afs.rmdir(path.join(process.cwd(), 'storage'), {recursive: true}); // Видалити
//     // await afs.unlink('1111.txt'); // Мало б видаляти, але видаляє тільки з основної директорії
//     // console.log(await afs.stat('services/test.js')); // повертає директорію, щоб подивитись
//     // const stats = await afs.stat('services/test.js')// Перевірити чи шлях є директорією чи файлом
//     // console.log(stats.isDirectory());
//
//     // Пострічково читати файл
//     // const fileStream = fs.createReadStream(filePath, 'utf-8')
//     // const rl = readline.createInterface({input: fileStream});
//     // try {
//     //     for await (const line of rl) {
//     //         await afs.appendFile('res.txt', `${line}---------\n`);
//     //     }
//     // } finally {
//     //     await rl.close();
//     // }
// // Можна копіювати будь які файли кодом
//     // const readStream = fs.createReadStream('3x4.jpg'); // читаємо файл (фото) по частинах (chunk) чанках
//     // const writeStream = fs.createWriteStream('123.jpg') // записуємо файл (фото) по частинах (chunk) чанках
//     // // readStream.on('data', (chunk) => { // Можна написати так колбеком
//     // //     writeStream.write(chunk);
//     // // })
//     // readStream.pipe(writeStream); // А можна ось так, результат такий самий
// };
// start();

// ////////////////////////////////////////////////////////////////
// os
//////////////////////////////////////////////////////////////////

// const os = require('node:os');
//
// // console.log(os.arch()); // архітектура процесора х64
// // console.log(os.cpus()); // Показує кількість ядрів процесора, інформація про кожне ядро окремо
// // console.log(os.totalmem()/1024/1024/1024); // Показує кількість оперативної пам'яті в гігабайтах
// // console.log(os.freemem()/1024/1024/1024); // Показує вільну оперативну пам'ять в гігабайтах
// // console.log(os.homedir()); // Показує робочу директорію
// // console.log(os.hostname()); // Показує назву пристрою
// // console.log(os.release()); // Показує версію ядра
// // console.log(os.tmpdir()); // тимчасову директорію
// // console.log(os.type()); // тип операційної системи
// // console.log(os.uptime()); // час роботи операційної системи в секундах
// // console.log(os.userInfo()); // інформація про користувача
// // console.log(os.version()); // версія операційної системи
// // console.log(os.networkInterfaces()); // інформація про мережеве обладнання (інтернет) до якого підключені
// // console.log(os.platform()); // інформація про платформу

// ////////////////////////////////////////////////////////////////
// events - логіка яка може виконатись при якомусь тригері, типу як useEfect
//////////////////////////////////////////////////////////////////

const enitter = require('node:events');

const en = new enitter.EventEmitter();

en.on('fcall', () => {
    console.log('fcall');
});
en.on('scall', (name, age) => {
    console.log('scall', name, age);
}); // on - можна викликати стільки скільки викликаємо

en.once('rcall', (name, age) => {
    console.log('rcall', name, age);
}); // once - можна викликати лише один раз, не залежно від того скільки разів викликаємо

en.emit('scall', 'Misha', 25)  // Провокуємо (тригерю) на спрацювання
en.emit('fcall')  // Провокуємо (тригерю) на спрацювання

en.emit('rcall')  // Провокуємо (тригерю) на спрацювання
en.emit('rcall')  // Провокуємо (тригерю) на спрацювання
en.emit('rcall')  // Провокуємо (тригерю) на спрацювання




