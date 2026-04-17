import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLogin } from "../services/auth.service";

export default function DummyLogin() {
  const { login } = useAuth();

  const loginMutation = useLogin();
    const [form, setForm] = useState({
      username: "",
      password: "",
    });
  
    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      loginMutation.mutate(form, {
        onSuccess: (data) => {
          login(data.data);
        },
      });
    };
  
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow" style={{ width: "350px" }}>
          <h3 className="text-center mb-3">Login</h3>
  
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-3">
              <label className="form-label text-white" style={{ color: "white" }}>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </div>
  
            {/* Password */}
            <div className="mb-3">
              <label className="form-label" style={{ color: "white" }}>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>
  
            {/* Button */}
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    );
}