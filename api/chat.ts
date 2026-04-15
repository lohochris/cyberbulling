export default async function handler(req: any, res: any) {
  // Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { message, history } = req.body;

    const models = [
      "openai/gpt-3.5-turbo",
      "meta-llama/llama-3-8b-instruct"
    ];

    let lastError = "";

    for (const model of models) {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model,
            messages: [
              {
                role: "system",
                content: "You are Billy, an AI assistant specialized in cybersecurity and online safety. Provide clear, accurate, simple explanations."
              },
              ...history,
              { role: "user", content: message }
            ]
          })
        });

        const data = await response.json();

        if (!response.ok) {
          lastError = data?.error?.message || "Unknown error";
          continue;
        }

        return res.status(200).json({
          success: true,
          message: data?.choices?.[0]?.message?.content || "No response"
        });

      } catch (err: any) {
        lastError = err.message;
      }
    }

    return res.status(500).json({
      success: false,
      message: "AI service temporarily unavailable. Please try again."
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again."
    });
  }
}