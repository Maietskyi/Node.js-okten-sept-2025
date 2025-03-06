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
    async updateById(id, partialUpdate) {
        return await userRepository.updateById(id, partialUpdate);
    };
    async partialUpdateById(id, partialUpdate) {
        return await userRepository.partialUpdateById(id, partialUpdate);
    };
    async deleteById(id) {
        return await userRepository.deleteById(id);
    };
}

const userService  = new UserService();

module.exports = {
    userService
}
