import { pb } from "./database";

export async function getAllGroups(){
    return await pb.collection('groups').getFullList()
}