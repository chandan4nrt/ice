import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productsDetailsSchema } from "../../validations/productsDetails.schema";
import { useSaveProductDetails, useGetProductDetails } from "../../services/productsDetails.service";
import Input from "../../components/atoms/Input";
import { Button } from "../../components/atoms/Button";
import { useAuth } from "../../context/AuthContext";

export default function ProductsDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();

  // Verify Admin Access
  const isAdmin = user?.primaryRole === "ADMIN";

  const { data: products, isLoading } = useGetProductDetails({
    enabled: isAdmin,
  });

  const { mutate: saveProduct, isPending } = useSaveProductDetails();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productsDetailsSchema),
    defaultValues: {
      id: 0,
      productName: "",
      productCode: "",
      amount: 0,
    },
  });

  const onSubmit = (data) => {
    if (isEditing) {
      console.warn("Update API yet not implemented");
      return;
    }

    saveProduct(data, {
      onSuccess: () => {
        reset();
        setIsEditing(false);
      },
    });
  };

  const handleEdit = (product) => {
    setValue("id", product.id);
    setValue("productName", product.productName);
    setValue("productCode", product.productCode);
    setValue("amount", product.amount);
    setIsEditing(true);
  };

  if (!isAdmin) {
    return (
      <div className="mainbody">
        <div className="darkbox text-center p-8">
          <h3 className="text-red-500">Access Restricted</h3>
          <p className="mt-2">Only administrators are authorized to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mainbody">
      <div className="back-header">
        <div className="title-group px-3">
          <h1 className="page-title">Products Management</h1>
          <p className="page-subtitle">Configure system product catalog</p>
        </div>
      </div>

      <div className="darkbox">
        <section className="contsec">
          <h3>{isEditing ? "Edit Product" : "Add New Product"}</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <input type="hidden" {...register("id")} />
            <div className="row">
              <div className="col-md-4">
                <Input
                  label="Product Name"
                  placeholder="Enter product name"
                  error={errors.productName?.message}
                  {...register("productName")}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Product Code"
                  placeholder="Enter product code"
                  error={errors.productCode?.message}
                  {...register("productCode")}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Amount (₹)"
                  type="number"
                  placeholder="Enter unit amount"
                  error={errors.amount?.message}
                  {...register("amount")}
                />
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <Button
                type="submit"
                isLoading={isPending}
                disabled={isEditing}
                title={isEditing ? "Update API not yet available" : ""}
              >
                {isEditing ? "Update Product" : "Save Product"}
              </Button>
              {isEditing && (
                <Button
                  variant="outline"
                  type="button"
                  style={{ color: "white" }}
                  onClick={() => {
                    reset();
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </section>
      </div>

      <div className="darkbox mt-4">
        <section className="contsec">
          <h3>Current Product Details</h3>
          {isLoading ? (
            <p className="py-4">Fetching products...</p>
          ) : (
            <div className="table-responsive mt-3">
              <table className="table table-dark table-hover align-middle">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Product Code</th>
                    <th className="text-end">Unit Amount</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product) => (
                    <tr key={product.id}>
                      <td>{product.productName}</td>
                      <td>{product.productCode}</td>
                      <td className="text-end">₹{product.amount}</td>
                      <td className="text-center">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {(!products || products.length === 0) && (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-muted">
                        No product data available in the system
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
