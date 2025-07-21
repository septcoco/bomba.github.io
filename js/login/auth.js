async function sha256(str) {
  const msgBuffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

const correctHash =
  "f21422b8132869d93946efa33085637491db338d569c987e41cc0b81634502aa";

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

async function checkPassword() {
  const input = document.getElementById("passwordInput").value;
  const inputHash = await sha256(input);

  if (inputHash === correctHash) {
    setCookie("auth", "true", 7);
    window.location.href = "loggedin.html";
  } else {
    alert("Incorrect password");
  }
}

document
  .getElementById("passwordInput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      checkPassword();
    }
  });
