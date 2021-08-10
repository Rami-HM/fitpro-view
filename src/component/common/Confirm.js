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
  const { title, contents, onDismiss } = props;
  const HEADER_ZINDEX = new FixedZIndex(10);
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

  useEffect(()=>{

    return(()=>{
      onDismiss();
    });

  },[])

  return (
    <Layer zIndex={zIndex}>
      <Modal
        accessibilityModalLabel="confirm alert"
        heading={title}
        onDismiss={() => {
          onDismiss(false);
        }}
        footer={
          <Flex justifyContent="end" gap={2}>
            <Button
              color="gray"
              text="취소"
              onClick={() => {
                onDismiss(false);
              }}
            />
            <Button color="red" text="확인" />
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

export default Confirm;
