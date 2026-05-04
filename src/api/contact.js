export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

    const { firstName, lastName, phone, email, message } = body;

    if (!firstName || !lastName || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required form fields",
      });
    }

    const n8nResponse = await fetch(
      "https://pruthe.app.n8n.cloud/webhook/b31572ee-6a3f-4b46-8f1c-eda3de345b35",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          email,
          message,
          submittedAt: new Date().toISOString(),
          source: "https://drsushree.studiosentientdemo.com",
        }),
      }
    );

    const n8nText = await n8nResponse.text();

    if (!n8nResponse.ok) {
      console.error("n8n error:", n8nResponse.status, n8nText);

      return res.status(500).json({
        success: false,
        message: "n8n webhook failed",
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
    });
  }
}