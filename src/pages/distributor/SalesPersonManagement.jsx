import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { salesPersonSchema } from '../../validations/salesPerson.schema';
import { useGetSalesPersons, useSaveSalesPerson } from '../../services/salesPerson.service';
import { useGetStockists } from '../../services/stockist.service';
import { useGetDistributors } from '../../services/newDistributor.service';
import Input from "../../components/atoms/Input";
import Select from "../../components/atoms/Select";
import Upload from "../../components/atoms/Upload";

const SalesPersonManagement = () => {
    const [editingPerson, setEditingPerson] = useState(null);

    // 1. Data Fetching
    const { data: salesPersons, isLoading: loadingTeam } = useGetSalesPersons();
    const { data: stockists } = useGetStockists();
    const { data: distributors } = useGetDistributors();
    const { mutate: savePerson, isLoading: isSaving } = useSaveSalesPerson();

    // 2. React Hook Form
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
        resolver: yupResolver(salesPersonSchema),
    });

    // 3. Effect for editing
    useEffect(() => {
        if (editingPerson) reset(editingPerson);
        else reset({ 
            name: '', 
            email: '', 
            phone: '', 
            targetAmount: 0, 
            isActive: true,
            stockistId: '',
            distributorId: '',
            joiningDate: new Date().toISOString().split('T')[0]
        });
    }, [editingPerson, reset]);

    const onSubmit = (data) => {
        const payload = { ...data, ...(editingPerson && { salesPersonId: editingPerson.salesPersonId }) };
        savePerson(payload, {
            onSuccess: () => {
                setEditingPerson(null);
                reset();
            }
        });
    };

    // Mapping options
    const stockistOptions = stockists?.map(s => ({ label: s.name, value: String(s.stockistId) })) || [];
    const distributorOptions = distributors?.map(d => ({ label: d.name, value: String(d.distributorId) })) || [];

    const dummyPersons = [
        { salesPersonId: 201, name: "Rahul Sharma", phone: "9876543210", email: "rahul@iceberg.com", targetAmount: 50000, isActive: true, joiningDate: "2024-01-15" },
        { salesPersonId: 202, name: "Anita Singh", phone: "9123456789", email: "anita@iceberg.com", targetAmount: 75000, isActive: true, joiningDate: "2024-02-10" }
    ];

    const displayPersons = salesPersons?.length > 0 ? salesPersons : dummyPersons;

    return (
        <div className="mainbody">
            <div className="title-group" style={{ marginBottom: '25px' }}>
                <h2 className="page-title">Sales Person Management</h2>
                <p className="page-subtitle">Manage your field sales team and assignments</p>
            </div>

            <div className="vendor-container formsec">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="darkbox">
                        <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>
                            {editingPerson ? 'Update Sales Person' : 'Register New Sales Person'}
                        </h3>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <Select
                                label="Assign Stockist"
                                options={stockistOptions}
                                {...register("stockistId")}
                                error={errors.stockistId?.message}
                                placeholder="Select Stockist"
                                required
                            />
                            <Select
                                label="Assign Distributor"
                                options={distributorOptions}
                                {...register("distributorId")}
                                error={errors.distributorId?.message}
                                placeholder="Select Distributor"
                                required
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
                            <Input
                                label="Full Name"
                                placeholder="Enter sales person name"
                                {...register("name")}
                                error={errors.name?.message}
                                required
                            />
                            <Input
                                label="Phone Number"
                                placeholder="9876543210"
                                {...register("phone")}
                                error={errors.phone?.message}
                                required
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '20px', marginTop: '15px' }}>
                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="sales@example.com"
                                {...register("email")}
                                error={errors.email?.message}
                                required
                            />
                            <Input
                                label="Joining Date"
                                type="date"
                                {...register("joiningDate")}
                                error={errors.joiningDate?.message}
                                required
                            />
                            <Input
                                label="Target Amount (₹)"
                                type="number"
                                placeholder="50000"
                                {...register("targetAmount")}
                                error={errors.targetAmount?.message}
                                required
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginTop: '20px', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input type="checkbox" {...register("isActive")} id="activeCheck" style={{ width: '18px', height: '18px' }} />
                                <label htmlFor="activeCheck" style={{ cursor: 'pointer', fontSize: '14px' }}>Active Staff Member</label>
                            </div>
                            <Controller
                                name="idProof"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <Upload
                                        label="Upload ID Proof (Aadhar/PAN)"
                                        file={value}
                                        onChange={onChange}
                                        onDelete={() => onChange(null)}
                                        preview={true}
                                        error={errors.idProof?.message}
                                    />
                                )}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                            <button type="submit" className="continue-btn" disabled={isSaving}>
                                {isSaving ? 'PROCESSING...' : editingPerson ? 'UPDATE SALES PERSON' : 'CREATE SALES PERSON'}
                            </button>
                            {editingPerson && (
                                <button type="button" className="btnsave" onClick={() => setEditingPerson(null)}>
                                    CANCEL
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            <div className="darkbox" style={{ marginTop: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0 }}>Active Sales Team</h3>
                    {loadingTeam && <span style={{ fontSize: '12px', color: 'var(--yellow)' }}>Syncing...</span>}
                </div>
                <div className="table-responsive">
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--white)' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                <th style={{ padding: '12px' }}>Name</th>
                                <th style={{ padding: '12px' }}>Contact Details</th>
                                <th style={{ padding: '12px' }}>Target</th>
                                <th style={{ padding: '12px' }}>Status</th>
                                <th style={{ padding: '12px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayPersons?.map((item) => (
                                    <tr key={item.salesPersonId} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '12px', fontWeight: 'bold' }}>{item.name}</td>
                                        <td style={{ padding: '12px' }}>
                                            <div style={{ fontSize: '14px' }}>{item.phone}</div>
                                            <div style={{ fontSize: '12px', color: 'var(--gray)' }}>{item.email}</div>
                                        </td>
                                        <td style={{ padding: '12px' }}>₹{item.targetAmount}</td>
                                        <td style={{ padding: '12px' }}>
                                            <span style={{ 
                                                padding: '4px 8px', 
                                                borderRadius: '12px', 
                                                fontSize: '11px', 
                                                background: item.isActive ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                                color: item.isActive ? '#22c55e' : '#ef4444'
                                            }}>
                                                {item.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px' }}>
                                            <button 
                                                style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--white)', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer' }}
                                                onClick={() => setEditingPerson(item)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {(!salesPersons || salesPersons.length === 0) && (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--gray)' }}>No sales persons found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
    );
};

export default SalesPersonManagement;