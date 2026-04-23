import * as yup from "yup";

export const distributorSchema = yup.object({
    stockistId: yup.number().required("Please select a Stockist"),
    name: yup.string().min(3, "Name is too short").required("Name is required"),
    gstNumber: yup.string().required("GST is required"),
    address: yup.string().required("Address is required"),
    phone: yup.string().matches(/^[6-9]\d{9}$/, "Invalid phone").required(),
    email: yup.string().email("Invalid email").required(),
    stateId: yup.number().required("State is required"),
});