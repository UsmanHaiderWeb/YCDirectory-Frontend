import axios from 'axios'

export const api = axios.create({baseURL: 'https://ycdirectory-backend.vercel.app/api'});

export async function CreateUser (clerkID: string) {
    let { data } = await api.post('/user/create', {clerkID});
    return data;
};


export async function likeThisBlog ({clerkID, blogID, token}: {clerkID: string, blogID: string, token: string}) {
    let { data } = await api.post(`/blog/like?clerkId=${clerkID}&token=${token}`, { blogID });
    return data;
};

export async function unlikeThisBlog ({clerkID, blogID, token}: {clerkID: string, blogID: string, token: string}) {
    let { data } = await api.post(`/blog/unlike?clerkId=${clerkID}&token=${token}`, { blogID });
    return data;
};


export async function saveThisBlog ({clerkID, blogID, token}: {clerkID: string, blogID: string, token: string}) {
    let { data } = await api.post(`/blog/save?clerkId=${clerkID}&token=${token}`, { blogID });
    return data;
};

export async function unsaveThisBlog ({clerkID, blogID, token}: {clerkID: string, blogID: string, token: string}) {
    let { data } = await api.post(`/blog/unsave?clerkId=${clerkID}&token=${token}`, { blogID });
    return data;
};


export async function likeThisCreator ({clerkID, creatorID, token}: {clerkID: string, creatorID: string, token: string}) {
    let { data } = await api.post(`/creator/like?clerkId=${clerkID}&token=${token}`, { creatorID });
    return data;
};


export async function unlikeThisCreator ({clerkID, creatorID, token}: {clerkID: string, creatorID: string, token: string}) {
    let { data } = await api.post(`/creator/unlike?clerkId=${clerkID}&token=${token}`, { creatorID });
    return data;
};