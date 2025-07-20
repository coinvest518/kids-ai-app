import React, { useEffect, useState } from "react";
import { account } from "@/lib/appwrite";

export default function AppwriteStatus() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    account.get()
      .then(setUser)
      .catch((err) => setError(err.message || "Not logged in"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center p-8">Connecting to Appwrite...</div>;
  if (error) return <div className="text-center p-8 text-red-600">Appwrite error: {error}</div>;
  if (!user) return <div className="text-center p-8 text-yellow-600">Not logged in to Appwrite</div>;
  return <div className="text-center p-8 text-green-600">Connected to Appwrite as {user.name || user.email}</div>;
}
