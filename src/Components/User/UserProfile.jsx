import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import MainComponent from "../MainComponent/MainComponent";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { formatDate } from "../../utils/formatDate";

function UserProfile() {
  const { user, setUser } = useAuth();
  const [file, setFile] = useState({ value: "", files: null });
  const [fileUploadLoading, setFileUploadLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const MAX_FILE_SIZE = 262144; // 250 KB

  const checkFileSize = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      alert("Select file less than 250 KB");
      setFile({ value: "", files: null });
      return false;
    }
    return true;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && checkFileSize(file)) {
      setFile({
        value: event.target.value,
        files: file,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFileUploadLoading(true);
    setIsDisabled(true);
    if (!file.files) {
      setFileUploadLoading(false);
      setIsDisabled(false);
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("userProfile", file.files);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_ZOOM_CAR_CLONE_BASE_API_URL}/${
          import.meta.env.VITE_USER_BASE_URL
        }/upload`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("authToken")
            )}`,
          },
        }
      );

      if (response.ok) {
        const userAvatarLink = await response.json();
        setUser({ ...user, userAvatarLink: userAvatarLink.link });
        try {
          await fetch(
            `${import.meta.env.VITE_ZOOM_CAR_CLONE_BASE_API_URL}/${
              import.meta.env.VITE_USER_BASE_URL
            }/update`,
            {
              method: "PUT",
              body: JSON.stringify({ userAvatarLink: userAvatarLink.link }),
              headers: {
                Authorization: `Bearer ${JSON.parse(
                  localStorage.getItem("authToken")
                )}`,
                "Content-Type": "application/json",
              },
            }
          );
        } catch (error) {
          console.error("Error while updateding user Details", error);
        }
        setFile({ ...file, ["value"]: "" });
        setFileUploadLoading(false);
        setIsDisabled(false);
      } else {
        setFileUploadLoading(false);
        setIsDisabled(false);
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("Error occurred while uploading file:", error);
    }
  };

  return (
    <MainComponent>
      <Navbar />
      <div className="flex justify-center my-10 flex-col items-center">
        <div className="flex items-center gap-6 flex-col p-4 rounded-lg artboard phone-1 bg-base-100">
          <div>
            <div className="avatar">
              <div className="w-56 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {user?.userAvatarLink ? (
                  <img src={user.userAvatarLink} />
                ) : (
                  <img src="src\assets\headshort.jpeg" />
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
              Joined on : {formatDate(user.createdAt)}
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
                onChange={handleFileChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={isDisabled}
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
      <Footer />
    </MainComponent>
  );
}

export default UserProfile;
