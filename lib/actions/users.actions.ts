'user server';

import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite";

export const signIn = async ()=>{

}
export const signUp = async (useData: SignUpParams)=>{
    try{
        const {account} = await createAdminClient();

        await account.create(ID.unique(), email, password, name);
        const session = await account.
        createEmailPasswordSession(email, password);

        cookies().set("my-custom-session", session.secret, {
            path:"/",
            httpOnly: true,
            sameSite:
        })
    } catch(error){
        console.error('Error', error);
    }
}

// ... your initialization functions

export async function getLoggerInUser() {
    try{
        const { account } = await createSessionClient();
        return await account.get();
    }catch (error){
        return null;
    }
}