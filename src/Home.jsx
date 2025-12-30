import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const APIURL = "http://localhost:5000";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [users, setUsers] = useState([]);

  // 🔹 Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${APIURL}/users/get`);
      setUsers(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  // 🔹 On page load
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${APIURL}/users/addUsers`, formData);

      toast.success("User created successfully");

      setFormData({ name: "", email: "" });

      // Refresh user list
      fetchUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="text-center mb-4">Create User</h4>

              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="name">Name</label>
                </div>

                {/* Email */}
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>

              <hr />

              <h5 className="mt-3">List of Users</h5>

              <ul className="list-group">
                {users.length === 0 ? (
                  <li className="list-group-item text-center">
                    No users found
                  </li>
                ) : (
                  users.map((user) => (
                    <li key={user._id} className="list-group-item">
                      <strong>{user.name}</strong> – {user.email}
                    </li>
                  ))
                )}
              </ul>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
