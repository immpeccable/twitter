package dev.tunahan.twitter.User;

import java.util.ArrayList;
import java.util.List;

import dev.tunahan.twitter.Tweet.TweetDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private String user_name;
    private String profile_name;
    private String image_url;
    private List<FollowerDto> followers = new ArrayList<FollowerDto>();
    private List<FollowerDto> followings = new ArrayList<FollowerDto>();
    private List<TweetDto> tweets = new ArrayList<TweetDto>();
    private List<TweetDto> likes = new ArrayList<TweetDto>();
    private List<TweetDto> retweets = new ArrayList<TweetDto>();
    private List<TweetDto> replies = new ArrayList<TweetDto>();
    private String token;

    public UserDto(String user_name, String profile_name, String image_url) {
        this.user_name = user_name;
        this.profile_name = profile_name;
        this.image_url = image_url;
    }

    public UserDto(String user_name, String profile_name, String image_url, List<FollowerDto> followers,
            List<FollowerDto> followings) {
        this.user_name = user_name;
        this.profile_name = profile_name;
        this.image_url = image_url;
        this.followers = followers;
        this.followings = followings;
    }

    public UserDto(String user_name, String profile_name, String image_url, List<FollowerDto> followers,
            List<FollowerDto> followings, List<TweetDto> tweets, List<TweetDto> likes) {
        this.user_name = user_name;
        this.profile_name = profile_name;
        this.image_url = image_url;
        this.followers = followers;
        this.followings = followings;
        this.tweets = tweets;
        this.likes = likes;
    }
    // getters and setters
}