import { useSnackbar } from "notistack";
import React, { useState } from "react";
import HeadshortPlaceholder from "../assets/headshort.jpeg";
import BackToGivenLocation from "../Components/Common/BackToGivenLocation";
import Footer from "../Components/Common/Footer";
import FullScreenLoading from "../Components/Common/FullScreenLoading";
import Navbar from "../Components/Common/Navbar";
import MainComponent from "../Components/MainComponent/MainComponent";
import { useAuth } from "../Components/context/AuthContext";
import { updateUserAPI } from "../Components/services/userService";
import { formatDate } from "../utils/formatDate";
import {
  handleFileChange,
  uploadImageToImgur,
} from "../utils/uploadImageToImgur";

function UserProfile() {
  const { user, setUser } = useAuth();
  const [file, setFile] = useState({ value: "", files: null });
  const [fileUploadLoading, setFileUploadLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // handle the upload image to imgur
  const handleImageUpload = async (event) => {
    event.preventDefault();
    setFileUploadLoading(true);

    if (!file.files) {
      setFileUploadLoading(false);
      console.error("No file selected");
      enqueueSnackbar("No file selected", { variant: "error" });
      return;
    }

    try {
      // get the response from imgur
      const response = await uploadImageToImgur(file.files); // upload the image and return the response

      // Handling success
      if (response.ok) {
        const userAvatarLink = await response.json();
        if (userAvatarLink.data.link != undefined) {
          setUser({ ...user, userAvatarLink: userAvatarLink.data.link });
          try {
            // update the user with userAvatarLink
            await updateUserAPI(userAvatarLink.data.link); // updating user with profile picture
            enqueueSnackbar("User avatar updated successfully", {
              variant: "success",
            });
          } catch (error) {
            console.error("Error while updating user Details", error);
            enqueueSnackbar("Error while updating user Details", {
              variant: "error",
            });
          }
        }
        setFile({
          value: "",
          files: null,
        });
        setFileUploadLoading(false);
      } else {
        // Handle failure
        const errorData = await response.json();
        setFileUploadLoading(false);
        console.error("File upload failed");
        enqueueSnackbar(errorData.data.error, { variant: "error" });
      }
    } catch (error) {
      console.error("Error occurred while uploading file:", error);
    }
  };

  return (
    <MainComponent>
      <Navbar />
      <BackToGivenLocation location={"/"} />

      <div className="flex justify-center my-10 flex-col items-center">
        <div className="flex items-center gap-6 flex-col p-4 rounded-lg artboard phone-1 bg-base-100">
          <div>
            <div className="avatar">
              <div className="w-56 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {user?.userAvatarLink ? (
                  <img alt="User avatar" src={user.userAvatarLink} />
                ) : (
                  <img alt="placeholder" src={HeadshortPlaceholder} />
                )}
              </div>
            </div>
          </div>
          <div className="mt-5">
            <p className="font-sans text-2xl font-bold leading-loose">
              {user.name}
            </p>
            <p className="font-sans text-xl leading-loose">{user.email}</p>
            <p className="ordinal text-md leading-loose">
              Joined on : {formatDate(new Date(user.createdAt))}
            </p>
          </div>
          <form id="uploadForm" className="flex flex-col justify-center">
            <div className="file mb-4">
              <input
                className="file-input"
                type="file"
                value={file.value}
                name="userProfile"
                accept="image/png, image/jpeg"
                onChange={(event) => handleFileChange(event, setFile)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleImageUpload}
              disabled={fileUploadLoading}
            >
              {fileUploadLoading ? (
                <div className="flex gap-4 items-center text-primary">
                  <span className="loading loading-spinner"></span>
                  Uploading
                </div>
              ) : (
                <div>Upload image</div>
              )}
            </button>
          </form>
        </div>
        <button className="text-secondary min-w-full min-h-max">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline-block mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Avoid uploading sensitive or personal photos unless you intend for
            them to be shared on Imgur.
          </span>
        </button>
      </div>
      {fileUploadLoading && <FullScreenLoading />}
      <Footer />
    </MainComponent>
  );
}

export default UserProfile;
