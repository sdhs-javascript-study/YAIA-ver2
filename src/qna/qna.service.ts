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
        const user = await User.findById(userId); 

        if (!user) {
            throw new Error("User does not exist at addUser");
        }
 
     const AddedUser =  await Room.updateOne(
            { keycode: keycode },
            { $push: { participants: user._id } },
            (err: any, result: any) => {
                if (err) {
                    throw new Error(`Could not find a room with the providen keycode : ${err}`);
                } else {
                    console.log("Update result:", result);
                }
            }
        );

        return AddedUser;
    }

    getRooms = async(): Promise<any> =>{
        const Rooms = await Room.find({});

        return Rooms;
    }
}