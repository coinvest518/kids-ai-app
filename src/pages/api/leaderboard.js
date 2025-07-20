// src/pages/api/leaderboard.js
import { Client, Databases } from 'appwrite';

export default async function handler(req, res) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  const databases = new Databases(client);

  if (req.method === 'GET') {
    // Get top 20 users by XP from the 'users' collection
    try {
      const dbId = '687ce805001d6e9bc6c7'; // Your database ID
      const collectionId = '687ce881002df232bfad'; // Users collection ID
      const result = await databases.listDocuments(dbId, collectionId);
      // Sort and limit client-side
      const sorted = (result.documents || []).sort((a, b) => (b.xp || 0) - (a.xp || 0)).slice(0, 20);
      res.status(200).json({ leaderboard: sorted });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
