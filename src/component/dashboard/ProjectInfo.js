import { React, useEffect, useState } from "react";
import { Typeahead } from "gestalt";

function ProjectInfo(props) {

const {project, setProject} = props;
  const [selected, setSelected] = useState(null);
  const [projectList, setProjectList] = useState([
    { value: "0", label: "No data" },
  ]);

  let defaultOption = projectList[0];

  useEffect(() => {
    projectListAPI();
  }, []);

  const projectListAPI = () => {
    const { setProject } = props;
    console.log(props.project)
    setTimeout(() => {
      setProjectList(
        Array.from(Array(5).keys()).map((item) => ({
          value: String(item + 1),
          label: "task-" + (item + 1),
        }))
      );

      setDefaultOption({ value: "1", label: "task-2" });
      projectDetailAPI(1);
    }, 2000);
  };

  const setDefaultOption = (item) => {
    defaultOption = item;
  };

  const handleSelect = ({ item }) => {
    const { setProjectId } = props;
    setSelected(item);
    projectDetailAPI(item.value);
  };

  const projectDetailAPI = (id) =>{

    const newProject = {
        ...project
        ,id
    }
    setProject(newProject);
  }

  
  return (
    <>
      <Typeahead
        label="Typeahead Example 2"
        id="Typeahead-example-defaultItem"
        noResultText="No Results"
        options={projectList}
        value={defaultOption.value}
        placeholder="Select a Label"
        onSelect={handleSelect}
      />
    </>
  );
}

export default ProjectInfo;
