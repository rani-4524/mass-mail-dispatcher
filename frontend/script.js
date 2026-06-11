const mailForm = document.getElementById("mailForm");
const result = document.getElementById("result");

mailForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailsInput = document.getElementById("emails").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const emails = emailsInput.split(",").map(email => email.trim());

    if (emails.length === 0 || emails[0] === "") {
        result.innerText = "❌ Please enter at least one email!";
        return;
    }

    try {
        result.innerText = "⏳ Sending mails...";

        const response = await fetch("https://mass-mail-dispatcher-3e1y.onrender.com/api/send-mail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ emails, subject, message })
        });

        const data = await response.json();

        if (data.success) {
            result.innerText = "✅ " + data.message;
            mailForm.reset(); 
        } else {
            result.innerText = "❌ " + data.message;
        }

    } catch (error) {
        console.log(error);
        result.innerText = "❌ Backend not running! Please start server.";
    }
});
