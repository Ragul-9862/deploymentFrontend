const API_URL = "http://localhost:5000/api";



export const getUsers = async () => {
  const res = await fetch(`${API_URL}/users`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch users");

  return res.json();
};

export const createUser = async (data: { name: string; email: string }) => {
  const res = await fetch(`${API_URL}/users/addUsers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create user");

  return res.json();
};
