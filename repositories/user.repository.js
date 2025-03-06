const {read, write} = require ("../services/fs.service");

// Функція тільки викликає 2 методи: читання і запис
class UserRepository {
    async getAll() {
        return read()
    };

    // записує, спочатку читає всіх користувачів а потім записує
    async create(user) {
        const users = await read();
        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            name: user.name,
            surname: user.surname,
            age: user.age
        };
    //     звертаємось до наших користувачів виводимо їх і пушимо нового користувача
    users.push(newUser);
    await write(users);
    return newUser;
    };

    async getById(id){
        const users = await read();
        const index = users.findIndex(user => user.id === Number(id));
        return users[index]
    }

    // async updateById(id){
    //     const users = await read();
    //     const index = users.findIndex(user => user.id === Number(id));
    //     const user = users[index];
    //     const updateUser = {
    //         name: user.name.body? user.name.body: user.name,
    //         surname: user.surname.body? user.surname.body: user.surname,
    //         age: user.age.body? user.age.body: user.age
    //     };
    //     users.push(updateUser);
    //     await write(users);
    //     return updateUser;
    // }

    async deleteById(id){
        const users = await read();
        const index = users.findIndex(user => user.id === Number(id));
        return users[index]
    }
}

// Створюю новий екземпляр класу
const userRepository = new UserRepository();

module.exports = {
    userRepository
}