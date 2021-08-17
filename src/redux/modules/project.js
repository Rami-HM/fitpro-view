const SET_PROJECT = "SET_PROJECT";
const SET_PROJECTLIST = "SET_PROJECTLIST";
const ADD_PROJECTLIST = "ADD_PROJECTLIST";
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

export default reducer;
export const actionCreators = {
  setProject,
  setProjectList,
  addProjectList,
  modifyProjectList,
};
