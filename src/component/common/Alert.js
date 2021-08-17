import React, { useEffect, useState } from "react";
import {
  Modal,
  Flex,
  Button,
  Box,
  Text,
  FixedZIndex,
  CompositeZIndex,
  Layer,
} from "gestalt";

import { ALERT_TITLE } from "../../config/constants/commonConts";

function Alert(props) {
  const { contents, onDismiss } = props;
  const HEADER_ZINDEX = new FixedZIndex(10);
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

  const [title, setTitle] = useState(props.title);

  useEffect(() => {
    if (!title) setTitle(ALERT_TITLE);
    return () => {
      onDismiss();
    };
  }, []);

  return (
    <Layer zIndex={zIndex}>
      <Modal
        accessibilityModalLabel="confirm alert"
        heading={title}
        onDismiss={onDismiss}
        footer={
          <Flex justifyContent="end" gap={2}>
            <Button color="red" text="확인" onClick={onDismiss} />
          </Flex>
        }
        size="sm"
      >
        <Box padding={8}>
          <Text align="center" size="lg">
            {contents}
          </Text>
        </Box>
      </Modal>
    </Layer>
  );
}

export default Alert;
