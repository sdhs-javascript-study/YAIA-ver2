"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    constructor() {
        this.users = [];
    }
    addUser(id, username) {
        const user = { id, username };
        this.users.push(user);
        return user;
    }
    getUser(id) {
        return this.users.find(user => user.id === id);
    }
}
exports.UserService = UserService;
;
