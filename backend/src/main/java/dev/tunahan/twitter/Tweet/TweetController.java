package dev.tunahan.twitter.Tweet;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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

        TweetDto newTweetDto = new TweetDto(newTweet.getId(), fromDto, newTweet.getContext(),
                newTweet.getCreatedDate());
        if (dbUser.getTweets() != null) {
            dbUser.getTweets().add(newTweetDto);
        } else {
            dbUser.setTweets(Arrays.asList(newTweetDto));
        }

        userRepository.save(dbUser);

        return new ResponseEntity<TweetDto>(newTweetDto, HttpStatus.OK);
    }

    @GetMapping("/feed")
    public ResponseEntity<List<TweetDto>> getFeed(@RequestHeader("Authorization") String authorization,
            @RequestParam String cursor) {
        System.out.println();
        String[] authElements = authorization.split(" ");
        String user_name = userAuthenticationProvider.getJWTUser(authElements[1]);
        List<TweetDto> tweets = tweetService.fetchFeedTweetsForUser(user_name);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Connection", "close");
        return new ResponseEntity<List<TweetDto>>(tweets, headers, HttpStatus.OK);
    }

}
