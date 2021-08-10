import React, { useState } from 'react'
import axios from 'axios';

const UserDetailForm = (props) =>{
    const {user, onUpdated} = props;
    
    //const [name, setName] = useState(user.name);
    const [inputUser, setInputUser] = useState({
        name : user.name,
        tel : user.tel,
        email : user.email
    });

    const handleChange = field => e => {
        const value = e.target.value;

        setInputUser(prevInputUser =>{
            return{
                ...prevInputUser,
                [field] : value
            }
        })
    }
    
    const handleClickSaveButton = async() => {
        try {
            await axios({
                method:'PATCH',
                url:'http://127.0.0.1:3000/user/modify',
                data:{
                    ...user,
                    name: inputUser.name,
                    tel:inputUser.tel,
                    email: inputUser.email
                }
            });
            onUpdated();
        } catch (error) {
            
        }
    }

    return (
    <>
    <table width="400">
        <tbody>
            <tr>
                <th colSpan={5}>
                    <input type = "text" value = {inputUser.name} onChange = {handleChange("name")}/>
                </th>
            </tr>
            <tr>
                <th>id</th>
                <td>{user.id}</td>
            </tr>
            <tr>
                <th>tel</th>
                <td><input type = "text" value = {inputUser.tel} onChange = {handleChange("tel")}/></td>
            </tr>
            <tr>
                <th>email</th>
                <td><input type = "text" value = {inputUser.email} onChange = {handleChange("email")}/></td>
            </tr>
            <tr>
                <th>bookmark</th>
                <td>{user.bookMarkYN}</td>
            </tr>
        </tbody>
    </table>
    <button onClick = {handleClickSaveButton}>저장</button>
    </>
    )
}
export default UserDetailForm