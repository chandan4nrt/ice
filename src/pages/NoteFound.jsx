const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-4">404</h1>
      <p className="lead">Page Not Found</p>
      <a href="/" className="btn btn-primary">
        Go Home
      </a>
    </div>
  );
};

export default NotFound;