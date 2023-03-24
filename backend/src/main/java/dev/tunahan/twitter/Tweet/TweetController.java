package dev.tunahan.twitter.Tweet;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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

    private UserAuthenticationProvider userAuthenticationProvider;

    public TweetController(TweetService tweetService,
            UserAuthenticationProvider userAuthenticationProvider) {
        this.tweetService = tweetService;
        this.userAuthenticationProvider = userAuthenticationProvider;
    }

    @PostMapping("/create-tweet")
    public ResponseEntity<Tweet> postTweet(@RequestBody Map<String, String> payload,
            @RequestHeader("Authorization") String authorization) {
        String[] authElements = authorization.split(" ");
        User from = userAuthenticationProvider.getJWTUser(authElements[1]);
        Tweet newTweet = tweetService.createTweet(from.getId(), payload.get("context"));
        return new ResponseEntity<Tweet>(newTweet, HttpStatus.OK);
    }

    @GetMapping("/tweets-of-user")
    public ResponseEntity<List<Tweet>> getTweetsOfUser(
            @RequestParam String user_name) {
        User of = userService.getUser(user_name);
        List<Tweet> tweets = tweetService.fetchTweetsOfUser(of.getId());
        return new ResponseEntity<List<Tweet>>(tweets, HttpStatus.OK);
    }

}
