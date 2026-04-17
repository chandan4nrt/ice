import React, { useState } from "react";
import { Send, X, Pencil, Plus, Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Popup from "../../components/Popup";
import "../../css/popup.css";
import {
  useGetProducts,
  useCreateReplenishmentOrder,
} from "../../services/replenishment.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { itemSchema } from "../../validations/replenishment.schema";
import { Button } from "../../components/atoms/Button";
import Select from "../../components/atoms/Select";
import Input from "../../components/atoms/Input";
import Textarea from "../../components/atoms/Textarea"


export default function CreateReplenishmentOrder() {
  // Main Page State
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // 1. Initialize RHF for the Popup fields
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(itemSchema),
    defaultValues: { product: "", qty: 1, priority: "Medium" },
  });

  // API Hooks
  const { data: products = [], isLoading: isLoadingProducts } = useGetProducts();
  const { mutate: createOrder, isPending: isSubmitting } = useCreateReplenishmentOrder();

  const priorities = ["Low", "Medium", "High"];

  // Logic for calculations
  const totalItems = items.length;
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);
  const grandTotal = items.reduce((sum, i) => sum + i.qty * (i.price || 0), 0);

  const priorityCounts = priorities.map((p) => ({
    label: p,
    count: items.filter((i) => i.priority === p).length,
  }));

  // Watch values for live calculation in Popup
  const watchedProduct = watch("product");
  const watchedQty = watch("qty");
  const selectedProduct = products.find((p) => p.name === watchedProduct);

  // 2. Save Item Function (called by RHF's handleSubmit)
  const onSaveItem = (data) => {
    const selectedProd = products.find((p) => p.name === data.product);
    const newItem = {
      ...data,
      price: selectedProd?.price || 0,
    };

    if (editIndex !== null) {
      const updated = [...items];
      updated[editIndex] = newItem;
      setItems(updated);
    } else {
      setItems([...items, newItem]);
    }

    closePopup();
  };

  const closePopup = () => {
    reset(); // Clears RHF state
    setShowPopup(false);
    setEditIndex(null);
  };

  const handleEdit = (item, index) => {
    setEditIndex(index);
    setValue("product", item.product);
    setValue("qty", item.qty);
    setValue("priority", item.priority);
    setShowPopup(true);
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleFinalSubmit = () => {
    if (items.length === 0) {
      alert("Please add at least one product");
      return;
    }

    const payload = {
      deliveryDate,
      notes,
      items,
    };

    createOrder(payload, {
      onSuccess: () => {
        setShowSuccess(true);
      },
    });
  };

  const handleContinue = () => {
    setShowSuccess(false);
    setItems([]);
    setDeliveryDate(new Date());
    setNotes("");
  };

  return (
    <div className="cro-page">
      <div className="cro-wrapper">

        {/* Header */}
        <div className="cro-header">
          <h2>Request Details</h2>
        </div>

        {/* Requested Delivery Date */}
        <div className="darkbox">
          <div className="field">
            <label className="cro-label">
              Requested Delivery Date <span className="cro-required">*</span>
            </label>
            <DatePicker
              selected={deliveryDate}
              onChange={(d) => setDeliveryDate(d)}
              dateFormat="EEEE, MMMM d, yyyy"
              className="datepicker-input"
              required
            />
            {errors.deliveryDate && <p className="error text-danger small">{errors.deliveryDate.message}</p>}
          </div>
        </div>

        {/* Items to Replenish */}
        <div className="darkbox">
          <div className="cro-section-header">
            <h3 className="cro-section-title">Items to Replenish</h3>
            <Button
              className="add-btn"
              onClick={() => {
                setEditIndex(null);
                setShowPopup(true);
              }}
              leftIcon={<Plus size={14} />}
            >
              Add Item
            </Button>
          </div>

          {items.length === 0 ? (
            <div className="cro-empty">
              <p>
                No items added yet. Click "Add Item" to
                <br /> start building your request.
              </p>
            </div>
          ) : (
            <div className="cro-item-list">
              <div className="cro-table-head">
                <span className="col-product">Product</span>
                <span className="col-qty">Qty</span>
                <span className="col-priority">Priority</span>
                <span className="col-actions">Actions</span>
              </div>
              {items.map((item, index) => (
                <div className="cro-item-row" key={index}>
                  <div className="col-product">
                    <p className="item-name">{item.product}</p>
                    <span className="item-price">₹{item.price}</span>
                  </div>
                  <div className="col-qty">{item.qty}</div>
                  <div className="col-priority">
                    <span className={`priority-badge priority-${item.priority.toLowerCase()}`}>
                      {item.priority}
                    </span>
                  </div>
                  <div className="col-actions">
                    <Button className="cro-icon-btn edit" onClick={() => handleEdit(item, index)}>
                      <Pencil size={14} />
                    </Button>
                    <Button className="cro-icon-btn delete" onClick={() => handleDelete(index)}>
                      <X size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Notes */}
        <div className="note-section">
          <label className="cro-label">Additional Notes</label>
          <Textarea
            className="cro-textarea"
            placeholder="Enter text..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Request Summary */}
        <div className="darkbox">
          <h3 className="cro-summary-title">Request Summary</h3>
          <div className="cro-summary-row">
            <span>
              <Calendar size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px', marginTop: '-3px' }} />
              Delivery Date:
            </span>
            <span>
              {deliveryDate
                ? new Date(deliveryDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                : "Not set"}
            </span>
          </div>
          <div className="cro-summary-row">
            <span>Total Items:</span>
            <span>{totalItems}</span>
          </div>
          <div className="cro-summary-row">
            <span>Total Quantity:</span>
            <span>{totalQty}</span>
          </div>
          <div className="cro-summary-row">
            <span>Additional Notes:</span>
            <span className={!notes ? "not-selected" : ""}>{notes || "None"}</span>
          </div>

          {items.length > 0 && (
            <>
              <div className="cro-summary-divider" />
              <div className="cro-priority-label">Item Totals:</div>
              <div className="cro-priority-dist">
                {items.map((item, idx) => (
                  <div key={idx} className="cro-priority-row">
                    <span className="priority-name">
                      {item.product} ({item.qty} x ₹{item.price})
                    </span>
                    <span className="priority-count">₹{item.qty * item.price}</span>
                  </div>
                ))}
              </div>
              <div className="cro-summary-divider" />
              <div className="cro-summary-row">
                <strong>Grand Total:</strong>
                <strong>₹{grandTotal}</strong>
              </div>
            </>
          )}

          <div className="cro-summary-divider" />
          <div className="cro-priority-label">Priority Distribution:</div>
          <div className="cro-priority-dist">
            {priorityCounts.map((p) => (
              <div key={p.label} className="cro-priority-row">
                <span className={`priority-dot priority-${p.label.toLowerCase()}`} />
                <span className="priority-name">{p.label}</span>
                <span className="priority-count">{p.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="cro-actions">
          <Button
            className="submit-btn"
            onClick={handleFinalSubmit}
            isLoading={isSubmitting}
            leftIcon={<Send size={15} />}
          >
            Submit Request
          </Button>
          <Button className="cro-cancel-btn" onClick={handleContinue} leftIcon={<X size={15} />}>
            Cancel
          </Button>
        </div>

      </div>

      {/* Add/Edit Item Popup */}
      {showPopup && (
        <Popup
          title={editIndex !== null ? "Edit Item" : "Add Item"}
          onClose={closePopup}
          onSave={handleSubmit(onSaveItem)}
          saveText={editIndex !== null ? "Update" : "+ Add"}
          resetText="Cancel"
          onReset={closePopup}
          submitClass="darkBtn"
        >
          <Select
            label="Product"
            options={products}
            mapField={{ label: "name", value: "name" }}
            error={errors.product?.message}
            placeholder="Select Product"
            {...register("product")}
          />

          <Input
            label="Quantity"
            type="number"
            className="popup-input"
            error={errors.qty?.message}
            {...register("qty")}
          />

          <Select
            label="Priority"
            options={priorities.map((val, i) => { return { id: i, name: val } })}
            mapField={{ label: "name", value: "name" }}
            error={errors.priority?.message}
            placeholder="Select Priority"
            {...register("priority")}
          />

          {selectedProduct && (
            <div className="cro-total-row">
              <span>Total Price</span>
              <strong>₹{selectedProduct.price * (watchedQty || 0)}</strong>
            </div>
          )}
        </Popup>
      )}

      {/* Success Popup */}
      {showSuccess && (
        <Popup onClose={() => setShowSuccess(false)} hideFooter={true}>
          <div className="cro-success-popup">
            <div className="cro-success-icon">
              <div className="success-circle">✔</div>
            </div>
            <p className="cro-success-text">Order generated successfully</p>
            <Button className="cro-continue-btn" onClick={handleContinue}>
              CONTINUE
            </Button>

          </div>
        </Popup>
      )}
    </div>
  );
}
