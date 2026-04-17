import React from "react"; 

export default function Home() {
  return (
    <>
    <section className="hero">
        <h1>ICEBERG</h1>
        <p>Pure • Reliable • Engineered Ice Solutions</p>
      </section> 
      <section className="darkbox contsec">
        <h2>ABOUT US</h2>
        <p>Iceberg is built on a simple belief — ice should be pure, reliable, and engineered with intention. We combine advanced filtration, controlled freezing technology, and strict hygiene standards to create ice that looks clearer, lasts longer, and performs better in every setting. From crystal-clear cocktail cubes to crushed ice and industrial-grade blocks, our products are crafted with precision to meet the needs of homes, cafés, bars, restaurants, event professionals, and large-scale commercial operations.</p>
        <p>But Iceberg is more than just an ice manufacturer — we're a dependable service partner. With temperature-regulated storage, efficient logistics, and a customer-first approach, we ensure every order reaches you fresh, clean, and on time. Whether you're elevating the presentation of a drink, powering production systems, or managing a high-demand event, Iceberg delivers consistency, clarity, and a smooth experience you can trust.</p>
       </section> 
      <section className="darkbox contsec">
        <h2>WHAT WE DO</h2>
        <p>At Iceberg, we produce and deliver high-quality, food-safe ice for homes, businesses, and industrial operations. Using advanced purification and freezing technology, we create crystal-clear cubes, crushed ice, and heavy-density industrial blocks that last longer, look cleaner, and perform better in any environment. From refreshing beverages to large-scale cooling needs, our products are engineered for clarity, consistency, and reliability.</p>
        <p>We support our clients with seamless ordering, temperature-controlled storage, and fast, dependable delivery. Whether you're a bar, café, restaurant, event company, or industrial facility, Iceberg provides the ice you need — whenever you need it — with precision, quality, and a service you can count on.</p>
       </section> 
      <section className="darkbox contsec">
        <h2>PRODUCTS</h2> 
        <div className="products">
          <div className="product-card">
            <h3>ICEBERG CLASSIC</h3>
            <p>Complete line designed for professionals</p>
            <p>The Iceberg line includes our most popular products. With their own technical characteristics and intended uses, they all share ease of use and top production quality.</p>
          </div>

          <div className="product-card">
            <h3>CRYSTAL CUBES</h3>
            <p>Premium clear ice for cocktails</p>
          </div>

          <div className="product-card">
            <h3>CRUSHED ICE</h3>
            <p>Perfect for beverages & cooling</p>
          </div>

          <div className="product-card">
            <h3>INDUSTRIAL BLOCKS</h3>
            <p>Heavy-duty cooling solutions</p>
          </div>
        </div>
      </section> 
     
    </>
  );
}