package dev.tunahan.twitter.Tweet;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import dev.tunahan.twitter.User.User;
import dev.tunahan.twitter.User.UserDto;
import dev.tunahan.twitter.User.UserRepository;

@Service
public class TweetService {

    @Autowired
    private TweetRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TweetRepository tweetRepository;

    public Tweet createTweet(UserDto from, String context) {
        Tweet tweet = repository.insert(new Tweet(from, context, LocalDateTime.now()));
        return tweet;
    }

    public List<TweetDto> fetchFeedTweetsForUser(String user_name) {
        User dbUser = userRepository.findByUserName(user_name);
        List<UserDto> followings = dbUser.getFollowings();

        UserDto dtoUser = new UserDto(dbUser.getUser_name(), dbUser.getProfile_name(), dbUser.getImage_url());

        if (followings != null) {
            followings.add(dtoUser);
        } else {
            followings = Arrays.asList(dtoUser);
        }

        List<Tweet> tweets = tweetRepository.findByFromInOrderByCreatedDateDesc(followings);

        List<TweetDto> dtoTweets = new ArrayList<TweetDto>();

        for (Tweet tweet : tweets) {

            System.out.println(tweet.getId());
            dtoTweets.add(new TweetDto(tweet.getId(), tweet.getFrom(), tweet.getContext(), tweet.getCreatedDate()));
        }
        return dtoTweets;

    }
}
