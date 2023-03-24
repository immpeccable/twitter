package dev.tunahan.twitter.Tweet;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import dev.tunahan.twitter.User.User;

@Service
public class TweetService {

    @Autowired
    private TweetRepository repository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Tweet createTweet(User from, String context) {
        Tweet tweet = repository.insert(new Tweet(from, context));
        return tweet;
    }
}
