import { FieldArray, FormikProvider, useFormik } from "formik";
import { useSnackbar } from "notistack";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import vehicleFallBack from "../../assets/placeholder.jpeg";
import { createVehicleSchema } from "../../schema/schema";
import {
  handleFileChange,
  uploadImageToImgur,
} from "../../utils/uploadImageToImgur";
import FullScreenLoading from "../Common/FullScreenLoading";
import ImageWithFallback from "../Common/ImageWithFallback";
import { VehicleContext } from "../context/VehicleContext";
import { updateVehicleAPI } from "../services/vehicleService";

function PostVehicleForm({
  vehicleEditDetails,
  isEditing,
  currentSearchQuery,
}) {
  const { isLoading, setIsLoading, createVehicle } = useContext(VehicleContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigateTo = useNavigate();

  const [file, setFile] = useState({ value: "", files: null });
  const [fileUploadLoading, setFileUploadLoading] = useState(false);

  const updateVehicle = async (vehicleDetails, vehicleId) => {
    try {
      setIsLoading(true);
      const data = await updateVehicleAPI(vehicleDetails, vehicleId);
      if (data.error) {
        enqueueSnackbar(data.error, { variant: "error" });
        return;
      }
      enqueueSnackbar("Vehicle successfully updated", { variant: "success" });
      navigateTo(`/admin?vehicleName=${currentSearchQuery}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: vehicleEditDetails?.name || "",
      hostCarImage: vehicleEditDetails?.hostCarImage || [],
      carType: vehicleEditDetails?.carType || "",
      fuelType: vehicleEditDetails?.fuelType || "",
      transmission: vehicleEditDetails?.transmission || "",
      seats: vehicleEditDetails?.seats || "",
      pricePerHour: vehicleEditDetails?.pricePerHour || "",
      availability: vehicleEditDetails?.availability || true,
    },
    validationSchema: createVehicleSchema,
    onSubmit: (vehicleDetails, { resetForm }) => {
      if (isEditing) {
        // Update a Vehicle (Admin)
        updateVehicle(vehicleDetails, vehicleEditDetails._id);
      } else {
        // Create a Vehicle (Admin)
        createVehicle(vehicleDetails);
      }
      resetForm({
        values: {
          hostCarImage: [],
          name: "",
          carType: "",
          fuelType: "",
          transmission: "",
          seats: "",
          pricePerHour: "",
        },
      });
    },
  });

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    formik;

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
        const uploadedData = await response.json();
        values.hostCarImage.push(uploadedData.data.link);
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
        enqueueSnackbar(`File upload failed: ${errorData.data.error}`, {
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Error occurred while uploading file:", error);
    }
  };

  return (
    <>
      <h1 className="text-3xl text-center mb-4">
        {isEditing ? "Edit " : "Host "}Vehicle
      </h1>
      <FormikProvider value={formik}>
        <form className="" onSubmit={handleSubmit}>
          <div className=" flex flex-col mb-5 gap-2">
            <div className="hostcar-label">Host Car Image</div>

            {/* Display uploaded images */}
            <div className="">
              <FieldArray
                name="hostCarImage"
                render={(arrayHelpers) => (
                  <div className="min-h-24 p-1 max-w-full border border-slate-600 rounded-md">
                    {!values.hostCarImage?.length ? (
                      <div className="grid place-content-center">
                        <span className="ml-2 mt-2">Add image</span>
                      </div>
                    ) : (
                      <div className="display-uploaded-image">
                        <div className="flex flex-row flex-wrap gap-1 justify-start max-sm:justify-center">
                          {values.hostCarImage.map((imgelink, index) => (
                            <div key={index}>
                              <ImageWithFallback
                                postImg={true}
                                src={imgelink}
                                fallback={vehicleFallBack}
                                alt={`new-vehicle-image`}
                                className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center relative"
                                index={index}
                                removeImage={(index) =>
                                  arrayHelpers.remove(index)
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          {/* upload vehicle image */}
          {values.hostCarImage?.length < 5 && (
            <div id="uploadForm" className="flex flex-col justify-center mb-5">
              {/* file input */}
              <div className="file mb-4">
                <input
                  className="file-input file-input-bordered"
                  type="file"
                  value={file.value}
                  name="userProfile"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(event) => handleFileChange(event, setFile)}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary md:max-w-sm"
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
            </div>
          )}
          {/* Error message for host car image */}
          {touched.hostCarImage && errors.hostCarImage && (
            <p className="text-center text-red-600 mt-3">
              {errors.hostCarImage}
            </p>
          )}
          {/* Vehicle name */}
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="input input-bordered w-full"
              placeholder="Rolls-Royce"
              required
            />
            {touched.name && errors.name && (
              <p className="text-center text-red-600 mt-3">{errors.name}</p>
            )}
          </div>
          {/* Vehicle type */}
          <div className="mb-5">
            <label
              htmlFor="carType"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Car Type
            </label>
            <select
              className="select select-bordered w-full"
              id="carType"
              name="carType"
              value={values.carType}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value={""} disabled selected>
                Select car type
              </option>
              <option value={"Hatchback"}>Hatchback</option>
              <option value={"Sedan"}>Sedan</option>
              <option value={"SUV"}>SUV</option>
            </select>
            {touched.carType && errors.carType && (
              <p className="text-center text-red-600 mt-3">{errors.carType}</p>
            )}
          </div>
          {/* Vehicle fuel type */}
          <div className="mb-5">
            <label
              htmlFor="fuelType"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Fuel Type
            </label>
            <select
              className="select select-bordered w-full"
              id="fuelType"
              name="fuelType"
              value={values.fuelType}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value={""} disabled selected>
                Select Fuel Type
              </option>
              <option value={"Petrol"}>Petrol</option>
              <option value={"Diesel"}>Diesel</option>
              <option value={"Electric"}>Electric</option>
            </select>
            {touched.fuelType && errors.fuelType && (
              <p className="text-center text-red-600 mt-3">{errors.fuelType}</p>
            )}
          </div>
          {/* Vehicle Transmission */}
          <div className="mb-5">
            <label
              htmlFor="transmission"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Transmission
            </label>
            <select
              className="select select-bordered w-full"
              id="transmission"
              name="transmission"
              value={values.transmission}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value={""} disabled selected>
                Select Transmission
              </option>
              <option value={"Manual"}>Manual</option>
              <option value={"Automatic"}>Automatic</option>
            </select>
            {touched.transmission && errors.transmission && (
              <p className="text-center text-red-600 mt-3">
                {errors.transmission}
              </p>
            )}
          </div>
          {/* Vehicle No. of seats */}
          <div className="mb-5">
            <label
              htmlFor="seats"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Seats
            </label>
            <select
              className="select select-bordered w-full"
              id="seats"
              name="seats"
              value={values.seats}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value={""} disabled selected>
                Select seats
              </option>
              <option value={"5"}>5 seats</option>
              <option value={"7"}>7 seats</option>
            </select>
            {touched.seats && errors.seats && (
              <p className="text-center text-red-600 mt-3">{errors.seats}</p>
            )}
          </div>
          {isEditing && (
            <div className="mb-5">
              <label
                htmlFor="availability"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Availability
              </label>
              <select
                className="select select-bordered w-full"
                id="availability"
                name="availability"
                value={values.availability}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value={""} disabled selected>
                  Select availability
                </option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          )}
          {/* Vehicle Price per hour rate */}
          <div className="mb-7">
            <label
              htmlFor="pricePerHour"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price Per Hour
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              id="pricePerHour"
              name="pricePerHour"
              value={values.pricePerHour}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {touched.pricePerHour && errors.pricePerHour && (
            <p className="text-center text-red-600 mt-3">
              {errors.pricePerHour}
            </p>
          )}
          {/* Post Vehicle details */}
          <div className="mx-auto max-w-full grid place-items-center mb-10">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full md:max-w-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-blue-500 disabled:cursor-no-drop disabled:hover:bg-blue-500"
              disabled={isLoading}
            >
              {isEditing ? "Update " : "Host "}Vehicle
            </button>
          </div>
        </form>
      </FormikProvider>
      {/* Full screen loading either when uploading file or sumbiting */}
      {(isLoading || fileUploadLoading) && <FullScreenLoading />}
    </>
  );
}

export default PostVehicleForm;
