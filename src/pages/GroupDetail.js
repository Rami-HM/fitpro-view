import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';

//redux
import {useDispatch} from 'react-redux';
import {actionCreators as UserActions} from '../redux/modules/user';

const GroupDetail = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;

  const dispatch = useDispatch(); // mapDispatch~~~
  const getUsers = async() =>{
    const usersInstance = await axios({
      method : 'GET',
      url : 'http://127.0.0.1:3000/user/list',
    });

    dispatch(UserActions.setUsers(usersInstance.data));
  }

  useEffect(()=>{
    getUsers();
  },[]);

  const users = useSelector(state => state.user.users);

  // user? : user가 null 이면 undefine 반환
  //  user && user.groupId 와 같은 의미.
  const filterUsers = users.filter(user => user?.groupId === Number(id));

  return (
    <table width="700">
      <tbody>
      <tr>
        <th colSpan={5}>그룹</th>
      </tr>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>tel</th>
        <th>email</th>
        <th>bookmark</th>
      </tr>

      {filterUsers.map(user =>{
        return(
        <tr key = {user.id}>
          <td>{user.id}</td>
          <td>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </td>
          <td>{user.tel}</td>
          <td>{user.email}</td>
          <td>{user.bookMarkYN}</td>
        </tr>
        );
      })}
      </tbody>
    </table>
  );
};

export default GroupDetail;
