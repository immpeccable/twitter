package dev.tunahan.twitter.User;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import dev.tunahan.twitter.Tweet.Tweet;
import dev.tunahan.twitter.Tweet.TweetDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private ObjectId id;

    User(String profile_name, String user_name, String image_url, String password) {
        this.profile_name = profile_name;
        this.user_name = user_name;
        this.password = password;
        this.image_url = image_url;
    }

    User(String profile_name, String user_name, String image_url, String password, String token) {
        this.profile_name = profile_name;
        this.user_name = user_name;
        this.password = password;
        this.image_url = image_url;
        this.token = token;
    }

    private String profile_name;
    private String user_name;
    private String image_url;
    private String password;
    private String token;

    private List<UserDto> followers = new ArrayList<UserDto>();

    private List<UserDto> followings = new ArrayList<UserDto>();;

    private List<TweetDto> tweets = new ArrayList<TweetDto>();
    private List<TweetDto> likes = new ArrayList<TweetDto>();;
    private List<TweetDto> retweets = new ArrayList<TweetDto>();;
    private List<TweetDto> replies = new ArrayList<TweetDto>();;
}
