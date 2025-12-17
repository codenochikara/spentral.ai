import { signupUser } from "../../api/auth.api";
import Button from "../../components/ui/Button";
import { showToast } from "../../components/ui/Toast";
import { navigate } from "../../router/router";

export default function Signup() {
  const container = document.createElement("div");
  container.className = "auth-page"; // updated from auth-container

  container.innerHTML = `
    <!-- Left Column: Form -->
    <div class="auth-left">
      <div class="auth-card card">
        <div class="logo-container">
          <h1 class="logo">Spentral.ai</h1>
        </div>
        <p class="subtitle">Create your account</p>

        <form id="signup-form" autocomplete="off">
          <input
            id="username"
            class="input"
            name="new-username"
            autocomplete="off"
            placeholder="Username"
          />
          <input
            id="email"
            class="input"
            type="email"
            name="email"
            autocomplete="email"
            placeholder="Email"
          />
          <div class="password-wrapper">
          <input
            id="password"
            class="input"
            type="password"
            name="new-password"
            autocomplete="new-password"
            placeholder="Password"
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
          Already have an account? <a id="login-link">Login</a>
        </span>
      </div>
    </div>

    <!-- Right Column: Illustration -->
    <div class="auth-right">
    </div>
  `;

  const form = container.querySelector("#signup-form");

  const signupButton = Button("Sign Up", {
    type: "primary",
    htmlType: "submit",
  });
  form.appendChild(signupButton);

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

    const username = container.querySelector("#username")?.value?.trim() || "";
    const email = container.querySelector("#email")?.value?.trim() || "";
    const password = container.querySelector("#password")?.value || "";

    if (!username || !email || !password) {
      showToast("All fields are required");
      return;
    }

    signupButton.setLoading(true);

    try {
      await signupUser({ username, email, password });
      showToast("Account created successfully", "success");
      navigate("/login");
    } catch (err) {
      showToast(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      signupButton.setLoading(false);
    }
  };

  container.querySelector("#login-link").onclick = () => navigate("/login");

  return container;
}
