export default async () => {
  try {
    const response = await fetch(
      "https://opensky-network.org/api/states/all"
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Flight data unavailable" }),
        {
          status: 502,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=15"
      }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Could not fetch flight data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
