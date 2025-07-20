
// scripts/create-mock-users.cjs
// Run with: node scripts/create-mock-users.cjs

require('dotenv').config();
const sdk = require('node-appwrite');

const client = new sdk.Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const users = new sdk.Users(client);
const databases = new sdk.Databases(client);

const dbId = '687ce805001d6e9bc6c7';
const usersCollectionId = '687ce881002df232bfad';

const mockUsers = [
  { name: 'Alice', email: 'alice@example.com', password: 'password1', xp: 1000, level: 4, badges: ['Champion'] },
  { name: 'Bob', email: 'bob@example.com', password: 'password2', xp: 900, level: 4, badges: ['Starter'] },
  { name: 'Carol', email: 'carol@example.com', password: 'password3', xp: 800, level: 3, badges: ['Achiever'] },
  { name: 'Dave', email: 'dave@example.com', password: 'password4', xp: 700, level: 3, badges: ['Explorer'] },
  { name: 'Eve', email: 'eve@example.com', password: 'password5', xp: 600, level: 2, badges: ['Starter'] },
  { name: 'Frank', email: 'frank@example.com', password: 'password6', xp: 500, level: 2, badges: ['Achiever'] },
  { name: 'Grace', email: 'grace@example.com', password: 'password7', xp: 400, level: 1, badges: ['Explorer'] },
  { name: 'Heidi', email: 'heidi@example.com', password: 'password8', xp: 300, level: 1, badges: ['Starter'] },
];

async function main() {
  for (const user of mockUsers) {
    let userId;
    try {
      // Try to create user
      const createdUser = await users.create(
        sdk.ID.unique(),
        user.email,
        null, // phone
        user.password,
        user.name
      );
      userId = createdUser.$id;
      console.log(`Created user: ${user.name} (${userId})`);
    } catch (err) {
      // If user already exists, fetch their ID
      if (err.message && err.message.includes('already exists')) {
        try {
          const existing = await users.list([sdk.Query.equal('email', user.email)]);
          if (existing.total > 0) {
            userId = existing.users[0].$id;
            console.log(`User exists: ${user.name} (${userId})`);
          } else {
            console.error(`User exists but not found for: ${user.name}`);
            continue;
          }
        } catch (fetchErr) {
          console.error(`Error fetching existing user for ${user.name}:`, fetchErr.message);
          continue;
        }
      } else {
        console.error(`Error for ${user.name}:`, err.message);
        continue;
      }
    }
    // Add or update leaderboard doc
    try {
      await databases.createDocument(
        dbId,
        usersCollectionId,
        userId,
        {
          username: user.name,
          xp: user.xp,
          level: user.level,
          badges: user.badges,
        }
      );
      console.log(`Added leaderboard doc for: ${user.name}`);
    } catch (docErr) {
      if (docErr.message && docErr.message.includes('already exists')) {
        // Update existing document
        try {
          await databases.updateDocument(
            dbId,
            usersCollectionId,
            userId,
            {
              username: user.name,
              xp: user.xp,
              level: user.level,
              badges: user.badges,
            }
          );
          console.log(`Updated leaderboard doc for: ${user.name}`);
        } catch (updateErr) {
          console.error(`Error updating leaderboard doc for ${user.name}:`, updateErr.message);
        }
      } else {
        console.error(`Error for ${user.name} leaderboard doc:`, docErr.message);
      }
    }
  }
}

main();
