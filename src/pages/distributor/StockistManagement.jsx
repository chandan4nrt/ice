import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { stockistSchema } from '../../validations/stockist.schema';
import { useGetStockists, useSaveStockist } from '../../services/stockist.service';
import Input from "../../components/atoms/Input";
import Select from "../../components/atoms/Select";
import Textarea from "../../components/atoms/Textarea";
import Upload from "../../components/atoms/Upload";

const StockistManagement = () => {
    const [editingStockist, setEditingStockist] = React.useState(null);

    // 1. Data Fetching & Mutations
    const { data: stockists, isLoading } = useGetStockists();
    const { mutate: saveStockist, isLoading: isSaving } = useSaveStockist();

    // 2. React Hook Form Setup
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(stockistSchema),
    });

    // 3. Update form when editingStockist changes
    useEffect(() => {
        if (editingStockist) {
            reset(editingStockist);
        } else {
            reset({ 
                name: '', 
                gstNumber: '', 
                email: '', 
                phone: '', 
                address: '', 
                manufacturerId: '', 
                stateId: '' 
            }); 
        }
    }, [editingStockist, reset]);

    const onSubmit = (data) => {
        const payload = {
            ...data,
            ...(editingStockist && { stockistId: editingStockist.stockistId })
        };

        saveStockist(payload, {
            onSuccess: () => {
                setEditingStockist(null);
                reset();
            }
        });
    };

    // Mock Options for Dropdowns
    const manufacturerOptions = [
        { label: "Iceberg Main Facility", value: "1" },
        { label: "Regional Distribution Hub", value: "2" },
    ];

    const stateOptions = [
        { label: "Jharkhand", value: "20" },
        { label: "Bihar", value: "10" },
        { label: "West Bengal", value: "19" },
    ];

    const dummyStockists = [
        { stockistId: 101, name: "Sunrise Enterprises", gstNumber: "20AATCM5038J1ZA", email: "info@sunrise.com", phone: "9876543210", address: "Sector 4, Ranchi, Jharkhand", manufacturerId: "1", stateId: "20" },
        { stockistId: 102, name: "Bharat Logistics", gstNumber: "10BBTCM1234K2ZB", email: "contact@bharat.in", phone: "9123456789", address: "Gaya Road, Patna, Bihar", manufacturerId: "2", stateId: "10" }
    ];

    const displayStockists = stockists?.length > 0 ? stockists : dummyStockists;

    return (
        <div className="mainbody">
            <div className="title-group mb-4" style={{ marginBottom: '20px' }}>
                <h2 className="page-title">Stockist Management</h2>
                <p className="page-subtitle">Add and manage warehouse partners in the system</p>
            </div>

            <div className="vendor-container formsec">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="darkbox">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <Input
                                label="Stockist Name"
                                placeholder="Enter stockist name"
                                {...register("name")}
                                error={errors.name?.message}
                                required
                            />
                            <Input
                                label="GST Number"
                                placeholder="20AATCM5038J1ZA"
                                {...register("gstNumber")}
                                error={errors.gstNumber?.message}
                                required
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
                            <Input
                                label="Email ID"
                                type="email"
                                placeholder="stockist@example.com"
                                {...register("email")}
                                error={errors.email?.message}
                                required
                            />
                            <Input
                                label="Phone Number"
                                placeholder="+91 98765 43210"
                                {...register("phone")}
                                error={errors.phone?.message}
                                required
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
                            <Select
                                label="Manufacturer"
                                options={manufacturerOptions}
                                {...register("manufacturerId")}
                                error={errors.manufacturerId?.message}
                                placeholder="Select Manufacturer"
                            />
                            <Select
                                label="State"
                                options={stateOptions}
                                {...register("stateId")}
                                error={errors.stateId?.message}
                                placeholder="Select State"
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginTop: '15px' }}>
                            <Textarea
                                label="Complete Address"
                                placeholder="Enter full warehouse address..."
                                {...register("address")}
                                error={errors.address?.message}
                                required
                            />
                            <Controller
                                name="stockistDoc"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <Upload
                                        label="Upload GST/Agreement"
                                        file={value}
                                        onChange={onChange}
                                        onDelete={() => onChange(null)}
                                        preview={true}
                                        error={errors.stockistDoc?.message}
                                    />
                                )}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                            <button type="submit" className="continue-btn" disabled={isSaving}>
                                {isSaving ? 'SAVING...' : editingStockist ? 'UPDATE STOCKIST' : 'CREATE STOCKIST'}
                            </button>
                            {editingStockist && (
                                <button type="button" className="btnsave" onClick={() => setEditingStockist(null)}>
                                    CANCEL
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            {/* List Table Section */}
            <div className="darkbox" style={{ marginTop: '40px' }}>
                <h3 style={{ marginBottom: '20px' }}>Active Stockist Directory</h3>
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray)' }}>Loading Stockists...</div>
                ) : (
                    <div className="table-responsive">
                        <table className="w-full" style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--white)' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                    <th style={{ padding: '12px' }}>Stockist Name</th>
                                    <th style={{ padding: '12px' }}>GST Details</th>
                                    <th style={{ padding: '12px' }}>Contact</th>
                                    <th style={{ padding: '12px' }}>Location</th>
                                    <th style={{ padding: '12px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayStockists?.map((item) => (
                                    <tr key={item.stockistId} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '12px', fontWeight: 'bold' }}>{item.name}</td>
                                        <td style={{ padding: '12px' }}>{item.gstNumber}</td>
                                        <td style={{ padding: '12px' }}>
                                            <div style={{ fontSize: '14px' }}>{item.phone}</div>
                                            <div style={{ fontSize: '12px', color: 'var(--gray)' }}>{item.email}</div>
                                        </td>
                                        <td style={{ padding: '12px', fontSize: '13px', maxWidth: '250px' }}>{item.address}</td>
                                        <td style={{ padding: '12px' }}>
                                            <button 
                                                style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--white)', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer' }}
                                                onClick={() => setEditingStockist(item)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StockistManagement;