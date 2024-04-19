import { User } from "../database/schema/userSchema";

export class userService {
    createUser = async (name: string): Promise<object> => {
        const userExists = await User.exists({ userName: name });


        if (userExists) throw new Error("name already taken");
        const user = await User.create({ userName: name });
        console.log(user);
        return user;
    }

    sendUser = async (): Promise<object> => {
        const users = { j: "jjj" }
        return users;
    }

    addRoom = async (name: string, roomId: string): Promise<object> => {
    try {
        const newUser = await User.findOneAndUpdate(
            { userName: name },
            { $push: { roomsEnterd: roomId } }
        );

        if (!newUser) {
            throw new Error("Could not find user");
        }

        return newUser;
    } catch (error:any) {
        throw new Error(`Error adding room: ${error.message}`);
    }
}

}
