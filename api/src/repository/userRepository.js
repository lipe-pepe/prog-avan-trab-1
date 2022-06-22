import User from "../repository/models/User.js";

class UserRepository {
    static getUsers = async () => {
        let users = await User.find();
        return users;
    }

    static addUser = async (body) => {
        let user = User(body);
        if ((await User.find({ email: user.email })).length > 0) {
            throw Error(`There's already an user created with the given email: ${user.email}`);
        }
        await user.save();
        return true;
    }

    static deleteUser = async (_, params) => {
        let user = await User.findById(params.id);
        if (!user) {
            throw Error(`User doesn't exist`);
        }
        await user.delete();
        return true;
    }
}

export default UserRepository;