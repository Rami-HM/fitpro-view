import { React, useEffect, useState } from "react";
import { Typeahead } from "gestalt";
import { useSelector } from "react-redux";

function ProjectSelectList(props) {

  const {handleSelect} = props;

  const projectList = useSelector(state=>state.project.projectList);
  const project = useSelector(state=>state.project.project);

  const [selectProjectList, setSelectProjectList] = useState([]);
  const [initValue, setInitValue] = useState({
     value : project.prj_idx || '',
     label : project.rj_title || ''
  });

  useEffect(()=>{
  },[]);

  useEffect(() => {
    formatProjectList();
    console.log(selectProjectList);
  }, [projectList]);

  const formatProjectList = async() =>{
    let formatList = [];
    projectList.map((item)=>{
      const newItem = {
        value : String(item.prj_idx),
        label : item.prj_title
      }
      formatList = [...formatList,newItem];
    });

    setSelectProjectList(formatList);
    if(formatList.length > 0)
      setInitValue(formatList[0]);
  }
  
  const onSelect = ({item}) => {
    handleSelect(item);
  };
  
  return (
    <>
      <Typeahead
        label="프로젝트 명"
        id="projectList"
        noResultText="No Results"
        options={selectProjectList}
        value={initValue.value}
        placeholder="프로젝트를 선택해 주세요"
        onSelect={onSelect}
      />
    </>
  );
}

export default ProjectSelectList;
