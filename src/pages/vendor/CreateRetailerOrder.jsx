import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/popup.css";
import Popup from "../../components/Popup";
import { Pencil, X } from "lucide-react";
import { InfinitePagination } from "../../components/Pagination";

// ✅ Import all 3 hooks
import {
  useGetVendors,
  useGetProducts,
  useCreateOrder,
} from "../../services/createRetailOrder.service";
import Select from "../../components/atoms/Select";

export default function CreateRetailerOrder() {
  const [retailer, setRetailer] = useState("");
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
  // const [discount, setDiscount] = useState(0);
  const [note, setNote] = useState("");
  const [remarks, setRemarks] = useState("");
  // ✅ API hooks
  // const { data: vendors = [], isLoading } = useGetVendors();
  const { data: products = [], isLoading: productsLoading } = useGetProducts(); // /api/v1/productdetails
  const {
    list: vendors = [],
    isLoading,
    hasNextPage: hasMoreVendors,
    fetchNextPage: fetchMoreVendors,
    isFetchingNextPage: isFetchingMoreVendors,
  } = useGetVendors();

  const { mutate: createOrder, isPending } = useCreateOrder(); // /api/v1/order

  const statusList = ["In orders", "Completed", "Cancelled"];

  // ✅ Use API fields: productName & amount
  const selectedProduct = products.find((p) => p.productName === product);
  // const totalPrice = selectedProduct ? selectedProduct.amount * qty - discount : 0;
  const totalPrice = selectedProduct ? selectedProduct.amount * qty : 0;

  // ✅ Add / Update Order
  const handleSave = () => {
    if (!product) return;

    const newItem = {
      product,
      price: selectedProduct.amount, // ✅ from API
      qty,
      // discount,
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
    // setDiscount(0);
    setShowPopup(false);
  };

  // ✅ Delete
  const handleDelete = (index) => {
    const updated = orders.filter((_, i) => i !== index);
    setOrders(updated);
  };

  // ✅ Edit
  const handleEdit = (item, index) => {
    setProduct(item.product);
    setQty(item.qty);
    // setDiscount(item.discount);
    setNote(item.note ?? "");
    setEditIndex(index);
    setShowPopup(true);
  };

  // ✅ Totals
  const grandTotal = orders.reduce((sum, item) => sum + item.total, 0);
  const totalDiscount = orders.reduce((sum, item) => sum + item.discount, 0);

  // ✅ Submit — build payload and hit /api/v1/order
  const handleSubmit = () => {
    if (orders.length === 0) {
      alert("Please add at least one product");
      return;
    }

    const payload = {
      vendorId: Number(retailer),
      paymentMode: "cash", // update if you add a UI field for this
      createdBy: 1, // replace with actual logged-in user ID from auth context
      status,
      remarks,
      items: orders.map((o) => ({
        productName: o.product,
        price: o.price,
        quantity: o.qty,
        // discount: o.discount,
        discount: 0,
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
    setRetailer("");
    setStatus("In orders");
    setDate(new Date());
    setProduct("");
    setQty(1);
    setNote("");
    setRemarks("");
    // setDiscount(0);
    setEditIndex(null);
  };

  return (
    <>
      <div className="darkbox">
        {/* Retailer */}
        <div>
          <Select
            wrapperClass="field"
            className="selectdd"
            label={"Select Retailer"}
            value={retailer}
            onChange={(e) => setRetailer(e.target.value)}
            placeholder="Select Retailer"
            options={vendors}
            mapField={{ label: "businessName", value: "vendorId" }}
          />
          <InfinitePagination
            hasNextPage={hasMoreVendors}
            fetchNextPage={fetchMoreVendors}
            isFetchingNextPage={isFetchingMoreVendors}
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
        <div className="field">
          <label>Status</label>
          <select
            className="selectdd"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statusList.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Product Orders */}
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
            {/* <p className="sub">Total discount</p> */}
          </div>
          <div className="amount">
            <p>₹{grandTotal}</p>
            <p className="sub">₹{totalDiscount}</p>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="note-section">
        <label>Note</label>
        <textarea
          placeholder="Enter text..."
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
      </div>

      {/* ✅ Submit button — calls API */}
      <button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit"}
      </button>

      {/* ✅ Add / Edit Product Popup */}
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
            {/* ✅ Product dropdown — populated from /api/v1/productdetails */}
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
                onChange={(e) => setQty(Number(e.target.value))}
              />
            </div>

            {/* Discount */}
            {/* <div className="form-group">
              <label>Discount</label>
              <input
                type="number"
                className="popup-input"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
              />
            </div> */}
            {/* NOTE */}
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
            <div className="success-text">Order generated successfully</div>
            <button className="continue-btn" onClick={handleContinue}>
              CONTINUE
            </button>
          </div>
        </Popup>
      )}
    </>
  );
}

// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "../../css/popup.css";
// import Popup from "../../components/Popup";
// import { Pencil, Trash2, X } from "lucide-react";
// //step 1
// import { useGetVendors } from "../../services/createRetailOrder.service";

// export default function CreateRetailerOrder() {
//   const [retailer, setRetailer] = useState("");
//   const [status, setStatus] = useState("In orders");
//   const [date, setDate] = useState(new Date());
//   const [showPopup, setShowPopup] = useState(false);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);

//   // Orders list
//   const [orders, setOrders] = useState([]);

//   // Edit index
//   const [editIndex, setEditIndex] = useState(null);

//   // Popup states
//   const [product, setProduct] = useState("");
//   const [qty, setQty] = useState(1);
//   const [discount, setDiscount] = useState(0);
// //step 2
// const { data: vendors = [], isLoading } = useGetVendors();

//   const statusList = ["In orders", "Completed", "Cancelled"];

//   const products = [
//     { name: "ice cube 1", price: 30 },
//     { name: "Product 2", price: 200 },
//     { name: "Product 3", price: 300 },
//   ];

//   const selectedProduct = products.find((p) => p.name === product);

//   const totalPrice =
//     selectedProduct ? selectedProduct.price * qty - discount : 0;

//   // ✅ Add / Update Order
//   const handleSave = () => {
//     if (!product) return;

//     const newItem = {
//       product,
//       price: selectedProduct.price,
//       qty,
//       discount,
//       total: totalPrice,
//     };

//     if (editIndex !== null) {
//       const updated = [...orders];
//       updated[editIndex] = newItem;
//       setOrders(updated);
//       setEditIndex(null);
//     } else {
//       setOrders([...orders, newItem]);
//     }

//     setProduct("");
//     setQty(1);
//     setDiscount(0);
//     setShowPopup(false);
//   };

//   // ✅ Delete
//   const handleDelete = (index) => {
//     const updated = orders.filter((_, i) => i !== index);
//     setOrders(updated);
//   };

//   // ✅ Edit
//   const handleEdit = (item, index) => {
//     setProduct(item.product);
//     setQty(item.qty);
//     setDiscount(item.discount);
//     setEditIndex(index);
//     setShowPopup(true);
//   };

//   // ✅ Totals
//   const grandTotal = orders.reduce((sum, item) => sum + item.total, 0);
//   const totalDiscount = orders.reduce((sum, item) => sum + item.discount, 0);

//   return (
//     <>
//       <div className="darkbox">

//         {/* Retailer */}
//         {/* step 3 */}
//         <div className="field">
//           <label>Select Retailer</label>
//          <select
//   className="selectdd"
//   value={retailer}
//   onChange={(e) => setRetailer(e.target.value)}
// >
//   <option value="">Choose Retailer</option>

//   {!isLoading && vendors.length === 0 && (
//     <option>No vendors found</option>
//   )}

//   {vendors.map((v) => (
//     <option key={v.vendorId} value={v.vendorId}>
//       {v.businessName}
//     </option>
//   ))}
// </select>
//         </div>

//         {/* Date */}
//         <div className="field">
//           <label>Date</label>
//           <DatePicker
//             selected={date}
//             onChange={(d) => setDate(d)}
//             dateFormat="EEEE, MMMM d, yyyy"
//             className="datepicker-input"
//           />
//         </div>

//         {/* Status */}
//         <div className="field">
//           <label>Status</label>
//           <select
//             className="selectdd"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//           >
//             {statusList.map((s, i) => (
//               <option key={i} value={s}>{s}</option>
//             ))}
//           </select>
//         </div>

//         {/* Product Orders */}
//         <div className="product-header">
//           <h3>Product orders</h3>
//           <button
//             className="add-btn"
//             onClick={() => {
//               setEditIndex(null);
//               setShowPopup(true);
//             }}
//           >
//             +Add
//           </button>
//         </div>

//         {/* ✅ Order List */}
//         {orders.length > 0 && (
//           <div className="order-list">
//             <div className="tablehead">
//       <div className="product"><strong>Product</strong></div>
//       <div className="qty"><strong>Qty</strong></div>
//       <div className="total"><strong>Price</strong></div>
//       <div className="actions"><strong>Actions</strong></div>
//     </div>

//             {orders.map((item, index) => (
//               <div className="order-row field" key={index}>
                
//                 <div className="product">
//                   <p>{item.product}</p>
//                   <span>₹{item.price}</span>
//                 </div>

//                 <div className="qty">{item.qty}</div>
//                 {/* ₹{item.total} */}
//                 <div className="total"> ₹{item.price * item.qty}</div>

//                 <div className="actions">
//                   <button className="editbtn" onClick={() => handleEdit(item, index)}><Pencil size={16} /></button>
//                   <button className="crossbtn" onClick={() => handleDelete(index)}><X size={16} /></button>
//                 </div>

//               </div>
//             ))}
//           </div>
//         )}

//         {/* Price Summary */}
//         <div className="price">
//           <div>
//             <p className="title">Grand total price</p>
//             <p className="sub">Total discount</p>
//           </div>
//           <div className="amount">
//             <p>₹{grandTotal}</p>
//             <p className="sub">₹{totalDiscount}</p>
//           </div>
//         </div>
//       </div>

//       {/* Note */}
//       <div className="note-section">
//         <label>Note</label>
//         <textarea placeholder="Enter text..." />
//       </div>

//       <button
//         className="submit-btn"
//         onClick={() => {
//           if (orders.length === 0) {
//             alert("Please add at least one product");
//             return;
//           }
//           setShowSuccessPopup(true);
//         }}
//       >
//         Submit
//       </button>


//       {/* ✅ Popup */}
//       {showPopup && (
//         <Popup
//           title="Make product orders"
//           onClose={() => setShowPopup(false)}
//           closeOnOutsideClick={false}
//           onSave={handleSave}
//           saveText={editIndex !== null ? "Update" : "+Add"}
//           resetText="Cancel"
//           onReset={() => setShowPopup(false)}
//           submitClass="darkBtn"
//         >
//           <div className="order-popup">

//             {/* Product */}
//             <div className="form-group">
//               <label>Product</label>
//               <select
//                 className="popup-input"
//                 value={product}
//                 onChange={(e) => setProduct(e.target.value)}
//               >
//                 <option value="">Select Product</option>
//                 {products.map((p, i) => (
//                   <option key={i} value={p.name}>{p.name}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Quantity */}
//             <div className="form-group">
//               <label>Quantity</label>
//               <input
//                 type="number"
//                 className="popup-input"
//                 value={qty}
//                 onChange={(e) => setQty(Number(e.target.value))}
//               />
//             </div>

//             {/* Discount */}
//             <div className="form-group">
//               <label>Discount</label>
//               <input
//                 type="number"
//                 className="popup-input"
//                 value={discount}
//                 onChange={(e) => setDiscount(Number(e.target.value))}
//               />
//             </div>

//             {/* Total */}
//             <div className="total-row">
//               <span>Total Price</span>
//               <strong>₹{totalPrice}</strong>
//             </div>

//           </div>
//         </Popup>
//       )}

//       {showSuccessPopup && (
//         <Popup
//           title=""
//           onClose={() => setShowSuccessPopup(false)}
//           closeOnOutsideClick={false}
//           submitClass="darkBtn"
//           hideFooter={true}  
//         >
//           <div className="successfullybox">
//             <div className="icon-wrapper">
//               <div className="circle">
//                 <div className="checkmark">✔</div>
//               </div>
//             </div>

//             <div className="success-text">
//               Order generated successfully
//             </div>

//             <button
//               className="continue-btn"
//               onClick={() => {
//                 setShowSuccessPopup(false);

//                 setOrders([]);
//                 setRetailer("");
//                 setStatus("In orders");
//                 setDate(new Date());

//                 setProduct("");
//                 setQty(1);
//                 setDiscount(0);
//                 setEditIndex(null);
//               }}
//             >
//               CONTINUE
//             </button>
//           </div>
//         </Popup>
//       )}
//     </>
//   );
// }