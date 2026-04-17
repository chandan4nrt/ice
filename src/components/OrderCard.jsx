export default function OrderCard({ order }) {

  return (
    <div className="darkbox orderCard">

      <div className="left">

        <div className="icon">
          <img src={order.icon} alt="icon" />
        </div>

        <div>
          <h4>
            Request ID : <span>{order.id}</span>
          </h4>

          <p>{order.date}</p>

          <p>
            Items: <span>{order.items?.toString().padStart(2, "0")}</span>
          </p>
        </div>

      </div>

      <div className="right">

        <span
          className={`retailerStatus ${order.status
            .toLowerCase()
            .replace(" ", "")}`}
        >
          {order.status}
        </span>

        <p>
          Qty : <span>{order.qty}</span>
        </p>

      </div>

    </div>
  );
}