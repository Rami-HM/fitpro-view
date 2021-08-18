const SET_PROJECT = "SET_PROJECT";
const GET_PROJECT = "GET_PROJECT";
const MODIFY_BOOKMARK = "MODIFY_BOOKMARK";

const ADD_PROJECTLIST = "ADD_PROJECTLIST";
const SET_PROJECTLIST = "SET_PROJECTLIST";
const MODIFY_PROJECTLIST = "MODIFY_PROJECTLIST";

const initialState = {
  project: {},
  projectList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT:
      return applySetProject(state, action);
    case SET_PROJECTLIST:
      return applySetProjectList(state, action);
    case ADD_PROJECTLIST:
      return applyAddProjectList(state, action);
    case MODIFY_PROJECTLIST:
      return applyModifyProject(state, action);
    case GET_PROJECT:
      return applyGetProject(state, action);
    case MODIFY_BOOKMARK:
      return applyModifyBookmark(state, action);
    default:
      return state;
  }
};

const setProject = (project) => {
  return {
    type: SET_PROJECT,
    project,
  };
};

const applySetProject = (state, action) => {
  const { project } = action;
  return {
    ...state,
    project,
  };
};

const setProjectList = (projectList) => {
  return {
    type: SET_PROJECTLIST,
    projectList,
  };
};

const applySetProjectList = (state, action) => {
  const { projectList } = action;
  return {
    ...state,
    projectList,
  };
};

const addProjectList = (project) => {
  return {
    type: ADD_PROJECTLIST,
    project,
  };
};

const applyAddProjectList = (state, action) => {
  const { projectList } = state;
  const { project } = action;

  const nextProjectList = [...projectList, project];

  return {
    ...state,
    projectList: nextProjectList,
  };
};

const modifyProjectList = (project) => {
  return {
    type: MODIFY_PROJECTLIST,
    project,
  };
};

const applyModifyProject = (state, action) => {
  const { projectList } = state;
  const { project } = action;

  const nextProjectList = projectList.map((prev) =>
    prev.prj_idx === project.prj_idx ? project : prev
  );

  return {
    ...state,
    projectList: nextProjectList,
  };
};

const modifyBookmark = (prj_idx,bookmark) => {
  return {
    type: MODIFY_BOOKMARK,
    prj_idx,
    bookmark
  };
};

const applyModifyBookmark = (state, action) => {
  const { projectList } = state;
  const { prj_idx,bookmark } = action;

  let targetProject = projectList.find((element, index, array) => element.prj_idx === prj_idx);
  targetProject = {...targetProject, bookmark}

  const nextProjectList = projectList.map((prev) =>
    prev.prj_idx === targetProject.prj_idx ? targetProject : prev
  );
  //bookmark 순으로 정렬
  nextProjectList.sort((obj1,obj2)=>{
    const obj1Value = obj1.bookmark ? 1 : 0;
    const obj2Value = obj2.bookmark ? 1 : 0;
    return obj2Value - obj1Value
  });

  return {
    ...state,
    projectList: nextProjectList,
  };
};

const getProject = (prj_idx) => {
  return {
    type: GET_PROJECT,
    prj_idx,
  };
};

const applyGetProject = (state, action) => {
  const { projectList } = state;
  const { prj_idx } = action;

  const targetProject = projectList.find((element, index, array) => element.prj_idx === prj_idx);

  return {
    ...state,
    project: targetProject,
  };
};

export default reducer;
export const actionCreators = {
  setProject,
  setProjectList,
  addProjectList,
  modifyProjectList,
  getProject,
  modifyBookmark
};
