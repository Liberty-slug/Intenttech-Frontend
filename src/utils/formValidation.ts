import * as yup from "yup";

export const validationSchema = yup.object().shape({
  profilePhoto: yup.mixed().required("Profile photo is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  dob: yup.string().required("Date of birth is required"),
  occupation: yup.string().required("Occupation is required"),
  gender: yup.string().required("Gender is required"),
  contact: yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: yup.string().required("Phone number is required"),
    fax: yup.string().notRequired(),
    linkedInUrl: yup.string().notRequired(),
  }),
  address: yup.object().shape({
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),
    zipCode: yup.string().required("Zip code is required"),
  }),
  academic: yup.object().shape({
    pastSchools: yup
      .array()
      .of(yup.string().required("School name is required"))
      .min(1),
  }),
});
