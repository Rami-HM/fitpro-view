import React, { useEffect } from "react";
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

function Confirm(props) {
  const { title, contents, onDismiss, onClick, size, footer } = props;
  const HEADER_ZINDEX = new FixedZIndex(99);
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

  useEffect(() => {
  }, []);

  const attribute = () => {
    if (props.footer) {
      if (typeof props.footer !== 'boolean') return { footer: props.footer };
    } else {
      return {
        footer: (
          <Flex justifyContent="end" gap={2}>
            <Button color="gray" text="취소" onClick={onDismiss} />
            <Button color="red" text="확인" onClick={onClick} />
          </Flex>
        ),
      };
    }
  };
  return (
    <Layer zIndex={zIndex}>
      <Modal
        accessibilityModalLabel="confirm alert"
        heading={title}
        onDismiss={onDismiss}
        {...attribute()}
        size={size || "sm"}
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

export default Confirm;
