import { Room } from "../database/schema/roomeSchema";
import { User } from "../database/schema/userSchema";

export class QnaService {
      createRoom = async(roomName: string):Promise<object> => {
        const keycode = Math.round(Math.random() * 10000);

        const newRoom = await Room.create({
            roomName,
            keycode
        });

        return newRoom;
    }


    addUser = async(keycode: string, userId: string): Promise<object> =>{
        const users = this.getAllUserId(keycode);

        const usersData = await users;
        const userExists = usersData.find(data =>{ 
            console.log(data+" ==="+ userId)
            data == userId
        });

        console.log(userExists);

        if(!userExists){
            return {msg:""};
        }

        const user = await User.findById(userId);

        console.log(userId);
        if (!user) {
            throw new Error("User does not exist at addUser");
        }
 
     const AddedUser =  await Room.updateOne(
            { keycode: keycode },
            { $push: { participants: user._id } },
        );

        return AddedUser;
    }

    getRooms = async(): Promise<any> =>{
        const Rooms = await Room.find({});

        return Rooms;
    }

    getAllUsers = async(roomId:string): Promise<string[]> =>{
        const rooms = await Room.find({});
        const userIds = rooms.flatMap(el=>el?.parcitipants);

        const userPromises = userIds.map(async (userId) => {
            const user = await User.findById(userId);
            return user?.userName;
        });

        const userNames = Promise.all(userPromises);
        return (await userNames).filter(name => name !== undefined) as string[];
    }

    getAllUserId = async(roomId:string): Promise<string[]> =>{
        const rooms = await Room.find({});
        const userIds = rooms.flatMap(el=>el?.parcitipants);

        const userPromises = userIds.map(async (userId) => {
            const user = await User.findById(userId);
            return user?._id;
        });

        const userId = Promise.all(userPromises);
        return (await userId).filter(id => id !== undefined) as unknown as string[];
    }
}