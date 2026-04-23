import * as yup from "yup";

export const salesPersonSchema = yup.object({
    stockistId: yup.number().required("Stockist is required"),
    distributorId: yup.number().required("Distributor is required"),
    name: yup.string().min(3).required("Name is required"),
    phone: yup.string().matches(/^[6-9]\d{9}$/, "Invalid phone").required(),
    email: yup.string().email("Invalid email").required(),
    joiningDate: yup.string().required("Joining date is required"),
    targetAmount: yup.number().typeError("Must be a number").min(0).required(),
    isActive: yup.boolean().default(true),
});