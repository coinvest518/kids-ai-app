import { Client, Account, Databases, ID } from "appwrite";



let client, account, databases;
if (typeof window !== 'undefined') {
  client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
  account = new Account(client);
  databases = new Databases(client);
}

export { client, account, databases, ID };
