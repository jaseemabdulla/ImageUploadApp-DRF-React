import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

function AdminUserList() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    const userConfirmed = window.confirm("Are you sure you want to continue?");
    if (userConfirmed) {
      axios({
        method: "post",
        url: "/api/userdelete",
        withCredentials: true,
        data: {
          id,
        },
      }).then((res) => {
        setUsers(res.data);
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("bio", bio);
    formData.append("image", image);

    console.log("fdsfdffff", formData);

    axios
      .post("/api/update", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      });
  };

  useEffect(() => {
    axios
      .get("/api/admin", {
        withCredentials: true,
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th scope="col">Sl</th>
              <th scope="col">Image</th>
              <th scope="col">Full Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users &&
              users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{index}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleDelete(user.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                      
                      
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUserList;
