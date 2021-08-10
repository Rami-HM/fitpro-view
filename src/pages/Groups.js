import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

//redux
import {useDispatch} from 'react-redux';
import {actionCreators as UserActions} from '../redux/modules/user';

const Groups = (props) => {

  const [groups,setGroups] = useState([]);
  const dispatch = useDispatch(); // mapDispatch~~~

  const getGroups = async() =>{
    const groupsInstance = await axios({
      method : 'GET',
      url : 'http://127.0.0.1:3000/group/list',

    })
    setGroups(groupsInstance.data);

  }

  const getUsers = async() =>{
    const usersInstance = await axios({
      method : 'GET',
      url : 'http://127.0.0.1:3000/user/list',
    });

    dispatch(UserActions.setUsers(usersInstance.data));
  }

  useEffect(()=>{
    console.log('mount');
    getGroups();
    getUsers();

    return () =>{
      console.log('unMount');

    } //willUnMount

  },[]);//didMount


  //해당 state가 변경 될떄 (update) 
  useEffect(()=>{
    console.log('groups update', groups)

  },[groups]); // didUpdate,

  return (
    <table width="200">
      <tbody>
      <tr>
        <th>id</th>
        <th>name</th>
      </tr>
      
      {
        groups.map((group) =>{
          return(
          <tr key = {group.id}>
              <td>{group.id}</td>
              <td>
                <Link to={`/group/${group.id}`}>{group.groupName}</Link>
              </td>
            </tr>
          );
        })
      }
    </tbody>
    </table>
  );
};

export default Groups;
