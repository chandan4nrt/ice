import React from "react"; 

export default function Company() {
  return (
    <>
    <section className="hero">
        <h1>ICEBERG</h1>
        <p>Pure • Reliable • Engineered Ice Solutions</p>
       </section> 
      <section className="darkbox contsec">
        <h2>VISION</h2>
        <p>At Iceberg, we see ice not as a commodity, but as a lifestyle built on clarity, safety, and responsibility. Our mission is to create ice that meets the highest standards of purity, sustainability, and performance, ensuring a better experience for every customer — from homes and cafés to large-scale industries. We continuously refine our production methods, analyze our products, and optimize distribution strategies to guarantee unmatched quality in every batch we deliver.</p> 
         </section> 
      <section className="darkbox contsec">
        <h2>HISTORY</h2>
        <p>Iceberg carries forward a tradition inspired by one of the earliest ice-producing regions in Europe. For centuries, natural snow was harvested, compacted, and traded across the Mediterranean for food and medical use — a heritage that reflects the importance of clean, dependable ice. Today, Iceberg transforms that timeless craft into a modern, technologically advanced process, using precision engineering and strict hygiene standards to produce superior ice for contemporary needs.</p>
         </section> 
      <section className="darkbox contsec">
        <h2>RAW MATERIALS</h2>
        <p>The excellence of our ice begins with ultra-pure, low-mineral water carefully sourced from protected natural regions. This water undergoes multi-stage filtration and purification to ensure microbiological safety and chemical neutrality. Its naturally low mineral and alkaline content guarantees that Iceberg ice melts without altering the flavor, aroma, or balance of any beverage — preserving the integrity of cocktails, juices, spirits, and culinary preparations.</p>
      </section> 
      <section className="darkbox contsec">
        <h2>PRODUCTION TECHNIQUE</h2> 
        <p>We use industry-leading production systems to guarantee purity, consistency, and environmental responsibility.</p>
        <div className="products">
          <div className="product-card">
            <h3>Tube Ice System</h3>
            <p>A high-yield, energy-efficient technology that produces clear, uniform ice with minimal environmental impact. This method increases production output while reducing waste and energy consumption.</p>
          </div>

          <div className="product-card">
            <h3>Drying Belt Process</h3>
            <p>A modern innovation that removes surface moisture from the ice before packaging, preventing cubes from freezing together and improving storage and handling.</p>
          </div>

          <div className="product-card">
            <h3>Snow Reel Selection System</h3>
            <p>An automated sorting mechanism that ensures only cubes of perfect size and clarity are packaged. Embedded sensors detect irregularities, ensuring every bag contains consistent, premium-quality ice.</p>
          </div>

          <div className="product-card">
            <h3>Centralized Digital Control</h3>
            <p>All machinery communicates with a single monitoring system — regulating temperatures, verifying efficiency, and identifying any deviations from standard values.</p>
          </div>
        </div>
      </section> 
      <section className="contsec certifications">
        <h2>CERTIFICATIONS</h2>
        <p>Our production process meets international standards for food-grade ice.</p>
        <ul>
            <li>International food-safety compliance</li>
            <li>Certified food-business operation standards</li>
            <li>Hygiene and traceability monitoring at all stages</li>
            <li>Regulated packaging and safe handling protocols</li>
            <li>Quality audits and microbial testing</li>
            <li>Total transparency through updated documentation and batch tracking</li>
        </ul>
        <p>Only a small number of ice producers hold certifications of this level — and Iceberg works to maintain total transparency through updated documentation, quality reports, and batch tracking.</p>
        </section> 
    </>
  );
}