package dev.tunahan.twitter.Tweet;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TimeZone;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.DateOperators.DateOperatorFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.tunahan.twitter.User.User;
import dev.tunahan.twitter.User.UserDto;
import dev.tunahan.twitter.User.UserRepository;
import dev.tunahan.twitter.User.UserService;
import dev.tunahan.twitter.config.UserAuthenticationProvider;

@RestController
@RequestMapping
public class TweetController {

    @Autowired
    private TweetService tweetService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TweetRepository tweetRepository;

    private UserAuthenticationProvider userAuthenticationProvider;

    public TweetController(TweetService tweetService,
            UserAuthenticationProvider userAuthenticationProvider) {
        this.tweetService = tweetService;
        this.userAuthenticationProvider = userAuthenticationProvider;
    }

    @PostMapping("/create-tweet")
    public ResponseEntity<TweetDto> postTweet(@RequestBody Map<String, String> payload,
            @RequestHeader("Authorization") String authorization) {
        String[] authElements = authorization.split(" ");
        String user_name = userAuthenticationProvider.getJWTUser(authElements[1]);
        User dbUser = userRepository.findByUserName(user_name);
        UserDto fromDto = new UserDto(dbUser.getUser_name(), dbUser.getProfile_name(), dbUser.getImage_url());
        Tweet newTweet = tweetService.createTweet(fromDto, payload.get("context"));

        TweetDto newTweetDto = new TweetDto(newTweet.getId(), newTweet.getId().toString(), fromDto,
                newTweet.getContext(),
                newTweet.getCreatedDate());
        if (dbUser.getTweets() != null) {
            dbUser.getTweets().add(newTweetDto);
        } else {
            dbUser.setTweets(Arrays.asList(newTweetDto));
        }

        userRepository.save(dbUser);

        return new ResponseEntity<TweetDto>(newTweetDto, HttpStatus.OK);
    }

    @PostMapping("tweet/{id}/like")
    public ResponseEntity<Optional<Tweet>> likeTweet(@RequestHeader("Authorization") String authorization,
            @PathVariable("id") String tweetId) {
        System.out.println("tweet id: " + tweetId);
        String[] authElements = authorization.split(" ");
        String user_name = userAuthenticationProvider.getJWTUser(authElements[1]);
        User user = userRepository.findByUserName(user_name);
        ObjectId id = new ObjectId(tweetId);
        System.out.println("object id: " + id);
        Optional<Tweet> tweetOptional = tweetService.findTweetById(id);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Connection", "close");

        if (tweetOptional.isPresent()) {
            System.out.println("tweet is found");
            Tweet tweet = tweetOptional.get();

            UserDto liker = new UserDto(user.getUser_name(), user.getProfile_name(), user.getImage_url());
            TweetDto tweetDto = new TweetDto(tweet.getId(), tweet.getId().toString(), liker, tweet.getContext(),
                    tweet.getCreatedDate());

            tweet.getLikes().add(liker);
            user.getLikes().add(tweetDto);

            userRepository.save(user);
            tweetRepository.save(tweet);

            return new ResponseEntity<Optional<Tweet>>(tweetOptional, headers, HttpStatus.OK);
        } else {
            System.out.println("tweet is not found");
            return new ResponseEntity<Optional<Tweet>>(null, headers, HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/feed")
    public ResponseEntity<List<TweetDto>> getFeed(@RequestHeader("Authorization") String authorization,
            @RequestParam(required = false, defaultValue = "0") Long cursor) {

        LocalDateTime dateCursor;
        if (cursor == 0) {
            dateCursor = LocalDateTime.now();
        } else {
            Instant instant = Instant.ofEpochSecond(cursor);
            dateCursor = instant.atZone(ZoneId.systemDefault()).toLocalDateTime();
        }

        String[] authElements = authorization.split(" ");
        String user_name = userAuthenticationProvider.getJWTUser(authElements[1]);
        List<TweetDto> tweets = tweetService.fetchFeedTweetsForUser(user_name, dateCursor);
        System.out.println("tweets is equal to: " + tweets);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Connection", "close");
        return new ResponseEntity<List<TweetDto>>(tweets, headers, HttpStatus.OK);
    }

}
