import React from 'react'

const UserDetailView = (props) =>{

    const {user} = props;

    return (
    <table width="400">
        <tbody>
            <tr>
                <th colSpan={5}>{user.name}</th>
            </tr>
            <tr>
                <th>id</th>
                <td>{user.id}</td>
            </tr>
            <tr>
                <th>tel</th>
                <td>{user.tel}</td>
            </tr>
            <tr>
                <th>email</th>
                <td>{user.email}</td>
            </tr>
            <tr>
                <th>bookmark</th>
                <td>{user.bookMarkYN}</td>
            </tr>
        </tbody>
    </table>
    )
}
export default UserDetailView;

