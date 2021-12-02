const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const loginUsername = document.getElementById("login-username");
  const loginPassword = document.getElementById("login-password");

  const res = await fetch("/api/login", {
    headers: {
      "Content-Type": "json/application",
    },
    body: JSON.stringify({
      email: loginUsername,
      password: loginPassword,
    }),
  }).then((res) => {
    res.json();
  });
  console.log(res);
});
