export const redirect = (props,url) =>{
    //window.location.href = url; redux 값이 날라가 버린다...
    props.history.push(url);
}