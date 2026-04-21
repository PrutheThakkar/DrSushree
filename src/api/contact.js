export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { firstName, lastName, phone, email, message } = req.body;

  try {
    const response = await fetch(
      "https://pruthe.app.n8n.cloud/webhook-test/b31572ee-6a3f-4b46-8f1c-eda3de345b35",
      
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error("n8n response error:", errorText);
      return res.status(500).json({
        success: false,
        message: "n8n webhook failed",
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("n8n error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while sending data to n8n",
    });
  }
}