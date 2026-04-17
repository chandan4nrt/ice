import * as yup from "yup";

export const itemSchema = yup.object({
    product: yup.string().required("Please select a product"),
    qty: yup
        .number()
        .typeError("Quantity must be a number")
        .integer("Quantity must be an integer")
        .positive("Must be greater than 0")
        .required("Quantity is required"),
    priority: yup.string().required("Please select a priority"),
});
