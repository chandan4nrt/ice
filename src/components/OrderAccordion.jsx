import { useState } from "react";

export default function OrderAccordion({ orders }) {

    const [openCard, setOpenCard] = useState(null);

    return (
        <div className="retailerOrderList">

            {orders.map(order => {

                const isOpen = openCard === order.id;

                return (
                    <div key={order.id} className="retailerOrderCard">

                        {/* HEADER */}
                        <div
                            className="retailerOrderHeader"
                            onClick={() => setOpenCard(isOpen ? null : order.id)}
                        >

                            <div className="retailerAvatar">
                                {order.initial}
                            </div>

                            <div className="retailerOrderInfo">

                                <div className="retailerName">
                                    {order.name}
                                </div>

                                <div className="retailerDateText">
                                    {order.date}
                                </div>

                            </div>

                            <span
                                className="retailerStatus"
                                style={{
                                    background: order.statusBg,
                                    color: order.statusText
                                }}
                            >
                                {order.status}
                            </span>

                        </div>


                        {/* EXPAND AREA */}
                        {isOpen && order.products?.length > 0 && (

                            <div className="retailerExpand">

                                <div className="retailerTableHead">
                                    <div>
                                        <span>Product</span>
                                    </div>
                                    <div>
                                        <span className="center">Quantity</span>
                                        <span className="right">Total price</span>
                                    </div>
                                </div>

                                {order.products.map((p, i) => (
                                    <div key={i} className="retailerProductRow">

                                        <div>
                                            <div className="productName">{p.name}</div>
                                            <div className="productPrice">{p.price}</div>
                                        </div>

                                        <div>
                                            <div className="center total ps-3">
                                                {p.qty}
                                            </div>

                                            <div className="center total">
                                                {p.total}
                                            </div>
                                        </div>

                                    </div>
                                ))}

                                <div className="divider" />

                                <div className="summary">

                                    <div className="summaryRow">
                                        <span>Grand total price</span>
                                        <span className="right">{order.grandTotal}</span>
                                    </div>

                                    <div className="summaryRow">
                                        <span>Total discount</span>
                                        <span className="right">{order.discount}</span>
                                    </div>

                                    <div className="summaryRow">
                                        <span>cust1's balance</span>
                                        <span className="right">{order.balance}</span>
                                    </div>

                                    <div className="summaryRow"> 
                                        <span>cust1's debt</span>
                                        <span className="right">{order.debt}</span>
                                    </div>

                                </div>

                            </div>

                        )}

                    </div>
                );
            })}

        </div>
    );
}