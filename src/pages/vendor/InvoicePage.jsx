
import React from "react";
import "../../css/invoice.css";
import { useParams } from "react-router-dom";
import { useGetInvoiceDetails } from "../../services/order.service";

export default function InvoicePage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetInvoiceDetails(id);

  if (isLoading) return <div className="text-center p-10 mt-10">Loading Invoice...</div>;
  if (isError || !data) return <div className="text-center p-10 mt-10 text-red-500">Error loading invoice details.</div>;

  return (
    <div className="invoice-outer-wrapper">
      <div className="invoice-container">
        {/* 1. Header Section */}
        <header className="invoice-header">
          <div className="company-info">
            <img src="/logo.png" alt="Meraki Iceberg" className="invoice-logo" />
            <div className="company-text">
              <h2>{data.billFrom.name}</h2>
              <p>GSTIN: {data.billFrom.gstin} | MSME: {data.billFrom.msme}</p>
            </div>
          </div>
          <div className="invoice-meta">
            <p className="tax-label">TAX INVOICE</p>
            <h1 className="invoice-number">{data.invoiceNo}</h1>
            <span className="status-badge-paid">✓ PAID</span>
          </div>
        </header>

        {/* 2. Billing Grid */}
        <div className="billing-section">
          <div className="billing-headers">
            <div className="header-item"><span>BILL FROM</span></div>
            <div className="header-item"><span>BILL TO</span></div>
            <div className="header-item"><span>INVOICE INFO</span></div>
          </div>
          
          <div className="billing-grid">
            <div className="bill-from">
              <strong>{data.billFrom.name}</strong>
              <p>{data.billFrom.address1}</p>
              <p>{data.billFrom.address2}</p>
              <p>GSTIN: {data.billFrom.gstin}</p>
              <p>Email: {data.billFrom.email}</p>
              <p>Phone: {data.billFrom.phone}</p>
            </div>
            <div className="bill-to">
              <strong>{data.billTo.name}</strong>
              <p>{data.billTo.address}</p>
              <p>State: {data.billTo.state}, Code: {data.billTo.stateCode}</p>
              <p>GSTIN: {data.billTo.gstin}</p>
              <p>Phone: {data.billTo.phone}</p>
            </div>
            <div className="invoice-info">
              <div className="info-row">
                <span className="label">Invoice Date</span>
                <span className="value">{data.date}</span>
              </div>
              <div className="info-row">
                <span className="label">Supplier Ref</span>
                <span className="value">{data.ref}</span>
              </div>
              <div className="info-row">
                <span className="label">State Code</span>
                <span className="value">{data.billTo.stateCode}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Items List Section */}
        <div className="table-section">
          <div className="side-logos">
            <img src="/logo.png" alt="QR" />
            <img src="/logo.png" alt="IAF" />
            <img src="/logo.png" alt="EGAC" />
            <img src="/logo.png" alt="QACB" />
          </div>

          <div className="main-table-container">
            {/* Items Grid */}
            <div className="invoice-items-grid">
              <div className="items-header-row">
                <div className="col-idx">#</div>
                <div className="col-desc">Description</div>
                <div className="col-hsn">HSN</div>
                <div className="col-gst">GST%</div>
                <div className="col-qty">Qty</div>
                <div className="col-rate">Rate (₹)</div>
                <div className="col-amt">Amount (₹)</div>
              </div>
              
              <div className="items-body">
                {data.items.map((item, index) => (
                  <div className="items-data-row" key={item.id}>
                    <div className="col-idx" data-label="#"><span className="cell-val">{index + 1}</span></div>
                    <div className="col-desc" data-label="Description"><span className="cell-val">{item.name}</span></div>
                    <div className="col-hsn" data-label="HSN"><span className="cell-val">{item.hsn}</span></div>
                    <div className="col-gst" data-label="GST%"><span className="cell-val">{item.gst}</span></div>
                    <div className="col-qty" data-label="Qty"><span className="cell-val">{item.qty}</span></div>
                    <div className="col-rate" data-label="Rate"><span className="cell-val">{item.rate.toFixed(2)}</span></div>
                    <div className="col-amt" data-label="Amount"><span className="cell-val">{item.amount.toLocaleString()}</span></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="calculation-section">
              <div className="calc-row">
                <span>Taxable Amount</span>
                <span>{data.taxableAmount.toLocaleString()}</span>
              </div>
              <div className="calc-row">
                <span>SGST @ 2.5%</span>
                <span>{data.sgst}</span>
              </div>
              <div className="calc-row">
                <span>CGST @ 2.5%</span>
                <span>{data.cgst}</span>
              </div>
              <div className="total-amount-row">
                <span className="total-label">Total Amount</span>
                <span className="total-value">₹ {data.totalAmount.toLocaleString()}</span>
              </div>
              <p className="amount-in-words">
                Amount in words: <strong>{data.amountInWords}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* 4. GST Summary Section */}
        <div className="gst-summary-section">
          <h6>GST BREAKUP SUMMARY</h6>
          <div className="gst-grid">
            <div className="gst-header-row">
              <div>HSN/SAC</div>
              <div>Taxable Value</div>
              <div>CGST Rate</div>
              <div>CGST Amt</div>
              <div>SGST Rate</div>
              <div>SGST Amt</div>
              <div>Total Tax</div>
            </div>
            <div className="gst-body">
              <div className="gst-data-row">
                <div data-label="HSN/SAC">123456</div>
                <div data-label="Taxable Value">{data.taxableAmount.toLocaleString()}</div>
                <div data-label="CGST Rate">2.5%</div>
                <div data-label="CGST Amt">{data.cgst}</div>
                <div data-label="SGST Rate">2.5%</div>
                <div data-label="SGST Amt">{data.sgst}</div>
                <div data-label="Total Tax">{(data.cgst + data.sgst).toFixed(2)}</div>
              </div>
              <div className="gst-footer-row">
                <div className="gst-total-label">Total</div>
                <div className="gst-total-value">₹ {(data.cgst + data.sgst).toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Footer Details */}
        <div className="footer-grid">
          <div className="bank-details">
            <h6>BANK DETAILS</h6>
            <div className="bank-info">
              <img src="/logo.png" alt="PNB" className="bank-logo" />
              <div>
                <strong>Punjab National Bank</strong>
                <p>A/C: 03275010000060</p>
                <p>IFSC: PUNB0032710</p>
              </div>
            </div>
            <p className="declaration">
              <strong>Declaration:</strong> We declare that this invoice shows the actual price of goods described and all particulars are true and correct.
            </p>
          </div>

          <div className="scan-pay">
            <h6>SCAN & PAY</h6>
            <img src="/logo.png" alt="QR" className="qr-code" />
            <p>Scan to pay instantly</p>
            <p>UPI / Bank Transfer</p>
          </div>

          <div className="authorisation">
            <h6>AUTHORISATION</h6>
            <div className="sign-area">
              <p>For <strong>{data.billFrom.name}</strong></p>
              <div className="signature-line"></div>
              <p className="sign-label">Authorised Signatory</p>
            </div>
          </div>
        </div>

        <div className="bottom-note">
          <p className="jurisdiction">Subject to Ranchi Jurisdiction</p>
          <p className="computer-gen">This is a computer generated invoice</p>
        </div>
      </div>
    </div>
  );
}
