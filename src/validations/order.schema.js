import * as yup from "yup";

export const orderSchema = yup.object({
  vendorId: yup.number().required("Retailer is required"),

  status: yup.string().required("Status is required"),

  items: yup
    .array()
    .of(
      yup.object({
        productName: yup.string().required("Product required"),
        price: yup.number().required(),
        quantity: yup
          .number()
          .min(1, "Min qty 1")
          .required("Quantity required"),
        discount: yup.number().min(0),
      }),
    )
    .min(1, "Add at least one product"),

  paymentMode: yup.string().required(),

  createdBy: yup.number().required(),
});
