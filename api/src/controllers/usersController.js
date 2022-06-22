import UserRepository from "../repository/userRepository.js";
import dbHandler from "../repository/index.js";

class UserController {
    static getUsers = async (_) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const users = await dbHandler(UserRepository.getUsers);
            return {
                headers,
                statusCode: 200,
                body: { users }
            }
        } catch (e) {
            console.log(e)
            return {
                headers,
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }

    static addUser = async (httpRequest) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const success = await dbHandler(UserRepository.addUser, httpRequest.body);
            return {
                headers,
                statusCode: 201,
                body: { success }
            }
        } catch (e) {
            console.log(e)
            return {
                headers,
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }

    static deleteUser = async (httpRequest) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const success = await dbHandler(
                UserRepository.deleteUser,
                httpRequest.body,
                httpRequest.params
            );
            return {
                headers,
                statusCode: 200,
                body: { success }
            }
        } catch (e) {
            console.log(e)
            return {
                headers,
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }
}

export default UserController;