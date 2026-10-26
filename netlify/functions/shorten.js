
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { long_url } = JSON.parse(event.body || "{}");

    // Validate the submitted URL
    let parsedUrl;

    try {
      parsedUrl = new URL(long_url);

      if (
        !["http:", "https:"].includes(parsedUrl.protocol) ||
        !parsedUrl.hostname.includes(".")
      ) {
        throw new Error("Invalid URL");
      }
    } catch {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Please enter a valid URL" }),
      };
    }

    const token = process.env.BITLY_ACCESS_TOKEN;

    if (!token) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Bitly access token is not configured",
        }),
      };
    }

    // Send the URL to Bitly
    const response = await fetch(
      "https://api-ssl.bitly.com/v4/shorten",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          long_url: parsedUrl.href,
          domain: "bit.ly",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Bitly API error:", response.status, data);

      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: "Bitly could not shorten this URL. Check your account and try again.",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        originalUrl: parsedUrl.href,
        shortenedUrl: data.link,
      }),
    };
  } catch (error) {
    console.error("Shortener error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Something went wrong. Please try again.",
      }),
    };
  }
};
