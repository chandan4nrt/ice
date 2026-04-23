import React from "react";
import Button from "../../components/atoms/Button";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import "../../css/order-confirmation.css";
import { useNotification } from "../../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { acceptOrderSchema } from "../../validations/order.schema";
import { useAcceptOrder, useRejectOrder } from "../../services/order.service";
import { useAuth } from "../../context/AuthContext";
import { getRoleBasedRedirect } from "../../utills/helper";

const INITIAL_ITEMS = [
  { id: 23, name: "Crushed ICE 1.25 KG", stocks: -190, qty: 200, price: 1.5 },
  { id: 24, name: "Full Cubes ICE", stocks: 45000, qty: 300, price: 1.5 },
];

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const acceptMutation = useAcceptOrder();
  const rejectMutation = useRejectOrder();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(acceptOrderSchema),
    defaultValues: {
      items: INITIAL_ITEMS,
      requestedDate: "24 April 2026",
      billedDate: "24 April 2026",
    },
  });

  const { fields, update } = useFieldArray({
    control,
    name: "items",
  });

  const watchItems = watch("items");

  // Totals Calculation
  const totalItems = watchItems.length;
  const totalQty = watchItems.reduce((sum, i) => sum + (Number(i.qty) || 0), 0);
  const totalPrice = watchItems.reduce((sum, i) => sum + (Number(i.qty) || 0) * i.price, 0);

  const handleUpdateQty = (index, delta) => {
    const currentItem = watchItems[index];
    const newQty = Math.max(0, (Number(currentItem.qty) || 0) + delta);
    update(index, { ...currentItem, qty: newQty });
  };

  const onAccept = async (data) => {
    try {
      await acceptMutation.mutateAsync(data);
      navigate("/sales/invoice/INV-001");
    } catch (error) {
      // Error handled by hook
    }
  };

  const onReject = async () => {
    try {
      await rejectMutation.mutateAsync({ orderId: "ORD-001" });
      navigate(getRoleBasedRedirect(user?.primaryRole));
    } catch (error) {
      // Error handled by hook
    }
  };

  return (
    <div className="oa-container">
      {/* Header */}
      <header className="oa-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <div className="header-text">
          <h1>Skyscape Bar & Lounge</h1>
          <p>Trigger supply restock process</p>
        </div>
      </header>

      <main className="oa-content">
        {/* Accept Details Card */}
        <section className="oa-card">
          <div className="card-header">
            <h3>Accept Details</h3>
          </div>

          <div className="dark-table">
            <div className="table-info-row">
              <span>Requested : 24 April 2026</span>
              <span>Billed : 24 April 2026</span>
            </div>

            <div className="table-head">
              <span className="col-prod">Product</span>
              <span className="col-stock">Stocks</span>
              <span className="col-qty">Qty</span>
            </div>

            {fields.map((field, index) => (
              <div className="table-row" key={field.id}>
                <div className="col-prod">{field.name}</div>
                <div className={`col-stock ${field.stocks < 0 ? 'text-red' : 'text-green'}`}>
                  {field.stocks}
                </div>
                <div className="col-qty">
                  <div className="qty-stepper">
                    <button type="button" onClick={() => handleUpdateQty(index, -10)}>
                      <Minus size={14} />
                    </button>
                    <span>{watchItems[index].qty}</span>
                    <button type="button" onClick={() => handleUpdateQty(index, 10)}>
                      <Plus size={14} />
                    </button>
                  </div>
                  {errors.items?.[index]?.qty && (
                    <p className="error-text text-red-500 text-xs mt-1">
                      {errors.items[index].qty.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Accept Summary Card */}
        <section className="oa-card summary-card">
          <h3>Accept Summary</h3>
          <div className="summary-box">
            <div className="summary-row">
              <span>Total Items:</span>
              <span>{String(totalItems).padStart(2, '0')}</span>
            </div>
            <div className="summary-row">
              <span>Total Quantity:</span>
              <span>{totalQty}</span>
            </div>
            <div className="summary-row">
              <span>Total Price:</span>
              <span className="price-text">₹{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </section>

        {/* Footer Actions */}
        <div className="oa-footer">
          <Button 
            className="btn-accept" 
            onClick={handleSubmit(onAccept)}
            isLoading={acceptMutation.isPending}
          >
            Order Accept
          </Button>
          <Button 
            className="btn-reject" 
            onClick={onReject}
            isLoading={rejectMutation.isPending}
          >
            Order Reject
          </Button>
        </div>
      </main>
    </div>
  );
}

