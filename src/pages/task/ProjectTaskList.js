import React from "react";
import { Icon, Checkbox } from "gestalt";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { makeStyles } from "@material-ui/core/styles";

const data = {
  id: "root",
  name: "Parent",
  children: [
    {
      id: "1",
      name: "Child - 1",
    },
    {
      id: "3",
      name: "Child - 3",
      children: [
        {
          id: "4",
          name: "Child - 4",
        },
      ],
    },
  ],
};

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    fontWeight: 400,
  },
});

function ProjectTaskList() {
  const classes = useStyles();

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={
        <>
          <Icon inline icon="pin" accessibilityLabel="Pin" color="darkGray" />
          <Checkbox
            id={nodes.name}
            label={nodes.name}
            name={nodes.name}
            onChange={({}) => {}}
            inline
          />
        </>
      }
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(data)}
    </TreeView>
  );
}

export default ProjectTaskList;
