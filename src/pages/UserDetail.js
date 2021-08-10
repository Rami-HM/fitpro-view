import React, { useEffect, useState } from "react";
import axios from "axios";
import UserDetailView from '../component/UserDetailView';
import UserDetailForm from '../component/UserDetailForm';


const UserDetail = (props) => {
  
  const { match: {params: {id}}} = props;
  
  const [user, setUser] = useState({});
  const [isUpdatePage, setIsUpdatePage] = useState(false);

  const getUser = async() =>{
    const userInstance = await axios({
      method : "GET",
      url : `http://127.0.0.1:3000/user/Info/${id}`, 
    });

    setUser(userInstance.data);
  }

  const handleUpdated = async() =>{

    await getUser();
    setIsUpdatePage(false);
  }

  useEffect(()=>{
    getUser();
  },[]);

  if(!user.id) return null; //isUpdatePage 는 초기 값이 true 이기에 한번 렌더링 되고 나서 getUser를 통해 다시 리랜더링이 됨
  // useState 는 최초 랜더때만 값이 없데이트 되기때문에 uerDetailForm안의 useState가 실행이 되지 않아 user.name 등의 값이 들어 가지 않음.

  return (
    <>
      {isUpdatePage ? 
        (
          <>
          <UserDetailForm user={user} onUpdated = {handleUpdated}/>
          </>
        ) : (
          <>
          <UserDetailView user={user} />
          <button onClick = {()=>setIsUpdatePage(true)}>수정</button>
          </>
        )}
    </>
  );
};

export default UserDetail;
