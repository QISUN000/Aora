import { Account,Client,ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const appwriteConfig ={
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.organize.aora",
    projectId: "66b67e1d003a00aa3820",
    storageId: "66b69c5d00199c85c73a",
    databaseId: "66b694a70031b8bcede8",
    userCollectionId: "66b6951d000162a06ee4",
    videoCollectionId: "66b695600024a6e387ab",
}

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export async function createUser (email, password, username){
   try {
    const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
    );
    
    if(!newAccount) throw Error;
    
    const avatarUrl = avatars.getInitials(username)

    await signIn(email,password)

    const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        {
            accountid: newAccount.$id,
            email: email,
            username: username,
            avatar: avatarUrl,
        }
    )

    return newUser

   } catch (error) {
    console.log(error);
    throw new Error(error);
   } 

}

export const signIn = async(email, password)=>{
    try {
        const session = await account.createEmailSession(email,password)
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountid', currentAccount.$id)]
        )
        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}