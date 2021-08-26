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
        case "fail_contents":
          return textValidation(element, 100);
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
        case "fail_contents":
          if (textValidation(element, 100)) list.push("fail_contents");
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
  let emailExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (!emailExp.test(newEmail)) return "올바르지 않은 이메일 형식 입니다.";
  if (newEmail.length >= 50) return "이메일은 30자를 넘을 수 없습니다.";
};

const textValidation = (newText, length) => {
  if (!newText || newText.length === 0) return;
  if (newText.length >= length) return length + "자를 넘을 수 없습니다.";
};

// 할일 기간 유효성 체크 (대상의 시작-종료 날짜, 대상 상위의 시작-종료 날짜)
export const checkTaskDate = (target, uSdate, uEdate, title) => {
  const targetSdate = new Date(target.task_start);
  const targetEdate = new Date(target.task_end);
  const upperSdate = new Date(uSdate);
  const upperEdate = new Date(uEdate);

  // 종료 날짜와 시작 날짜 유효성 검사
  if (targetSdate > targetEdate)
    return { isSuc: false, msg: "시작일은 종료일 보다 이전이어야 해요!" };

  // 타겟 시작일, 상위 시작일 비교
  if (upperSdate > targetSdate)
    return {
      isSuc: false,
      msg: `${title} \r\n시작일(${dateFormat(uSdate)}) 보다 이전 일 수 없어요`,
    };

  // 타겟 종료일, 상위 종료일 비교
  if (targetEdate > upperEdate)
    return {
      isSuc: false,
      msg: `${title} \r\n종료일(${dateFormat(uEdate)}) 보다 이후 일 수 없어요`,
    };

  return { isSuc: true };
};

const dateFormat = (stDate) => {
  const date = new Date(stDate);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let hour = date.getHours();
  let minute = date.getMinutes();

  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  hour = hour >= 10 ? hour : "0" + hour;
  minute = minute >= 10 ? minute : "0" + minute;

  return (
    date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute
  );
};
