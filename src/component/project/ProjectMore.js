import React, { useState } from "react";
import {
  Text,
  Box,
  Icon,
  TapArea,
  Popover,
  Tooltip,
  IconButton,
} from "gestalt";
import MemberList from "../member/MemberList";
import ProjectControl from "./ProjectControl";

function ProjectMoreBtn(props) {
  const { open, setOpen, setIsModal, setIsDeleteConfirm, projectId } = props;
  const anchorRef = React.useRef(null);
  const [isMemberList, setIsMemberList] = useState(false);

  const onDismiss = () => {
    setOpen(false);
    setIsModal(false);
    setIsDeleteConfirm(false);
    setIsMemberList(false);
  };
  return (
    <>
      <Tooltip idealDirection="up" text="Board options">
        <IconButton
          accessibilityControls="page-header-example"
          accessibilityHaspopup
          accessibilityExpanded={open}
          accessibilityLabel="Board options"
          icon="ellipsis"
          iconColor="darkGray"
          selected={open}
          onClick={() => setOpen((prevVal) => !prevVal)}
          ref={anchorRef}
          size="lg"
        />
      </Tooltip>
      {open ? (
        <Popover
          anchor={anchorRef.current}
          id="example-a11y"
          idealDirection="left"
          onDismiss={() => onDismiss(false)}
          size="flexible"
          role="menu"
        >
          {isMemberList ? (
            <Box width={330}>
              <MemberList projectId = {projectId} setIsMemberList={setIsMemberList} checkedMember/>
            </Box>
          ) : (
            <ProjectControl
              setIsMemberList={setIsMemberList}
              setIsModal={setIsModal}
              setIsDeleteConfirm={setIsDeleteConfirm}
            />
          )}
        </Popover>
      ) : (
        ""
      )}
    </>
  );
}

export default ProjectMoreBtn;
