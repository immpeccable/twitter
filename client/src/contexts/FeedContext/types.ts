export interface I_PROFILE {
    image_url: string, 
    profile_name: string,
    user_name: string,

}

export interface I_POST {
    from: I_PROFILE,
    context: string,
    likes: number,
    retweets: number,
    mentions: number,
}

export interface I_FEED {
    of: I_PROFILE,
    posts: I_POST[],
}