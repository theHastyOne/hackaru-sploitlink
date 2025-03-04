import loginHTML from "./login.html";
import appHTML from "./app.html";
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
    return loginHTML;
  }
  
  function getAppPage() {
    return appHTML;
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
