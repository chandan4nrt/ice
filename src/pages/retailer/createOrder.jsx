import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/popup.css";
import Popup from "../../components/Popup";
import { Pencil, X } from "lucide-react";
import { InfinitePagination } from "../../components/Pagination";
import Input from "../../components/atoms/Input";
import Select from "../../components/atoms/Select";
import Textarea from "../../components/atoms/Textarea";

// ✅ Import hooks — reuse the same service used in vendor's CreateRetailerOrder
import {
  useGetRetailers,
  useGetProducts,
  useCreateOrder,
} from "../../services/createRetailOrder.service";

export default function CreateOrder() {
  const [customer, setCustomer] = useState("");
  const [status, setStatus] = useState("In orders");
  const [date, setDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Orders list
  const [orders, setOrders] = useState([]);

  // Edit index
  const [editIndex, setEditIndex] = useState(null);

  // Popup states
  const [product, setProduct] = useState("");
  const [qty, setQty] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [note, setNote] = useState("");
  const [remarks, setRemarks] = useState("");

  // ✅ API hooks
  const { data: products = [], isLoading: productsLoading } = useGetProducts();
  const {
    list: customers = [],
    isLoading,
    hasNextPage: hasMoreCustomers,
    fetchNextPage: fetchMoreCustomers,
    isFetchingNextPage: isFetchingMoreCustomers,
  } = useGetRetailers();

  const { mutate: createOrder, isPending } = useCreateOrder();

  const statusList = ["In orders", "Completed", "Cancelled"];

  // ✅ Derive selected product details
  const selectedProduct = products.find((p) => p.productName === product);
  const totalPrice = selectedProduct
    ? selectedProduct.amount * qty - discount
    : 0;

  // ✅ Add / Update Order
  const handleSave = () => {
    if (!product) return;

    const newItem = {
      product,
      price: selectedProduct.amount,
      qty,
      discount,
      note,
      total: totalPrice,
    };

    setNote("");

    if (editIndex !== null) {
      const updated = [...orders];
      updated[editIndex] = newItem;
      setOrders(updated);
      setEditIndex(null);
    } else {
      setOrders([...orders, newItem]);
    }

    setProduct("");
    setQty(1);
    setDiscount(0);
    setShowPopup(false);
  };

  // ✅ Delete order row
  const handleDelete = (index) => {
    setOrders(orders.filter((_, i) => i !== index));
  };

  // ✅ Open popup in edit mode
  const handleEdit = (item, index) => {
    setProduct(item.product);
    setQty(item.qty);
    setDiscount(item.discount ?? 0);
    setNote(item.note ?? "");
    setEditIndex(index);
    setShowPopup(true);
  };

  // ✅ Totals
  const grandTotal = orders.reduce((sum, item) => sum + item.total, 0);
  const totalDiscount = orders.reduce(
    (sum, item) => sum + (item.discount ?? 0),
    0,
  );

  // ✅ Submit — build payload and call API
  const handleSubmit = () => {
    if (orders.length === 0) {
      alert("Please add at least one product");
      return;
    }

    const payload = {
      vendorId: Number(customer),
      paymentMode: "cash",
      createdBy: 1, // replace with actual logged-in user ID from auth context
      status,
      remarks,
      items: orders.map((o) => ({
        productName: o.product,
        price: o.price,
        quantity: o.qty,
        discount: o.discount ?? 0,
        note: o.note,
      })),
    };

    createOrder(payload, {
      onSuccess: () => setShowSuccessPopup(true),
    });
  };

  // ✅ Reset all state after success
  const handleContinue = () => {
    setShowSuccessPopup(false);
    setOrders([]);
    setCustomer("");
    setStatus("In orders");
    setDate(new Date());
    setProduct("");
    setQty(1);
    setDiscount(0);
    setNote("");
    setRemarks("");
    setEditIndex(null);
  };

  return (
    <>
      <div className="darkbox">
        {/* Customer */}
        <div>
          <Select
            wrapperClass="field"
            className="selectdd"
            label={"Customer"}
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            placeholder="Select Customer"
            options={customers}
            mapField={{ label: "businessName", value: "vendorId" }}
          />
          <InfinitePagination
            hasNextPage={hasMoreCustomers}
            fetchNextPage={fetchMoreCustomers}
            isFetchingNextPage={isFetchingMoreCustomers}
          />
        </div>

        {/* Date */}
        <div className="field">
          <label>Date</label>
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            dateFormat="EEEE, MMMM d, yyyy"
            className="datepicker-input"
          />
        </div>

        {/* Status */}
        <Select
          wrapperClass="field"
          className="selectdd"
          label={"Status"}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Select status"
          options={statusList.map((s, i) => ({ id: i, label: s, value: s }))}
        />

        {/* Product Orders header */}
        <div className="product-header">
          <h3>Product orders</h3>
          <button
            className="add-btn"
            onClick={() => {
              setEditIndex(null);
              setShowPopup(true);
            }}
          >
            +Add
          </button>
        </div>

        {/* Order List */}
        {orders.length > 0 && (
          <div className="order-list">
            <div className="tablehead">
              <div className="product">
                <strong>Product</strong>
              </div>
              <div className="qty">
                <strong>Qty</strong>
              </div>
              <div className="total">
                <strong>Price</strong>
              </div>
              <div className="actions">
                <strong>Actions</strong>
              </div>
            </div>

            {orders.map((item, index) => (
              <div className="order-row field" key={index}>
                <div className="product">
                  <p>{item.product}</p>
                  <span>₹{item.price}</span>
                </div>
                <div className="qty">{item.qty}</div>
                <div className="total">₹{item.price * item.qty}</div>
                <div className="actions">
                  <button
                    className="editbtn"
                    onClick={() => handleEdit(item, index)}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="crossbtn"
                    onClick={() => handleDelete(index)}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Price Summary */}
        <div className="price">
          <div>
            <p className="title">Grand total price</p>
            <p className="sub">Total discount</p>
          </div>
          <div className="amount">
            <p>₹{grandTotal}</p>
            <p className="sub">₹{totalDiscount}</p>
          </div>
        </div>
      </div>

      {/* Note */}
      <Textarea
        wrapperClass="note-section"
        label="Note"
        type="textarea"
        placeholder="Enter text..."
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />

      {/* Submit */}
      <button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit"}
      </button>

      {/* Add / Edit Product Popup */}
      {showPopup && (
        <Popup
          title="Make product orders"
          onClose={() => setShowPopup(false)}
          closeOnOutsideClick={false}
          onSave={handleSave}
          saveText={editIndex !== null ? "Update" : "+Add"}
          resetText="Cancel"
          onReset={() => setShowPopup(false)}
          submitClass="darkBtn"
        >
          <div className="order-popup">
            {/* Product dropdown */}
            <Select
              label={"Product"}
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Select Product"
              options={products}
              mapField={{ label: "productName", value: "productName" }}
            />

            {/* Quantity */}
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                className="popup-input"
                value={qty}
                min={1}
                onChange={(e) => setQty(Number(e.target.value))}
              />
            </div>

            {/* Discount */}
            <div className="form-group">
              <label>Discount</label>
              <input
                type="number"
                className="popup-input"
                value={discount}
                min={0}
                onChange={(e) => setDiscount(Number(e.target.value))}
              />
            </div>

            {/* Note */}
            <div className="form-group">
              <label>Note</label>
              <textarea
                className="popup-input"
                placeholder="Enter note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            {/* Total */}
            <div className="total-row">
              <span>Total Price</span>
              <strong>₹{totalPrice}</strong>
            </div>
          </div>
        </Popup>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <Popup
          title=""
          onClose={() => setShowSuccessPopup(false)}
          closeOnOutsideClick={false}
          submitClass="darkBtn"
          hideFooter={true}
        >
          <div className="successfullybox">
            <div className="icon-wrapper">
              <div className="circle">
                <div className="checkmark">✔</div>
              </div>
            </div>
            <div className="success-text">Order Request Successfully</div>
            <button className="continue-btn" onClick={handleContinue}>
              CONTINUE
            </button>
          </div>
        </Popup>
      )}
    </>
  );
}
