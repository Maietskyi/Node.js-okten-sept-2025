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

    async updateById(id, updatedUser) {
        const users = await read();
        const index = users.findIndex(user => user.id === Number(id));
        if (index === -1) return null;
        users[index] = { id: Number(id), ...updatedUser };
        await write(users);
        return users[index];
    }

    async partialUpdateById(id, partialUpdate) {
        const users = await read();
        const index = users.findIndex(user => user.id === Number(id));
        if (index === -1) return null;
        users[index] = { ...users[index], ...partialUpdate };
        await write(users);
        return users[index];
    }

    async deleteById(id) {
        const users = await read();
        const index = users.findIndex(user => user.id === Number(id));
        if (index === -1) return null;
        const deletedUser = users.splice(index, 1)[0];
        await write(users);
        return deletedUser;
    }
}

// Створюю новий екземпляр класу
const userRepository = new UserRepository();

module.exports = {
    userRepository
}