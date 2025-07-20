// src/pages/api/admin.js
import { Client, Databases } from 'appwrite';

export default async function handler(req, res) {
  // Only allow GET for listing all onboarding/progress
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const databases = new Databases(client);

  try {
    // List all onboarding documents
    const onboarding = await databases.listDocuments('user_data', 'onboarding');
    // List all progress documents (if you create a 'progress' collection)
    // const progress = await databases.listDocuments('user_data', 'progress');
    res.status(200).json({ onboarding: onboarding.documents });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
