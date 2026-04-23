import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { distributorSchema } from '../../validations/distributor.schema';
import { useGetDistributors, useSaveDistributor } from '../../services/distributor.service';
import { useGetStockists } from '../../services/stockist.service';

const DistributorManagement = () => {
    const [editingDist, setEditingDist] = useState(null);

    const { data: distributors, isLoading } = useGetDistributors();
    const { data: stockists } = useGetStockists(); // To populate Stockist dropdown
    const { mutate: saveDistributor, isLoading: isSaving } = useSaveDistributor();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(distributorSchema),
    });

    useEffect(() => {
        if (editingDist) reset(editingDist);
        else reset({ name: '', gstNumber: '', email: '', phone: '', stockistId: '' });
    }, [editingDist, reset]);

    const onSubmit = (data) => {
        const payload = { ...data, ...(editingDist && { distributorId: editingDist.distributorId }) };
        saveDistributor(payload, {
            onSuccess: () => {
                setEditingDist(null);
                reset();
            }
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Distributor Management</h2>

            <section style={{ marginBottom: '40px', border: '1px solid #orange', padding: '15px' }}>
                <h3>{editingDist ? 'Edit Distributor' : 'Add Distributor'}</h3>
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>

                    {/* Stockist Selection (FK Relationship) */}
                    <select {...register("stockistId")}>
                        <option value="">Select Stockist</option>
                        {stockists?.map(s => <option key={s.stockistId} value={s.stockistId}>{s.name}</option>)}
                    </select>
                    {errors.stockistId && <span style={{ color: 'red' }}>{errors.stockistId.message}</span>}

                    <input {...register("name")} placeholder="Distributor Name" />
                    <input {...register("gstNumber")} placeholder="GST Number" />
                    <input {...register("phone")} placeholder="Phone" />
                    <input {...register("email")} placeholder="Email" />
                    <input {...register("address")} placeholder="Address" />

                    {/* Placeholder for State Selection */}
                    <input {...register("stateId")} type="number" placeholder="State ID" />

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" disabled={isSaving}>
                            {isSaving ? 'Processing...' : editingDist ? 'Update' : 'Save'}
                        </button>
                        {editingDist && <button type="button" onClick={() => setEditingDist(null)}>Cancel</button>}
                    </div>
                </form>
            </section>

            <section>
                <h3>Distributor List</h3>
                {isLoading ? <p>Loading...</p> : (
                    <table width="100%" border="1" style={{ borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f4f4f4' }}>
                                <th>Name</th>
                                <th>GST</th>
                                <th>Parent Stockist ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {distributors?.map((item) => (
                                <tr key={item.distributorId}>
                                    <td>{item.name}</td>
                                    <td>{item.gstNumber}</td>
                                    <td>{item.stockistId}</td>
                                    <td>
                                        <button onClick={() => setEditingDist(item)}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
};

export default DistributorManagement;