import bcrypt from "bcrypt"
import {Password} from "../types/index.js";

interface ComparePassword {
    requestPass: Password,
    userPass: Password
}

class AuthService {
    async hashPassword(password: Password): Promise<string> {
        return bcrypt.hashSync(password, 7)
    }

    async comparePassword({requestPass, userPass}: ComparePassword): Promise<boolean> {
        return bcrypt.compareSync(requestPass, userPass)
    }
}

export default new AuthService()