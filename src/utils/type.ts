export interface FormData {
  id: number;
  profilePhoto: string;
  firstName: string;
  lastName: string;
  dob: string;
  occupation: string;
  gender: string;
  contact: {
    id: number;
    email: string;
    phoneNumber: string;
    fax?: string;
    linkedInUrl?: string;
  };
  address: {
    id: number;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  academic: {
    id: number;
    pastSchools: string[] | "";
  };
}
