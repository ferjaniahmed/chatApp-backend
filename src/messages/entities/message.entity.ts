import { UserEntity } from "src/users/entities/user.entity"

export class MessageEntity {
    _id ? : string
    sender: UserEntity
    receiver : UserEntity
    data : string
    createAt : Date
    updateAt : Date
}
