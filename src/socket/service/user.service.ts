import { User } from "../module/user.module";

export class UserService {
    private users: User[] = [];

    addUser(username:string):User{
        const user:User = {username};
        this.users.push(user);
        return user;
    }

    getUser(userName:string):User | undefined{
        return this.users.find(user => user.username===userName);
    }
};