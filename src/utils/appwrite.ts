import { Client, Account } from 'appwrite';

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('674716120012af20eefa');   

const account = new Account(client);

export { client, account };
