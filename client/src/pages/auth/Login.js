import { loginUser } from "../../api/auth.api";
import Button from "../../components/ui/Button";
import { showToast } from "../../components/ui/Toast";
import { navigate } from "../../router/router";

export default function Login() {
  const container = document.createElement("div");
  container.className = "auth-container";

  container.innerHTML = `
  <div class="auth-page">

    <!-- Left Column: Form -->
    <div class="auth-left">
      <div class="auth-card card">
        <div class="logo-container">
          <h1 class="logo">Spentral.ai</h1>
        </div>
        <p class="subtitle">Sign in to your account</p>

        <form id="login-form" autocomplete="off">
          <input
            id="identifier"
            type="text"
            name="identifier"
            placeholder="Username or Email"
            autocomplete="off"
          />
          <div class="password-wrapper">
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              autocomplete="off"
            />
            <button class="btn-icon password-toggle" type="button" id="toggle-password" aria-label="Toggle Password Visibility">
              <svg
                class="lucide-eye"
                style="display: block;"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24">
                <!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE -->
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0"/>
                <circle cx="12" cy="12" r="3"/>
                </g>
              </svg>
              <svg
                class="lucide-eye-closed"
                style="display: none;"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24">
                <!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE -->
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 18l-.722-3.25M2 8a10.645 10.645 0 0 0 20 0m-2 7l-1.726-2.05M4 15l1.726-2.05M9 18l.722-3.25"/>
              </svg>
            </button>
          </div>
        </form>

        <span class="link">
          No account? <a id="signup-link">Signup</a>
        </span>
      </div>
    </div>

    <!-- Right Column: Illustration / Branding -->
    <div class="auth-right">
      
    </div>

  </div>
  `;

  const form = container.querySelector("#login-form");

  const loginButton = Button("Log In", {
    type: "primary",
    htmlType: "submit",
  });
  form.appendChild(loginButton);

  const lucideEye = container.querySelector(".lucide-eye");
  const lucideEyeClosed = container.querySelector(".lucide-eye-closed");
  const togglePasswordButton = container.querySelector("#toggle-password");
  let showPassword = false;

  togglePasswordButton.addEventListener("click", () => {
    showPassword = !showPassword;
    const passwordInput = container.querySelector("#password");
    passwordInput.type = showPassword ? "text" : "password";
    lucideEye.style.display = showPassword ? "none" : "block";
    lucideEyeClosed.style.display = showPassword ? "block" : "none";
  });

  form.onsubmit = async (e) => {
    e.preventDefault();

    const identifier = container.querySelector("#identifier").value.trim();
    const password = container.querySelector("#password").value;

    if (!identifier || !password) {
      showToast("All fields are required");
      return;
    }

    loginButton.setLoading(true);

    try {
      const res = await loginUser({ identifier, password });
      navigate("/dashboard");
    } catch (err) {
      showToast(err.response?.data?.message || "Login failed");
    } finally {
      loginButton.setLoading(false);
    }
  };

  container.querySelector("#signup-link").onclick = () => navigate("/signup");

  return container;
}
