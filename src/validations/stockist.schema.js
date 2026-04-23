import * as yup from "yup";

export const stockistSchema = yup.object({
    // Foreign Key to Manufacturer
    manufacturerId: yup
        .number()
        .typeError("Manufacturer must be selected")
        .required("Manufacturer is required"),

    name: yup
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .required("Stockist name is required"),

    gstNumber: yup
        .string()
        .matches(
            /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
            "Invalid GST format"
        )
        .required("GST number is required"),

    address: yup
        .string()
        .min(10, "Please provide a full address")
        .required("Address is required"),

    // Foreign Key to State table
    stateId: yup
        .number()
        .typeError("State must be selected")
        .required("State is required"),

    phone: yup
        .string()
        .matches(/^[6-9]\d{9}$/, "Invalid phone number (10 digits expected)")
        .required("Phone number is required"),

    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),

    // Optional: If you want to track who created this entry in the system
    createdBy: yup.number().optional(),
});