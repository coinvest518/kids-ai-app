import React, { useState } from "react";
import { account, ID } from "@/lib/appwrite";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AuthForm({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [magicSent, setMagicSent] = useState(false);
  // Magic Link login
  const handleMagicLink = async () => {
    setLoading(true);
    setError(null);
    setMagicSent(false);
    try {
      await account.createMagicURLToken(
        ID.unique(),
        email,
        window.location.origin // redirect to app root
      );
      setMagicSent(true);
    } catch (err) {
      setError(err.message || "Failed to send magic link");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      onAuth(user);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    try {
      await account.create(ID.unique(), email, password, name);
      await handleLogin();
    } catch (err) {
      setError(err.message || "Registration failed");
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-12">
      {/* Wallet login removed. Only email/password and magic link login remain. */}
      <CardHeader>
        <CardTitle>{mode === "login" ? "Login" : "Register"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && <div className="text-red-600">{error}</div>}
        {mode === "register" && (
          <input
            className="w-full border rounded px-3 py-2"
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        )}
        <input
          className="w-full border rounded px-3 py-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full border rounded px-3 py-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button onClick={mode === "login" ? handleLogin : handleRegister} disabled={loading} className="w-full">
          {loading ? "Loading..." : mode === "login" ? "Login" : "Register"}
        </Button>
        {mode === "login" && (
          <Button onClick={handleMagicLink} disabled={loading || !email} variant="outline" className="w-full mt-2">
            {loading ? "Sending..." : "Login with Magic Link"}
          </Button>
        )}
        {magicSent && <div className="text-green-600 text-center">Magic link sent! Check your email.</div>}
        <div className="text-center mt-2">
          {mode === "login" ? (
            <span>
              New here?{' '}
              <button className="text-blue-600 underline" onClick={() => setMode("register")}>Register</button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button className="text-blue-600 underline" onClick={() => setMode("login")}>Login</button>
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
