import { FileInput } from "@mantine/core";
import { IconUpload } from "@tabler/icons";
import { useState } from "react";

const UploadFile = (props) => {
  const [file, setFile] = useState(props.file);

  const handleUpload = (value) => {
    return;
  };
  return (
    <FileInput
      size="md"
      value={file}
      onChange={setFile}
      mt="md"
      radius="md"
      label="Image"
      placeholder="Upload File"
      icon={<IconUpload size={14} />}
    />
  );
};

export default UploadFile;
