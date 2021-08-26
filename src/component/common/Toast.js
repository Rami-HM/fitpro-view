import React, { useEffect } from "react";
import {
  Box,
  Layer,
  Toast as GToast,
  Icon,
  Text,
  FixedZIndex,
  CompositeZIndex,
  Flex
} from "gestalt";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as ToastAction } from "../../redux/modules/toast";

function Toast() {
  /* ======= Z-INDEX  ======= */
  const PAGE_HEADER_ZINDEX = new FixedZIndex(99);
  const SHEET_ZINDEX = new CompositeZIndex([PAGE_HEADER_ZINDEX]);

  const isShow = useSelector((state) => state.toast.isShow);
  const msg = useSelector((state) => state.toast.msg);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (isShow) dispatch(ToastAction.closeToast());
    }, 1500);
  }, [isShow]);

  return (
    <Box>
      <Layer zIndex={SHEET_ZINDEX}>
        <Box
          fit
          dangerouslySetInlineStyle={{
            __style: {
              bottom: 100,
              left: "50%",
              transform: "translateX(-50%)",
            },
          }}
          paddingX={1}
          position="fixed"
        >
          {isShow && (
            <GToast
              text={
                <Flex gap={1}>
                  <Box width={50}>
                    <Icon
                      size = {24}
                      icon="alert"
                      accessibilityLabel="alert"
                      color="blue"
                    />
                  </Box>
                  <Box>
                    <Text>{msg}</Text>
                  </Box>
                </Flex>
              }
            />
          )}
        </Box>
      </Layer>
    </Box>
  );
}

export default Toast;
