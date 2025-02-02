/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { validationSchema } from "../utils/formValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormData } from "../utils/type";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, addUser, setData } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const { control, handleSubmit, setValue } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      academic: {
        pastSchools: [""],
      },
    },
  });
  const [step, setStep] = useState(1);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "academic.pastSchools",
  });

  const dispatch = useDispatch();
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();

  const { userData } = useSelector((state: any) => state.users);

  const onSubmit = (data: any) => {
    const isUpdate = data.id !== null;

    console.log(data.id);

    setStatus("loading");

    const submitData = isUpdate
      ? updateUser({ id: data.id, ...data })
      : addUser(data);

    dispatch(submitData as any)
      .then((data: any) => {
        if (data.meta.requestStatus === "fulfilled") {
          setStatus("succeeded");
          dispatch(setData(data.payload));
          navigate("/resume");
        }
      })
      .catch((error: any) => {
        console.log(error);
        setStatus("failed");
      });
  };

  useEffect(() => {
    if (status === "succeeded") {
      alert("User added successfully");
    }
    if (userData && status === "succeeded") {
      alert("User updated successfully");
    }

    if (status === "failed") {
      alert("Error occurred");
    }
  }, [status]);

  useEffect(() => {
    if (
      userData ||
      Object.keys(userData).length !== 0 ||
      userData !== undefined
    ) {
      setValue("id", userData.id);
      setValue("profilePhoto", userData.profilePhoto);
      setValue("firstName", userData.firstName);
      setValue("lastName", userData.lastName);
      setValue("dob", userData.dob || "");
      setValue("occupation", userData.occupation || "");
      setValue("gender", userData.gender || "");

      setValue("contact.id", userData.contact?.id || "");
      setValue("contact.email", userData.contact?.email || "");
      setValue("contact.phoneNumber", userData.contact?.phoneNumber || "");
      setValue("contact.fax", userData.contact?.fax || "");
      setValue("contact.linkedInUrl", userData.contact?.linkedInUrl || "");

      setValue("address.id", userData.address?.id || "");
      setValue("address.address", userData.address?.address || "");
      setValue("address.city", userData.address?.city || "");
      setValue("address.state", userData.address?.state || "");
      setValue("address.country", userData.address?.country || "");
      setValue("address.zipCode", userData.address?.zipCode || "");

      // Populate past schools if available
      if (userData.academic?.pastSchools?.length > 0) {
        setValue("academic.id", userData.academic.id);
        setValue("academic.pastSchools", userData.academic.pastSchools);
      }
    }
  }, [userData]);
  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-90">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {step === 1 && (
            <>
              <Controller
                name="profilePhoto"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    placeholder="Profile Picture"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          field.onChange(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                )}
              />
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="First Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Last Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    placeholder="Date of Birth"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
              <Controller
                name="occupation"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Occupation"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                )}
              />
            </>
          )}

          {step === 2 && (
            <>
              <Controller
                name="contact.email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
              <Controller
                name="contact.phoneNumber"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Phone Number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
              <Controller
                name="contact.fax"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Fax (Optional)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
              <Controller
                name="contact.linkedInUrl"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="LinkedIn Url (Optional)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
            </>
          )}
          {step === 3 && (
            <>
              <Controller
                name="address.address"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Home Address"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
              <Controller
                name="address.city"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="City"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
              <Controller
                name="address.state"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="State"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
              <Controller
                name="address.country"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Country"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
              <Controller
                name="address.zipCode"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="ZipCode"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
            </>
          )}

          {step === 4 && (
            <>
              {fields.map((item, index) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <Controller
                    name={`academic.pastSchools.${index}`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="School"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)} // Remove the school entry
                    className="text-red-500"
                  >
                    <FaMinus />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => append("")} // Add an empty string to the list
                className="flex items-center space-x-2 bg-blue-500 text-white p-3 rounded-lg cursor-pointer"
              >
                <FaPlus />
                <span>Add School</span>
              </button>
            </>
          )}

          <div className="flex justify-between space-x-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="p-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
              >
                Back
              </button>
            )}
            {step < 4 && (
              <div className="flex justify-end w-full">
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
            {step === 4 && (
              <button
                type="submit"
                className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserPage;
