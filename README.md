# 🍔 FoodDash - Premium Food Delivery Platform

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=black&style=flat-square)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white&style=flat-square)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12.6.0-FFCA28?logo=firebase&logoColor=black&style=flat-square)](https://firebase.google.com/)
[![Axios](https://img.shields.io/badge/Axios-1.6.2-5A29E4?logo=axios&logoColor=white&style=flat-square)](https://axios-http.com/)

Welcome to **FoodDash**, a premium, highly responsive frontend web application built for next-generation online food ordering. Featuring elegant design aesthetics, smooth micro-animations, and complete authentication workflows, it is designed to deliver a visually stunning and robust user experience.

---

## 🚀 Key Features

*   **Modern Landing Page**: Dynamic, responsive layout showcasing:
    *   **Hero Visuals**: Engaging banner featuring curated food assets.
    *   **Interactive Sections**: "How It Works", "App Download" mockup previews, and "Your Time" value propositions.
    *   **Minimal Header & Footer**: Modern collapsed navbar drawer and structured collapsible links.
*   **Authentication Suite**: Complete, pre-configured user flows:
    *   **User Login**: Credentials verification with error messaging.
    *   **User Registration**: Multi-step registration.
    *   **One-Time Password (OTP)**: Verify transactions or credentials securely.
    *   **Email Verification**: Verify user accounts via email link tokens.
    *   **Password Recovery**: "Forgot Password" requesting and "Reset Password" confirmation interfaces.

---

## 🛠️ Tech Stack & Dependencies

The frontend application uses a carefully selected, modern tech stack designed for speed, styling modularity, and smooth state transitions.

| Technology | Purpose | Key Details |
| :--- | :--- | :--- |
| **React 18** | UI Framework | Component-based development, state hooks, and side-effects. |
| **Vite 5** | Build Tool | Lightning-fast Hot Module Replacement (HMR) and optimized build bundling. |
| **Tailwind CSS v4** | Style Engine | Modular styling, theme utility configuration, and responsive layouts. |
| **React Router v6** | Routing | Declarative routes, auth page protection, and fallback redirects. |
| **Firebase SDK** | Analytics & Auth | Pre-wired integration for cloud authentication and application analytics. |
| **Axios** | API client | Promise-based HTTP client pre-configured with intercepters and auth headers. |

---

## 📁 Project Architecture & Directory Structure

The codebase is organized into clean, modular directory boundaries to keep services, contexts, UI components, and styles isolated.

```directory
Foody/
└── frontend/
    ├── public/                  # Static assets served at the root (Vite)
    │   ├── app-mockup.png       # App download mockup visual
    │   ├── hero-food.png        # Landing page hero food visual
    │   └── assets/              # Additional static assets
    ├── src/
    │   ├── components/
    │   │   ├── layout/          # Navigation, Headers, and Footers (MinimalNavbar, Footer, etc.)
    │   │   ├── sections/        # Modular page blocks (Hero, HowItWorks, AppDownload, YourTime)
    │   │   └── ui/              # Reusable UI component library (Buttons, Alerts, Modals, Cards, etc.)
    │   ├── context/             # Global state management contexts
    │   │   ├── AuthContext.jsx  # User identity, logins, registrations
    │   │   ├── CartContext.jsx  # Shopping cart status, adding, removing, and totals
    │   │   └── ToastContext.jsx # Global alert notifications system
    │   ├── layouts/             # Page shell structures (RootLayout)
    │   ├── pages/               # Routed pages and sub-modules
    │   │   ├── auth/            # Authenticated user flows (Login, Register, OTP, Password Reset)
    │   │   └── Home.jsx         # Landing page container
    │   ├── routes/              # Routing definitions (AppRoutes.jsx)
    │   ├── services/            # API services mapping backend operations
    │   │   ├── api.js           # Main Axios config (Interceptors, base url, auth headers)
    │   │   └── authService.js   # Service functions for login, register, reset password
    │   ├── styles/              # Global and component stylesheets
    │   ├── utils/               # General utility helpers
    │   ├── App.jsx              # Main App wrapper with context providers
    │   └── main.jsx             # React entry mount point
    ├── .env.example             # Template for API endpoint environment setup
    ├── package.json             # Scripts & dependency definitions
    └── vite.config.js           # Vite development and bundle configuration
```

---

## 🧩 State Management & Contexts

Global state is managed using lightweight, reactive React Context Providers wrapped at the root in [App.jsx](file:///e:/Download/My%20Projects/Full%20Stack%28Web%29/Foody/frontend/src/App.jsx):

1.  **`AuthContext`** ([AuthContext.jsx](file:///e:/Download/My%20Projects/Full%20Stack%28Web%29/Foody/frontend/src/context/AuthContext.jsx))
    *   Tracks whether the user is logged in (`isAuthenticated`) and stores the current user object (`user`).
    *   Exposes function methods for registration, login, logout, and token validation.
2.  **`CartContext`** ([CartContext.jsx](file:///e:/Download/My%20Projects/Full%20Stack%28Web%29/Foody/frontend/src/context/CartContext.jsx))
    *   Maintains lists of selected items, quantities, and delivery configurations.
    *   Handles local calculations for subtotals, VAT, delivery costs, and checkout payloads.
3.  **`ToastContext`** ([ToastContext.jsx](file:///e:/Download/My%20Projects/Full%20Stack%28Web%29/Foody/frontend/src/context/ToastContext.jsx))
    *   Provides trigger methods to fire alert toasts (success, warning, error) with customizable durations.

---

## 🌐 API Integrations & Services

Network requests are centralized inside the `src/services/` directory.

*   **Axios Configuration** ([api.js](file:///e:/Download/My%20Projects/Full%20Stack%28Web%29/Foody/frontend/src/services/api.js)):
    *   Automatically pulls `VITE_API_BASE_URL` from environment files.
    *   Attaches authorization tokens (`Bearer <token>`) automatically from storage to request headers.
    *   Intercepts responses to handle session expirations or server failures.
*   **Service Files**:
    *   `authService.js`: Account management operations.
    *   `cartService.js`: Syncing shopping cart updates to backend storage.
    *   `menuService.js`: Fetching dishes, restaurant listings, and categories.
    *   `orderService.js`: Dispatching orders, tracking logs, and active status checks.
    *   `paymentService.js`: Processing checkouts and invoice transactions.

---

## ⚙️ Getting Started & Local Setup

### Prerequisites
*   [Node.js](https://nodejs.org/) (version 18 or higher recommended)
*   [npm](https://www.npmjs.com/) (installed automatically with Node.js)

### Installation Steps

1.  **Navigate into the frontend project directory**:
    ```bash
    cd frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure environment variables**:
    Duplicate the `.env.example` file and rename it to `.env`:
    ```bash
    cp .env.example .env
    ```
    Open `.env` and verify the backend API address matches your local environment:
    ```env
    VITE_API_BASE_URL=http://localhost:8000/api
    ```

4.  **Run the application locally**:
    ```bash
    npm run dev
    ```
    This launches the Vite development server. Open the local address printed in the terminal (usually `http://localhost:5173/`) in your browser.

5.  **Build production package**:
    ```bash
    npm run build
    ```
    This compiles files and packs them into the `dist/` directory, optimized for deployment.

---

## 📤 Manual Git & GitHub Pushing Instructions

If you have a GitHub repository created and are ready to push the cleaned-up code, execute the following commands in your terminal inside the `frontend` folder:

1.  **Initialize local Git repository**:
    ```bash
    git init
    ```

2.  **Configure your Git credentials (locally)**:
    Replace with your actual GitHub username and email address:
    ```bash
    git config user.name "Your Name"
    git config user.email "your.email@example.com"
    ```

3.  **Stage all changes**:
    ```bash
    git add .
    ```

4.  **Create the initial commit**:
    ```bash
    git commit -m "Initial commit: Set up landing page and authentication suite"
    ```

5.  **Set main as your primary branch**:
    ```bash
    git branch -M main
    ```

6.  **Add your remote GitHub repository URL**:
    Replace `YOUR_GITHUB_REPO_URL` with your actual repository link (e.g., `https://github.com/username/foody.git`):
    ```bash
    git remote add origin YOUR_GITHUB_REPO_URL
    ```

7.  **Push the code to GitHub**:
    ```bash
    git push -u origin main
    ```
