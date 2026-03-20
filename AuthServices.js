import React from 'react'
import {Client, Account, ID, Databases} from 'appwrite'
import conf from '../Conf/conf';

export class AuthServices {
  client = new Client();
  account;
 
  constructor() {
    this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);    
    this.databases = new Databases(this.client);
  }

  async createAccount({email, password, name})  {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);

       await this.databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteUserCollectionId,
      ID.unique(),
      {
        userId: userAccount.$id,
        name,
        email,
        role: "user"   // default role
      }
    )

      if(userAccount) {
        return this.login({email, password})
      }else{
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({email, password}) {
    try {

  await this.account.deleteSessions();

      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      return await this .account.deleteSessions()
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
     // console.log("Appwrite Server : getCurrentUser : error", error);
      return null;
    }
  }
  
} 

const authService = new AuthServices()
export default authService