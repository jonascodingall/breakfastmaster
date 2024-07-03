import { writable } from "svelte/store";
import { pb } from "./database";

// stores
export const currentUser = writable(pb.authStore.model)

// event listeners
pb.authStore.onChange((auth) => {
    console.log('authStore changed', auth)
    currentUser.set(pb.authStore.model)
})

//functions

/**
 * @param {any} username
 * @param {any} password
 */
export async function login(username, password) {
    try{
        await pb.collection('users').authWithPassword(username, password);
        return null
    }catch(err){
        return err
    }
}

/**
 * @param {any} username
 * @param {any} password
 * @param {any} email
 * @param {any} groupName
 */
export async function signUp(username, password, email, groupName) {
    try {
        const group = await pb.collection('groups').getFullList({
            filter: `name="${groupName}"`
        })
        
        if(group.length == 0){
            return {data:{message: "No Group Selected"}}
        }
        const data = {
            username,
            password,
            passwordConfirm: password,
            email,
            name: username,
            group_id: group[0].id
        };
        const createdUser = await pb.collection('users').create(data);
        console.log("bevcre login")
        const resp = await login(username, password);
        console.log("in try")
        console.log(resp)
        return resp
    } catch (err) {
        console.log("in cathc")
        console.log(err)
        return err
    }
}

export function signOut() {
    pb.authStore.clear();
}