export function isSessionToken(){

    //axios 로 api 호출 후 유효토큰인지 확인

    return localStorage.getItem('accessToken') ? true : false;
}

export async function setSessionToken(response){
    await localStorage.setItem('accessToken', response.data['accessToken']);
}

export async function setSessionUser(response){
    await localStorage.setItem('user', JSON.stringify(response.data['user']));
}

export function getSessionToken(){
    return localStorage.getItem('accessToken');
}
export function getSessionUser(){
    return JSON.parse(localStorage.getItem('user'));
}