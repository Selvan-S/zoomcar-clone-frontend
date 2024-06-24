const IMGUR_CLIENT_ID = import.meta.env.VITE_IMGUR_CLIENT_ID; // Client ID
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // in milliseconds

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const uploadImageToImgur = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
          Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
        },
        body: formData,
      });

      return response;
    } catch (error) {
      if (attempt < MAX_RETRIES) {
        console.warn(
          `Attempt ${attempt} failed: ${error.message}. Retrying in ${
            RETRY_DELAY / 1000
          } seconds...`
        );
        await sleep(RETRY_DELAY);
      } else {
        console.error("All attempts to upload the image failed.");
        return null;
      }
    }
  }
};

const MAX_FILE_SIZE = 1048576; // 1 MB

// checks the size of the uploading file
const checkFileSize = (uploadFile, setFile) => {
  if (uploadFile.size > MAX_FILE_SIZE) {
    alert("Select file less than 1 MB");
    setFile({ value: "", files: null });
    return false;
  }
  return true;
};

// handle file selection
export const handleFileChange = (event, setFile) => {
  const uploadFile = event.target.files[0];
  if (uploadFile && checkFileSize(uploadFile, setFile)) {
    setFile({
      value: event.target.value,
      files: uploadFile,
    });
  }
};
