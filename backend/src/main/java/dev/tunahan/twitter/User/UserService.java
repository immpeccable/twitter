package dev.tunahan.twitter.User;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import dev.tunahan.twitter.Tweet.Tweet;
import dev.tunahan.twitter.Tweet.TweetDto;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public User createUser(String profile_name, String user_name, String image_url, String password) {

        User user = repository.insert(new User(profile_name, user_name, image_url, password));
        return user;
    }

    public UserDto getUserByUsername(String user_name) {
        User user = repository.findByUserName(user_name);

        List<FollowerDto> followers = new ArrayList<FollowerDto>();
        List<FollowerDto> followings = new ArrayList<FollowerDto>();
        List<TweetDto> tweets = new ArrayList<TweetDto>();

        for (UserDto follower : user.getFollowers()) {
            followers.add(
                    new FollowerDto(follower.getUser_name(), follower.getProfile_name(),
                            follower.getImage_url()));
        }
        for (UserDto following : user.getFollowings()) {
            followings.add(new FollowerDto(following.getUser_name(),
                    following.getProfile_name(),
                    following.getImage_url()));
        }
        return new UserDto(user.getUser_name(), user.getProfile_name(),
                user.getImage_url(), followers, followings);
    }

    public List<TweetDto> getLikes(String user_name) {
        User user = repository.findByUserName(user_name);
        List<TweetDto> likes = new ArrayList<TweetDto>();

        for (TweetDto like : user.getLikes()) {
            likes.add(new TweetDto(like.getContext(), like.getCreatedDate()));
        }
        return likes;

    }

    public List<TweetDto> getTweets(String user_name) {
        User user = repository.findByUserName(user_name);
        List<TweetDto> tweets = new ArrayList<TweetDto>();

        for (TweetDto like : user.getTweets()) {
            tweets.add(new TweetDto(like.getContext(), like.getCreatedDate()));
        }
        Collections.reverse(tweets);
        return tweets;

    }

    public User findDbUser(String user_name) {
        return repository.findByUserName(user_name);
    }

    public List<UserDto> exploreUsers(String name) {
        try {
            List<User> users = repository.findByUsernameContainingIgnoreCase(name);
            List<UserDto> rUsers = new ArrayList<UserDto>();
            for (User user : users) {
                rUsers.add(new UserDto(user.getUser_name(), user.getProfile_name(), user.getImage_url()));
            }
            return rUsers;
        } catch (Exception e) {
            System.out.println("exception is " + e);
            return Arrays.asList();
        }

    }

    public List<User> follow(String fromUsername, String toUsername) {
        User from = repository.findByUserName(fromUsername);
        User to = repository.findByUserName(toUsername);

        UserDto fromDto = new UserDto(from.getUser_name(), from.getProfile_name(), from.getImage_url());
        UserDto toDto = new UserDto(to.getUser_name(), to.getProfile_name(), to.getImage_url());

        if (from.getFollowings() == null) {
            from.setFollowings(
                    Arrays.asList(toDto));
        } else {
            from.getFollowings().add(toDto);

        }
        if (to.getFollowers() == null) {
            to.setFollowers(Arrays.asList(fromDto));
        } else {

            to.getFollowers().add(fromDto);
        }

        repository.save(from);
        repository.save(to);

        return new ArrayList<User>(Arrays.asList(from, to));
    }
}
