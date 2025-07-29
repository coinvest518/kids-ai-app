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
        <Button
          onClick={mode === "login" ? handleLogin : handleRegister}
          disabled={loading}
          className="w-full border-2 border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none hover:border-blue-600 transition font-semibold"
          aria-label={mode === "login" ? "Login" : "Register"}
          type="button"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              Loading...
            </span>
          ) : mode === "login" ? "Login" : "Register"}
        </Button>
        {mode === "login" && (
          <Button
            onClick={handleMagicLink}
            disabled={loading || !email || magicSent}
            variant="outline"
            className={`w-full mt-2 border-2 border-purple-400 focus:ring-2 focus:ring-purple-400 focus:outline-none hover:border-purple-600 transition font-semibold ${magicSent ? 'opacity-60 cursor-not-allowed' : ''}`}
            aria-label="Login with Magic Link"
            type="button"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                Sending...
              </span>
            ) : magicSent ? "Magic Link Sent" : "Login with Magic Link"}
          </Button>
        )}
        {magicSent && (
          <div className="text-green-600 text-center mt-2 border border-green-300 rounded p-2 bg-green-50" role="status" tabIndex={0} aria-live="polite">
            Magic link sent! Check your email (and spam folder).<br />
            <span className="text-xs text-green-700">Click the link in your email to finish login.</span>
          </div>
        )}
        <div className="text-center mt-2">
          {mode === "login" ? (
            <span>
              New here?{' '}
              <button
                className="text-blue-600 underline border border-blue-200 rounded px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none hover:bg-blue-50 transition"
                onClick={() => setMode("register")}
                type="button"
                aria-label="Switch to Register"
              >
                Register
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                className="text-blue-600 underline border border-blue-200 rounded px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none hover:bg-blue-50 transition"
                onClick={() => setMode("login")}
                type="button"
                aria-label="Switch to Login"
              >
                Login
              </button>
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
