import React, { useState } from "react";
import { useGetIncomingStats, useGetIncomingTransfers } from "../../services/incomingStocks.service";

export default function IncomingStocks() {
  const [openTransferId, setOpenTransferId] = useState("TRF-5612");

  const { data: stats = { pendingTransfers: 0, totalItemsExpected: 0 }, isLoading: isStatsLoading } = useGetIncomingStats();
  const { data: transfers = [], isLoading: isTransfersLoading } = useGetIncomingTransfers();

  return (
    <div className="incomingScreen">

      {/* SUMMARY */}
      <div className="incomingSummary">
        <div className="summaryBox lime">
          <span>Pending Transfers</span>
          <h3>{isStatsLoading ? "..." : stats.pendingTransfers}</h3>
        </div>

        <div className="summaryBox green">
          <span>Total Items Expected</span>
          <h3>{isStatsLoading ? "..." : stats.totalItemsExpected}</h3>
        </div>
      </div>

      {/* TRANSFERS */}
      {isTransfersLoading ? (
        <p style={{ color: "white", padding: "20px" }}>Loading incoming transfers...</p>
      ) : transfers.length === 0 ? (
        <p style={{ color: "white", padding: "20px" }}>No incoming transfers found.</p>
      ) : (
        transfers.map((transfer) => {
          const isOpen = openTransferId === transfer.id;

          return (
            <div key={transfer.id} className={`darkbox ${!isOpen ? "small" : ""}`}>
              {isOpen ? (
                <>
                  <div className="collapsebox">
                    <div className="transferHead">
                      <div className="transferTitle">
                        <h3>{transfer.id}</h3>
                        <span className="badge">{transfer.status}</span>
                      </div>
                      <div>
                        <button
                          className="btnAction"
                          onClick={() => setOpenTransferId(null)}
                        >
                          Collapse
                        </button>
                      </div>
                    </div>

                    <div className="transferInfo">
                      <p><span>Supplier:</span> {transfer.supplier}</p>
                      <p><span>Reference:</span> {transfer.reference}</p>
                      <p><span>Expected Date:</span> {transfer.expectedDate}</p>
                    </div>
                  </div>

                  {/* ITEMS */}
                  <div className="transferItems">
                    <h4>Items in this Transfer:</h4>
                    {transfer.items.length === 0 ? (
                      <p style={{ color: "gray", fontSize: "14px", marginTop: "10px" }}>No items expected.</p>
                    ) : (
                      transfer.items.map((item) => (
                        <div key={item.id} className="itemRow">
                          <span>{item.name}</span>
                          <span>{item.expectedQty < 10 ? `0${item.expectedQty}` : item.expectedQty}</span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* RECEIVE */}
                  <div className="transferItems">
                    <div className="receiveHeader">
                      <h4>Receive Items</h4>
                      <span>Status</span>
                    </div>

                    {transfer.items.length === 0 ? (
                      <p style={{ color: "gray", fontSize: "14px", marginTop: "10px" }}>Nothing to receive.</p>
                    ) : (
                      transfer.items.map((item) => {
                        const isCompleted = item.receivedQty >= item.expectedQty;
                        return (
                          <div key={item.id} className="receiveRow">
                            <span>{item.name}</span>
                            <div>
                              <input
                                readOnly
                                value={item.receivedQty < 10 ? `0${item.receivedQty}` : item.receivedQty}
                              />
                              {isCompleted ? (
                                <span className="greencolor">✔ Completed</span>
                              ) : (
                                <span className="lightred">
                                  Partial ({item.receivedQty < 10 ? `0${item.receivedQty}` : item.receivedQty}/{item.expectedQty < 10 ? `0${item.expectedQty}` : item.expectedQty})
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}

                    <div className="receiveFooter">
                      <span>Total: <b>
                        {transfer.items.reduce((s, i) => s + i.receivedQty, 0)} /
                        {transfer.items.reduce((s, i) => s + i.expectedQty, 0)}
                      </b></span>

                      <div className="actionBtns">
                        <button className="cancelBtn" onClick={() => setOpenTransferId(null)}>Cancel</button>
                        <button className="confirmBtn">Confirm Receipt</button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="transferHead">
                    <div className="transferTitle">
                      <h3>{transfer.id}</h3>
                      <span className="badge">{transfer.status}</span>
                    </div>
                    <div>
                      <button
                        className="btnReceive"
                        onClick={() => setOpenTransferId(transfer.id)}
                      >
                        Receive
                      </button>
                    </div>
                  </div>
                  <p className="supplierText">
                    <span>Supplier:</span> {transfer.supplier}
                  </p>
                </>
              )}
            </div>
          );
        })
      )}

    </div>
  );
}