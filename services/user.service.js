const {userRepository} = require("../repositories/user.repository") ;

class UserService {
    async getAll() {
        return await userRepository.getAll();
    };
    async create(user) {
        return await userRepository.create(user);
    };
    async getById(id) {
        return await userRepository.getById(id);
    };
    async update(id) {
        return await userRepository.updateById(id);
    };
    async delete(id) {
        return await userRepository.deleteById(id);
    }
}

const userService  = new UserService();

module.exports = {
    userService
}
