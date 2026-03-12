import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Clock } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    localStorage.setItem("isAuthenticated", "true");
    navigate("/", { replace: true });
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: "#0B0E14" }}
    >
      {/* Logo / Title */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: "#34D399" }}
        >
          <Clock size={22} color="#0B0E14" strokeWidth={2.5} />
        </div>
        <span
          className="text-2xl font-bold tracking-tight"
          style={{ color: "#DFE6F0" }}
        >
          TimeTracking
        </span>
      </div>

      {/* Card */}
      <div
        className="w-full max-w-sm rounded-xl border p-8"
        style={{ backgroundColor: "#161D2A", borderColor: "#1C2536" }}
      >
        <h1
          className="text-xl font-semibold mb-1"
          style={{ color: "#DFE6F0" }}
        >
          Sign In
        </h1>
        <p className="text-sm mb-6" style={{ color: "#7B8FAB" }}>
          Welcome back. Enter your credentials to continue.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "#DFE6F0" }}
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="you@example.com"
              className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors"
              style={{
                backgroundColor: "#111720",
                border: "1px solid #2A3650",
                color: "#DFE6F0",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#34D399")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#2A3650")}
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "#DFE6F0" }}
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••"
                className="w-full rounded-lg px-3 py-2.5 pr-10 text-sm outline-none transition-colors"
                style={{
                  backgroundColor: "#111720",
                  border: "1px solid #2A3650",
                  color: "#DFE6F0",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#34D399")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#2A3650")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: "#7B8FAB" }}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm mb-4" style={{ color: "#FB7185" }}>
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg text-sm font-semibold transition-colors"
            style={{ backgroundColor: "#34D399", color: "#0B0E14" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2db885")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#34D399")}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
