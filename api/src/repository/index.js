import makeDb from "../config/dbConnect.js";

export default async function dbHandler(operation, body, params, query) {
    await makeDb();
    let result = await operation(body, params, query);
    return result;
}