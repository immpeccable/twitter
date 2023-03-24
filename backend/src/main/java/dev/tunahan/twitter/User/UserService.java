package dev.tunahan.twitter.User;

import java.util.ArrayList;
import java.util.Arrays;
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

    public User logUser(String user_name) {
        List<Criteria> criterias = new ArrayList<Criteria>();
        Query query = new Query();
        if (user_name != null && !user_name.isEmpty()) {
            criterias.add(Criteria.where("user_name").is(user_name));
        }
        query.addCriteria(new Criteria().andOperator(criterias.toArray(new Criteria[criterias.size()])));
        User user = mongoTemplate.findOne(query, User.class);
        return user;
    }

    public UserDto getUserByUsername(String user_name) {
        User user = repository.findByUserName(user_name);

        List<FollowerDto> followers = new ArrayList<FollowerDto>();
        List<FollowerDto> followings = new ArrayList<FollowerDto>();
        List<TweetDto> tweets = new ArrayList<TweetDto>();

        if (user.getFollowers() != null) {
            for (User follower : user.getFollowers()) {
                followers.add(
                        new FollowerDto(follower.getUser_name(), follower.getProfile_name(),
                                follower.getImage_url()));
            }
        }
        if (user.getFollowings() != null) {
            for (User following : user.getFollowings()) {
                followings.add(new FollowerDto(following.getUser_name(),
                        following.getProfile_name(),
                        following.getImage_url()));
            }
        }
        if (user.getTweets() != null) {
            for (Tweet tweet : user.getTweets()) {
                tweets.add(new TweetDto(tweet.getContext()));
            }
        }
        System.out.println("service result: " + followers.size() + " " +
                followings.size());
        return new UserDto(user.getUser_name(), user.getProfile_name(),
                user.getImage_url(), followers, followings,
                tweets);
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

        if (from.getFollowings() == null) {
            from.setFollowings(Arrays.asList(to));
        } else {
            from.getFollowings().add(to);

        }
        if (to.getFollowers() == null) {
            to.setFollowers(Arrays.asList(from));
        } else {

            to.getFollowers().add(from);
        }

        repository.save(from);
        repository.save(to);

        return new ArrayList<User>(Arrays.asList(from, to));
    }
}
