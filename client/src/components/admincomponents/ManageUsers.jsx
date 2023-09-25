import React, { useEffect, useState } from "react";
import "./ManageUsers.css";
import axios from "axios";
import { generatesuccess } from "../../utility/Toasts";

function ManageUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("Name");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [users, setUsers] = useState([]);

  function handleRefreshOnDelete() {
    axios.get("http://localhost:3005/admin-get-users").then((response) => {
      setUsers(response.data);
    });
  }

  useEffect(() => {
    handleRefreshOnDelete();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const filteredUsers = users?.filter((user) =>
    user[searchBy].toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) {
      return sortOrder === "asc" ? -1 : 1;
    } else if (a[sortColumn] > b[sortColumn]) {
      return sortOrder === "asc" ? 1 : -1;
    } else {
      return 0;
    }
  });

  function handleRemoveUser(id) {
    axios
      .delete(`http://localhost:3005/admin-delete-user/${id}`)
      .then((response) => {
        handleRefreshOnDelete();
        generatesuccess(response.data);
      });
  }
  function handleBlockUser(id) {
    axios
      .patch(`http://localhost:3005/admin-block-user/${id}`)
      .then((response) => {
        generatesuccess(response.data);
      });
  }
  function handleUnblockUser(id) {
    axios
      .patch(`http://localhost:3005/admin-unblock-user/${id}`)
      .then((response) => {
        generatesuccess(response.data);
      });
  }

  return (
    <div className="manage-users">
      <h1>Manage Users</h1>
      <div className="search-bar">
        <div className="search-by">
          <label>
            <input
              type="radio"
              value="Name"
              checked={searchBy === "Name"}
              onChange={handleSearchByChange}
            />
            Name
          </label>
          <label>
            <input
              type="radio"
              value="_id"
              checked={searchBy === "_id"}
              onChange={handleSearchByChange}
            />
            ID
          </label>
        </div>
        <input
          type="text"
          placeholder={`Search users by ${searchBy}`}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("_id")}>
              User ID {sortColumn === "_id" && sortOrder === "asc" && "▲"}
              {sortColumn === "_id" && sortOrder === "desc" && "▼"}
            </th>
            <th onClick={() => handleSort("Name")}>
              Name {sortColumn === "Name" && sortOrder === "asc" && "▲"}
              {sortColumn === "Name" && sortOrder === "desc" && "▼"}
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.Name}</td>
              <td>
                <button onClick={() => handleRemoveUser(user._id)}>
                  Remove user
                </button>
                <button onClick={() => handleBlockUser(user._id)}>
                  Block user
                </button>
                <button onClick={() => handleUnblockUser(user._id)}>
                  Unblock user
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;
