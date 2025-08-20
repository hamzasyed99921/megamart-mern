class UserDTO{
    constructor(user){
        this._id = user._id;
        this.contact = user.contact;
        this.username = user.username;
        this.email = user.email;
        this.role = user.role;
        
    }
}

module.exports = UserDTO;