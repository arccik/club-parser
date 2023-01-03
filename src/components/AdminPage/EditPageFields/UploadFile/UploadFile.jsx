import {
  FileInput,
  Image,
  BackgroundImage,
  Center,
  Text,
  Button,
  ActionIcon,
} from "@mantine/core";
import { IconUpload, IconSettings, IconTrashX } from "@tabler/icons";
import { useState } from "react";

const UploadFile = (props) => {
  const [file, setFile] = useState(props.fileUrl);

  const handleUpload = async (value) => {
    const url = await fetch("/api/admin/upload").then((res) => res.json());
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: value,
    });
    const imageUrl = url.split("?")[0];
    props.setValue("image", imageUrl);
    setFile(imageUrl);
  };

  const handleDelete = async () => {
    console.log("Delete Clicked!");
    setFile("");
  };
  return (
    <>
      {file ? (
        <div style={{ position: "relative" }}>
          <Image
            mt="lg"
            radius="lg"
            height={300}
            src={file}
            alt="With default placeholder"
            withPlaceholder
          />
          <ActionIcon
            style={{ position: "absolute", top: 10, right: 10 }}
            variant="subtle"
            onClick={handleDelete}
          >
            <IconTrashX color="red" size={30} />
          </ActionIcon>
        </div>
      ) : (
        <FileInput
          clearButtonLabel
          size="md"
          // value={file}
          onChange={handleUpload}
          // defaultValue={file}
          mt="lg"
          radius="md"
          label="Image"
          placeholder="Upload File"
          icon={<IconUpload size={14} />}
        />
      )}
    </>
  );
};

export default UploadFile;
