import * as yup from "yup";

export const productsDetailsSchema = yup.object({
    id: yup.number().optional(),
    productName: yup.string().required("Product name is required"),
    productCode: yup.string().required("Product code is required"),
    amount: yup
        .number()
        .typeError("Amount must be a number")
        .min(0, "Amount cannot be negative")
        .required("Amount is required"),
});
