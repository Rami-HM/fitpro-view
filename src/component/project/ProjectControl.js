import React from 'react'
import { TapArea, Text, Box, Icon} from "gestalt";

function ProjectControl(props) {
    const {setIsModal, setIsDeleteConfirm} = props;
    return (
        <>
        <Box padding={2} column={12} direction="column">
        <TapArea rounding={4} onTap={() => setIsModal(true)}>
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
    )
}

export default ProjectControl
