export default {
    async fetch(request, env) {
      const url = new URL(request.url);
      
      if (url.pathname.endsWith('/login') && request.method === 'POST') {
        return handleLogin(request, env);
      }
      
      if (url.pathname.endsWith('/reset-password') && request.method === 'POST') {
        return handlePasswordReset(request, env);
      }
      
      if (url.pathname.endsWith('/app')) {
        return new Response(getAppPage(), { headers: { 'Content-Type': 'text/html' } });
      }


      return new Response(getLoginPage(), { headers: { 'Content-Type': 'text/html' } });

    },
  };
  
  function getLoginPage() {
    return `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hackaru - Login</title>
    <style>
        /* General Reset */
        * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        }
        /* Background */
        body {
        font-family: 'Inter', sans-serif;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background: linear-gradient(135deg, #2c3e50, #4ca1af);
        color: #fff;
        }
        a {
        color: #d2d2d2;  /* Default text color */
        text-decoration: none; /* Removes underline */
        }
        /* Hover effect */
        a:hover {
        color: #ffffff;  /* Darker shade */
        text-decoration: underline;
        }
        /* Main Content Wrapper */
        .container {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        }
        /* Form Container */
        .login-container {
        background: rgba(255, 255, 255, 0.1);
        padding: 2rem;
        border-radius: 12px;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
        width: 100%;
        max-width: 320px;
        }

        /* Inputs */
        input {
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        border: none;
        border-radius: 6px;
        font-size: 1rem;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        outline: none;
        }

        input::placeholder {
        color: rgba(255, 255, 255, 0.7);
        }

        /* Button */
        button {
        width: 100%;
        padding: 10px;
        margin-top: 10px;
        border: none;
        border-radius: 6px;
        font-size: 1rem;
        background: #4ca1af;
        color: white;
        cursor: pointer;
        transition: 0.3s;
        }

        button:hover {
        background: #357a80;
        }

        /* Footer Styles */
        footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        background: rgba(0, 0, 0, 0.2);
        color: #fff;
        font-size: 0.9rem;
        text-align: center;
        }

        .footer-left, .footer-center, .footer-right {
        flex: 1;
        }

        .footer-left {
        text-align: left;
        }

        .footer-center {
        text-align: center;
        }

        .footer-right {
        text-align: right;
        }

        /* Responsive Footer */
        @media (max-width: 600px) {
        footer {
        flex-direction: column;
        text-align: center;
        gap: 5px;
        }
        .footer-left, .footer-center, .footer-right {
        text-align: center;
        }
        }
    </style>
    </head>
    <body>
        <div class="container">
            <div class="login-container">
                <h1>Login - Hackaru</h1>
                <form id="loginForm">
                    <input type="text" id="username" placeholder="Username" required>
                    <input type="password" id="password" placeholder="Password" required>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
        <footer>
            <div class="footer-left"><a href="https://github.com/theHastyOne/hackaru-sploitlink">GitHub - theHastyOne</a></div>
            <div class="footer-center"><a href="https://aaronhasty.com">AaronHasty.com &copy2025</a></div>
            <div class="footer-right"><a href="https://samcurry.net/hacking-subaru">Hacking Subaru</a></div>
        </footer>
        <script>
          async function login(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const response = await fetch('/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, password })
            });
            const result = await response.json();
            if (result.success) {
              window.location.href = '/app';
            } else {
              alert('Invalid credentials');
            }
          }
          document.getElementById('loginForm').addEventListener('submit', login);
          function resetPasswordWithoutLogin(username, newPassword) {
            fetch('/reset-password', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, newPassword })
            }).then(() => alert('Password reset successful!'));
          }
        </script>
      </body>
      </html>
    `;
  }
  
  function getAppPage() {
    return `
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>App</title>
  <style>
    /* General Reset */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* Background */
    body {
      font-family: 'Inter', sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(135deg, #2c3e50, #4ca1af);
      color: #fff;
      position: relative;
    }
    a {
      color: #d2d2d2;  /* Default text color */
      text-decoration: none; /* Removes underline */
    }
    /* Hover effect */
    a:hover {
      color: #ffffff;  /* Darker shade */
      text-decoration: underline;
    }
    /* Main Content */
    .app-content {
      flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    /* MFA Overlay */
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex; /* Ensures it appears on load */
      justify-content: center;
      align-items: center;
    }

    /* MFA Modal */
    .mfa-modal {
      background: rgba(255, 255, 255, 0.1);
      padding: 2rem;
      border-radius: 12px;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      width: 100%;
      max-width: 320px;
    }

    .mfa-modal input {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      outline: none;
      text-align: center;
    }

    .mfa-modal input::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }

    /* Button */
    button {
      width: 100%;
      padding: 10px;
      margin-top: 10px;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      background: #4ca1af;
      color: white;
      cursor: pointer;
      transition: 0.3s;
    }

    button:hover {
      background: #357a80;
    }

    /* Hide Modal after Verification */
    .hidden {
      display: none !important;
    }
    /* Footer Styles */
    footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    font-size: 0.9rem;
    text-align: center;
    }

    .footer-left, .footer-center, .footer-right {
    flex: 1;
    }

    .footer-left {
    text-align: left;
    }

    .footer-center {
    text-align: center;
    }

    .footer-right {
    text-align: right;
    }

    /* Responsive Footer */
    @media (max-width: 600px) {
    footer {
    flex-direction: column;
    text-align: center;
    gap: 5px;
    }
    .footer-left, .footer-center, .footer-right {
    text-align: center;
    }
}
  </style>
</head>
<body>
  <div class="app-content">
    <h1>Welcome to the App</h1>
    <button onclick="triggerConfetti()">Click here for full control</button>
  </div>

  <!-- MFA Overlay (Visible on Page Load) -->
  <div class="overlay" id="mfaOverlay">
    <div class="mfa-modal">
      <h2>MFA Required</h2>
      <p>Enter your verification code:</p>
      <input type="text" id="mfaCode" placeholder="123456" required>
      <button onclick="verifyMFA()">Submit</button>
    </div>
  </div>
    <footer>
        <div class="footer-left"><a href="https://github.com/theHastyOne/hackaru-sploitlink">GitHub - theHastyOne</a></div>
        <div class="footer-center"><a href="https://aaronhasty.com">AaronHasty.com &copy2025</a></div>
        <div class="footer-right"><a href="https://samcurry.net/hacking-subaru">Hacking Subaru</a></div>
    </footer>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js"></script>
  <script>
    function triggerConfetti() {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.5 }
      });
    }
  </script>
  <script>
    window.onload = function() {
      document.getElementById("mfaOverlay").classList.remove("hidden"); // Ensures the modal is visible
    };

    function verifyMFA() {
      let code = document.getElementById("mfaCode").value;
      if (code === "YOU WILL NEVER GUESS THIS CAUSE IT WOULD USE A REAL MFA SYSTEM") { // Example: Replace with actual validation logic
        alert('✅ MFA Verified!');
        document.getElementById("mfaOverlay").classList.add("hidden"); // Hide modal after verification
      } else {
        alert('❌ Invalid Code!');
      }
    }
  </script>
</body>
</html> `;
  }
  
  async function handleLogin(request, env) {
    const formData = await request.json();
    const storedPassword = await env.KV.get(`user:${formData.username}`);
    
    if (storedPassword && storedPassword === formData.password) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ success: false, error: 'Invalid credentials' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  async function handlePasswordReset(request, env) {
    const formData = await request.json();
  
    // Check if the user exists in KV store
    const user = await env.KV.get(`user:${formData.username}`);
  
    // If the user does not exist, return an error
    if (!user) {
      return new Response(JSON.stringify({ success: false, message: "User not found" }), {
        headers: { 'Content-Type': 'application/json' },
        status: 404, // Not Found
      });
    }
  
    // If the user exists, update the password
    await env.KV.put(`user:${formData.username}`, formData.newPassword);
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
