import axios from "axios";

const N8N_WEBHOOK_URL =
  "https://pruthe.app.n8n.cloud/webhook/cdd310c1-cc2e-4112-bad5-d2070efbadd7";


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : req.body || {};

    const { firstName, lastName, phone, email, message } = body;

    if (!firstName || !lastName || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required form fields",
      });
    }

    const payload = {
      firstName,
      lastName,
      phone,
      email,
      message,
      submittedAt: new Date().toISOString(),
      source: "drsushree-contact-form",
    };

    const n8nResponse = await axios.post(N8N_WEBHOOK_URL, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 15000,
      validateStatus: () => true,
    });

    console.log("n8n status:", n8nResponse.status);
    console.log("n8n response:", n8nResponse.data);

    if (n8nResponse.status < 200 || n8nResponse.status >= 300) {
      return res.status(502).json({
        success: false,
        message: "n8n webhook failed",
        details:
          typeof n8nResponse.data === "string"
            ? n8nResponse.data
            : JSON.stringify(n8nResponse.data),
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("contact api error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while sending data",
      details: error.message,
    });
  }
}