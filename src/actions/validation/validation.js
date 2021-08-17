let valiFields = {};

export const handleValidation = (obj, type, field, required) => {
  return validation({ [type]: { value: obj[field], required } });
};

export const resetValiFields = () => {
  valiFields = {};
};

export const validation = (fields) => {
  valiFields = { ...valiFields, ...fields };
  for (const key in fields) {
    if (Object.hasOwnProperty.call(fields, key)) {
      const element = fields[key].value;
      if (!element) return;
      switch (key) {
        case "id":
          return idValidation(element);
        case "password":
          return passwordValidation(element);
        case "email":
          return emailValidation(element);
        case "name":
          return textValidation(element, 10);
        case "title":
          return textValidation(element, 1000);
        case "sub_title":
          return textValidation(element, 1000);
        default:
          if (key.includes("text")) {
            const obj = key.split("-");
            return textValidation(element, obj[1]);
          }
          break;
      }
    }
  }
};

export const getFailValidationList = () => {
  let list = [];
  for (const key in valiFields) {
    if (Object.hasOwnProperty.call(valiFields, key)) {
      const element = valiFields[key].value;
      if (valiFields[key].required) if (required(element)) list.push(key); // 필수값 검사
      switch (key) {
        case "id":
          if (idValidation(element)) list.push("id");
          break;
        case "password":
          if (passwordValidation(element)) list.push("password");
          break;
        case "email":
          if (emailValidation(element)) list.push("email");
          break;
        case "name":
          if (textValidation(element, 10)) list.push("name");
          break;
        case "title":
          if (textValidation(element, 1000)) list.push("title");
          break;
        case "sub_title":
          if (textValidation(element, 1000)) list.push("sub_title");
          break;
        default:
          if (key.includes("text")) {
            const obj = key.split("-");
            if (textValidation(element, obj[1])) list.push("text");
          }
          break;
      }
    }
  }
  //debugger;
  return list;
};

const required = (value) => {
  if (value.length === 0) return "입력값이 없습니다.";
};

const idValidation = (newId) => {
  if (newId.length >= 10) return "아이디는 10자를 넘을 수 없습니다.";
};

const passwordValidation = (newPwd) => {
  if (newPwd.length === 0) return;
  var regex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  if (!regex.test(newPwd))
    return "특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내";
};

const emailValidation = (newEmail) => {
  if (newEmail.length === 0) return;
  let emailExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (!emailExp.test(newEmail)) return "올바르지 않은 이메일 형식 입니다.";
  if (newEmail.length >= 50) return "이메일은 30자를 넘을 수 없습니다.";
};

const textValidation = (newText, length) => {
  if (newText.length === 0) return;
  if (newText.length >= length) return length + "자를 넘을 수 없습니다.";
};
