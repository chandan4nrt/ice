import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productSchema } from '../../validations/product.schema';
import { useGetProducts, useSaveProduct } from '../../services/product.service';
import Input from "../../components/atoms/Input";
import Select from "../../components/atoms/Select";
import Textarea from "../../components/atoms/Textarea";
import Upload from "../../components/atoms/Upload";

const ProductManagement = () => {
    const [editingProduct, setEditingProduct] = useState(null);

    // 1. Data Fetching
    const { data: products, isLoading: loadingProducts } = useGetProducts();
    const { mutate: saveProduct, isLoading: isSaving } = useSaveProduct();

    // 2. React Hook Form
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
        resolver: yupResolver(productSchema),
    });

    // 3. Effect for editing
    useEffect(() => {
        if (editingProduct) reset(editingProduct);
        else reset({ 
            name: '', 
            description: '', 
            unit: '', 
            mrp: 0,
            brandId: '',
            categoryId: '',
            gstSlabId: ''
        });
    }, [editingProduct, reset]);

    const onSubmit = (data) => {
        const payload = { ...data, ...(editingProduct && { productId: editingProduct.productId }) };
        saveProduct(payload, {
            onSuccess: () => {
                setEditingProduct(null);
                reset();
            }
        });
    };

    // Mock Options
    const brandOptions = [
        { label: "Iceberg Premium", value: "1" },
        { label: "Eco Ice", value: "2" },
    ];
    const categoryOptions = [
        { label: "Cube Ice", value: "1" },
        { label: "Crushed Ice", value: "2" },
        { label: "Dry Ice", value: "3" },
    ];
    const gstOptions = [
        { label: "GST 0%", value: "1" },
        { label: "GST 5%", value: "2" },
        { label: "GST 12%", value: "3" },
        { label: "GST 18%", value: "4" },
    ];

    const dummyProducts = [
        { productId: 301, name: "Premium Cube Ice 5kg", description: "Food-grade crystal clear ice cubes, perfect for hotels and events.", unit: "Bag", mrp: 150.00 },
        { productId: 302, name: "Crushed Ice 2kg", description: "Fine crushed ice for cocktails and seafood preservation.", unit: "Bag", mrp: 80.00 }
    ];

    const displayProducts = products?.length > 0 ? products : dummyProducts;

    return (
        <div className="mainbody">
            <div className="title-group" style={{ marginBottom: '25px' }}>
                <h2 className="page-title">Product Management</h2>
                <p className="page-subtitle">Add and configure items in your product catalog</p>
            </div>

            <div className="vendor-container formsec">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="darkbox">
                        <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>
                            {editingProduct ? 'Update Product Details' : 'Add New Product Item'}
                        </h3>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                            <Select
                                label="Brand"
                                options={brandOptions}
                                {...register("brandId")}
                                error={errors.brandId?.message}
                                placeholder="Select Brand"
                                required
                            />
                            <Select
                                label="Category"
                                options={categoryOptions}
                                {...register("categoryId")}
                                error={errors.categoryId?.message}
                                placeholder="Select Category"
                                required
                            />
                            <Select
                                label="GST Slab"
                                options={gstOptions}
                                {...register("gstSlabId")}
                                error={errors.gstSlabId?.message}
                                placeholder="Select GST"
                                required
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '20px', marginTop: '15px' }}>
                            <Input
                                label="Product Name"
                                placeholder="e.g. Premium Cube Ice 5kg"
                                {...register("name")}
                                error={errors.name?.message}
                                required
                            />
                            <Input
                                label="Unit"
                                placeholder="e.g. Bag, Pcs, Kg"
                                {...register("unit")}
                                error={errors.unit?.message}
                                required
                            />
                            <Input
                                label="MRP (₹)"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                {...register("mrp")}
                                error={errors.mrp?.message}
                                required
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginTop: '15px' }}>
                            <Textarea
                                label="Product Description"
                                placeholder="Describe the product features, quality, and storage instructions..."
                                {...register("description")}
                                error={errors.description?.message}
                                required
                            />
                            <Controller
                                name="productImg"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <Upload
                                        label="Product Image"
                                        file={value}
                                        onChange={onChange}
                                        onDelete={() => onChange(null)}
                                        preview={true}
                                        error={errors.productImg?.message}
                                        accept="image/*"
                                    />
                                )}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                            <button type="submit" className="continue-btn" disabled={isSaving}>
                                {isSaving ? 'SAVING...' : editingProduct ? 'UPDATE PRODUCT' : 'ADD PRODUCT'}
                            </button>
                            {editingProduct && (
                                <button type="button" className="btnsave" onClick={() => setEditingProduct(null)}>
                                    CANCEL
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            {/* List Section */}
            <div className="darkbox" style={{ marginTop: '40px' }}>
                <h3 style={{ marginBottom: '20px' }}>Inventory Catalog</h3>
                {loadingProducts ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray)' }}>Loading Catalog...</div>
                ) : (
                    <div className="table-responsive">
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--white)' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                    <th style={{ padding: '12px' }}>Product</th>
                                    <th style={{ padding: '12px' }}>Description</th>
                                    <th style={{ padding: '12px' }}>Unit</th>
                                    <th style={{ padding: '12px' }}>MRP</th>
                                    <th style={{ padding: '12px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayProducts?.map((item) => (
                                    <tr key={item.productId} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '12px' }}>
                                            <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                                            <div style={{ fontSize: '11px', color: 'var(--yellow)' }}>ID: {item.productId}</div>
                                        </td>
                                        <td style={{ padding: '12px', fontSize: '13px', color: 'var(--gray)', maxWidth: '300px' }}>
                                            {item.description}
                                        </td>
                                        <td style={{ padding: '12px' }}>{item.unit}</td>
                                        <td style={{ padding: '12px', fontWeight: 'bold' }}>₹{item.mrp}</td>
                                        <td style={{ padding: '12px' }}>
                                            <button 
                                                style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--white)', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer' }}
                                                onClick={() => setEditingProduct(item)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {(!products || products.length === 0) && (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--gray)' }}>The catalog is currently empty.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductManagement;