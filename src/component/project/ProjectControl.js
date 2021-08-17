import React, { useState } from "react";
import { TapArea, Text, Box, Icon } from "gestalt";
import Confirm from "../../component/common/Confirm";
import {
  DELETE_TITLE,
  DELETE_CONTENTS,
} from "../../config/constants/commonConts";
import ProjectSheet from "../../pages/project/ProjectSheet";

function ProjectControl(props) {
  const [isProjectFormModal, setIsProjectFormModal] = useState(false);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

  const onClick = async () => {
    // await axios({
    //   method: "DELETE",
    //   url: "/project/delete/" + project.prj_idx,
    // }).then((res) => {
    //   alert(res.data.message);
    // });
    console.log("EJFJEFJELFJWE");
  };

  return (
    <>
      {isProjectFormModal ? (
        <ProjectSheet onDismiss={() => setIsProjectFormModal(false)} mode={"Modify"} />
      ) : (
        <></>
      )}
      {isDeleteConfirm ? (
        <Confirm
          onDismiss={() => setIsDeleteConfirm(false)}
          title={DELETE_TITLE}
          contents={DELETE_CONTENTS}
          onClick={onClick}
        />
      ) : (
        <></>
      )}
      <>
        <Box padding={2} column={12} direction="column">
          <TapArea rounding={4} onTap={() => setIsProjectFormModal(true)}>
            <Box alignItems="center" padding={3}>
              <Icon icon="edit" accessibilityLabel="edit" color="darkGray" />
              <Text>Edit</Text>
            </Box>
          </TapArea>
        </Box>
        <Box padding={2} column={12}>
          <TapArea rounding={4} onTap={() => setIsDeleteConfirm(true)}>
            <Box alignItems="center" padding={3}>
              <Icon
                icon="cancel"
                accessibilityLabel="cancel"
                color="darkGray"
              />
              <Text>delete</Text>
            </Box>
          </TapArea>
        </Box>
      </>
    </>
  );
}

export default ProjectControl;
