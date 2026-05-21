export default async function handler(req, res) {
    try {
      const response = await fetch(
        "https://api.counterapi.dev/v2/dexxy-ajas-team-4193/lanyard-discord/up",
        {
          headers: {
            Authorization: `Bearer ${process.env.COUNTER_API_KEY}`,
          },
        }
      );
  
      const data = await response.json();
  
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        error: "Failed to update visitor count",
      });
    }
  }