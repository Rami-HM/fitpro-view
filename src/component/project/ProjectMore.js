import React, { useState } from "react";
import { Popover, Tooltip, IconButton } from "gestalt";
import ProjectControl from "./ProjectControl";

function ProjectMoreBtn(props) {
  const { open, setOpen } = props;
  const anchorRef = React.useRef(null);

  const onDismiss = () => {
    setOpen(false);
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
          <ProjectControl />
        </Popover>
      ) : (
        ""
      )}
    </>
  );
}

export default ProjectMoreBtn;
