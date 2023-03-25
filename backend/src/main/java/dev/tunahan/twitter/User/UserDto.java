package dev.tunahan.twitter.User;

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
    private List<FollowerDto> followers;
    private List<FollowerDto> followings;
    private List<TweetDto> tweets;
    private String token;

    public UserDto(String user_name, String profile_name, String image_url) {
        this.user_name = user_name;
        this.profile_name = profile_name;
        this.image_url = image_url;
    }

    public UserDto(String user_name, String profile_name, String image_url, List<FollowerDto> followers,
            List<FollowerDto> followings, List<TweetDto> tweets) {
        this.user_name = user_name;
        this.profile_name = profile_name;
        this.image_url = image_url;
        this.followers = followers;
        this.followings = followings;
        this.tweets = tweets;
    }
    // getters and setters
}