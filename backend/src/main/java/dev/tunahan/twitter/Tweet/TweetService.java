package dev.tunahan.twitter.Tweet;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.apache.tomcat.util.json.JSONParser;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

    public Optional<Tweet> findTweetById(ObjectId id) {
        Optional<Tweet> tweet = tweetRepository.findById(id);
        return tweet;
    }

    public List<TweetDto> fetchFeedTweetsForUser(String user_name, LocalDateTime cursor) {
        User dbUser = userRepository.findByUserName(user_name);
        List<UserDto> followings = dbUser.getFollowings();

        UserDto dtoUser = new UserDto(dbUser.getUser_name(), dbUser.getProfile_name(), dbUser.getImage_url());

        followings.add(dtoUser);

        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by("createdDate").descending());
        List<Tweet> tweets = tweetRepository.getFeedFromDatabase(cursor,
                followings, pageRequest);

        List<TweetDto> dtoTweets = new ArrayList<TweetDto>();

        for (Tweet tweet : tweets) {
            dtoTweets.add(new TweetDto(tweet.getId(), tweet.getId().toString(),
                    new UserDto(tweet.getFrom().getUser_name(), tweet.getFrom().getProfile_name(),
                            tweet.getFrom().getImage_url()),
                    tweet.getContext(),
                    tweet.getCreatedDate()));
        }
        return dtoTweets;

    }
}
