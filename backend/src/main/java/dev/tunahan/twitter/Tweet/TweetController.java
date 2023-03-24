package dev.tunahan.twitter.Tweet;

import java.util.Arrays;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.tunahan.twitter.User.User;
import dev.tunahan.twitter.User.UserRepository;
import dev.tunahan.twitter.config.UserAuthenticationProvider;

@RestController
@RequestMapping
public class TweetController {

    @Autowired
    private TweetService tweetService;

    @Autowired
    private UserRepository userRepository;

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
        User dbUser = userRepository.findByUserName(from.getUser_name());
        Tweet newTweet = tweetService.createTweet(from, payload.get("context"));

        if (dbUser.getTweets() != null) {
            dbUser.getTweets().add(newTweet);
        } else {
            dbUser.setTweets(Arrays.asList(newTweet));
        }

        userRepository.save(dbUser);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Connection", "close");

        return new ResponseEntity<Tweet>(newTweet, headers, HttpStatus.OK);
    }

}
