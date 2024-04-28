import { Room } from "../database/schema/roomeSchema";
import { User } from "../database/schema/userSchema";

export class userService {
   public createUser = async (name: string): Promise<object> => {
        const userExists = await User.exists({ userName: name });


        if (userExists) throw new Error("name already taken");
        const user = await User.create({ userName: name });
        console.log(user);
        return user;
    }
    public sendUser = async (name: string): Promise<object | boolean> => {
        const users = await User.find({ userName: name });
        if(users.length === 0) return false; 
        const userNames = users.map((user) => user.userName); 
        return { "user": userNames };
    }
    
  public addRoom = async (name: string, roomId: string): Promise<object> => {
        try {
            const room = await Room.findOne({ keycode: roomId });


            const newUser = await User.findOneAndUpdate(
                { userName: name },
                { $push: { roomsEnterd: room?._id } }
            );

            await room?.updateOne(
                { $push: { parcitipants: newUser?._id } }
            );

            if (!newUser) {
                throw new Error("Could not find user");
            }

            if (!room) {
                throw new Error("Could not find room");
            }

            return { newUser, room };
        } catch (error: any) {
            throw new Error(`Error adding room: ${error.message}`);
        }
    }

}
