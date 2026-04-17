import React from "react"; 

export default function Where() {
  return (
    <>
    <section className="hero">
        <h1>WHERE TO FIND</h1>
        <p>Pure • Reliable • Engineered Ice Solutions</p>
      </section>

    <div className="darkbox">  
      <section className="contsec">  
        <h2>CONTACT US</h2>
        <p>We're here to help. Whether you need product details, bulk pricing, delivery schedules, or technical information, our team is ready to support you.</p>
      </section>
 
      <section className="contsec getintouch">  
        <h3>Get in Touch</h3>
        <ul>
            <li>
                <div>
                   <h4>General Enquiries</h4>
                   <a href="mailto:hello@iceberg.com">hello@iceberg.com</a>
                   <p>Collaborations, info, and general questions.</p>
                </div>
            </li>
            <li>
                <div>
                   <h4>Customer Support</h4>
                   <a href="mailto:support@iceberg.com">support@iceberg.com</a>
                   <p>Bug reports, help, and problem solving.</p>
                </div>
            </li>
            <li>
                <div>
                   <h4>Sales & Partnerships</h4>
                   <a href="mailto:sales@iceberg.com">sales@iceberg.com</a>
                   <p>Clients, deals, pitching, and bulk orders.</p>
                </div>
            </li>
            <li>
                <div>
                   <h4>Billing & Accounts</h4>
                   <a href="mailto:billing@iceberg.com">billing@iceberg.com</a>
                   <p>Invoices, refunds, and payment queries.</p>
                </div>
            </li>
        </ul>
      </section>
 
    </div>
    </>
  );
}