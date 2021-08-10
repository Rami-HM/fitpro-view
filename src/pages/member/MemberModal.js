import React from "react";
import {
  Box,
  Layer,
  Modal,
  FixedZIndex,
  CompositeZIndex,
} from "gestalt";
import MemberForm from "../../component/member/MemberForm";
import MemberView from "../../component/member/MemberView";

function MemberModal(props) {
  const HEADER_ZINDEX = new FixedZIndex(10);
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

  const { idx, onDismiss, mode } = props;

  return (
    <Layer zIndex={zIndex}>
      <Modal
        accessibilityModalLabel="Delete board 60s Furniture"
        onDismiss={onDismiss}
        size="sm"
      >
        <Box padding={8}>
          {
            {
              View : <MemberView onDismiss={onDismiss} idx = {idx}/>,
              Modify: <MemberForm onDismiss = {onDismiss} mode={mode} idx = {idx}/>,
            }[mode]
          }
        </Box>
      </Modal>
    </Layer>
  );
}

export default MemberModal;
