import React, { useEffect, useState } from "react";
import { Box, Button, Heading, TextField } from "gestalt";
import TextEditor from "./TextEditor";

import ReactMarkdown from "react-markdown";

function ProjectForm(props) {
  const { mode } = props;
  const [contents, setContents] = useState("");

  useEffect(() => {
    console.log(contents);
  }, [contents]);

  return (
    <Box
      display="flex"
      marginStart={-3}
      marginEnd={-3}
      marginBottom={-3}
      marginTop={-3}
      wrap
      width="100%"
      direction="column"
    >
      <Box flex="grow" paddingX={3} paddingY={3}>
        <TextField
          label="프로젝트 명"
          id="title"
          onChange={() => {}}
          placeholder="프로젝트 명을 입력하세요"
        />
      </Box>

      <Box flex="grow" paddingX={3} paddingY={3}>
        <TextField
          label="프로젝트 서브명"
          id="subTitle"
          onChange={() => {}}
          placeholder="설명을 입력하세요"
        />
      </Box>

      <Box flex="grow" paddingX={3} paddingY={3}>
        <Box
          display="flex"
          wrap
          marginStart={-3}
          marginEnd={-3}
          marginBottom={-3}
          marginTop={-3}
        >
          <Box flex="grow" paddingX={3} paddingY={3}>
            <TextField
              label="시작일"
              id="startDate"
              type="date"
              onChange={() => {}}
              placeholder="Placeholder"
            />
          </Box>

          <Box flex="grow" paddingX={3} paddingY={3}>
            <TextField
              label="종료일"
              id="endDate"
              type="date"
              onChange={() => {}}
              placeholder="Placeholder"
            />
          </Box>
        </Box>
      </Box>

      <Box flex="grow" paddingX={3} paddingY={3} minHeight={500}>
        <TextEditor setContents={setContents} />
      </Box>

      <Box flex="grow" paddingX={3} paddingY={3}>
        <Box
          justifyContent="end"
          marginStart={-1}
          marginEnd={-1}
          marginTop={-1}
          marginBottom={-1}
          display="flex"
          wrap
        >
          <Box paddingX={1} paddingY={1}>
            <Button text="Cancel" size="lg" />
          </Box>
          <Box paddingX={1} paddingY={1}>
            <Button text="Submit" color="red" size="lg" type="submit" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProjectForm;
