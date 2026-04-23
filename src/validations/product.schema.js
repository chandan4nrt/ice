import * as yup from "yup";

export const productSchema = yup.object({
    brandId: yup.number().required("Brand is required"),
    categoryId: yup.number().required("Category is required"),
    gstSlabId: yup.number().required("GST Slab is required"),
    name: yup.string().min(2, "Product name is too short").required("Name is required"),
    description: yup.string().required("Description is required"),
    unit: yup.string().required("Unit (e.g., Kg, Pcs) is required"),
    mrp: yup
        .number()
        .typeError("MRP must be a number")
        .positive("MRP must be greater than 0")
        .required("MRP is required"),
});