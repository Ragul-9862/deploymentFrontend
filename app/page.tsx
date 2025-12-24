"use client";

import { useEffect, useState } from "react";
import { getUsers, createUser } from "../src/services/user.service";

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      await createUser({ name, email });
      setName("");
      setEmail("");
      fetchUsers(); // refresh list
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-bold mb-4">Testing Users</h1>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-2 w-full"
        >
          Add User
        </button>

        <ul className="mt-4 space-y-2">
          {users.map((user) => (
            <li key={user._id} className="border p-2 rounded">
              {user.name} — {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
