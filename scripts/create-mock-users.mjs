// scripts/create-mock-users.js
// Run with: node scripts/create-mock-users.js

import { Client, Users, Databases, ID } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY); // You need to set this in your .env

const users = new Users(client);
const databases = new Databases(client);

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
    try {
      // Create user
      const createdUser = await users.create(ID.unique(), user.email, user.password, user.name);
      console.log(`Created user: ${user.name} (${createdUser.$id})`);
      // Add to Users collection for leaderboard
      await databases.createDocument(
        dbId,
        usersCollectionId,
        createdUser.$id,
        {
          username: user.name,
          xp: user.xp,
          level: user.level,
          badges: user.badges,
        }
      );
      console.log(`Added leaderboard doc for: ${user.name}`);
    } catch (err) {
      console.error(`Error for ${user.name}:`, err.message);
    }
  }
}

main();
