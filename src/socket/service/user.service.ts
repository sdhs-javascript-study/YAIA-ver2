import { User } from "../module/user.module";

export class UserService {
    private users: User[] = [];

    addUser(id:string,username:string):User{
        const user:User = {id,username};
        this.users.push(user);
        return user;
    }

    getUser(id: string):User | undefined{
        return this.users.find(user => user.id===id);
    }
};