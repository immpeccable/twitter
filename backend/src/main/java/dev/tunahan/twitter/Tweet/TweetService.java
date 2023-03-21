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

    public Tweet createTweet(ObjectId from, String context) {
        Tweet tweet = repository.insert(new Tweet(from, context));
        return tweet;
    }

    public List<Tweet> fetchTweetsOfUser(ObjectId user_id) {
        List<Criteria> criterias = new ArrayList<Criteria>();
        Query query = new Query();
        if (user_id != null) {
            criterias.add(Criteria.where("from").is(user_id));
        }
        System.out.println(user_id);
        query.addCriteria(new Criteria().andOperator(criterias.toArray(new Criteria[criterias.size()])));
        List<Tweet> tweets = mongoTemplate.find(query, Tweet.class);
        return tweets;

    }

}
