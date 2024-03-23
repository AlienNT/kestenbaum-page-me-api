import bcrypt from "bcrypt"
class AuthService {
    async hashPassword(password){
        return bcrypt.hashSync(password, 7)
    }
    async comparePassword({requestPass, userPass}){
        console.log('comparePassword' , {requestPass, userPass})
        return bcrypt.compareSync(requestPass, userPass)
    }
}
export default new AuthService()