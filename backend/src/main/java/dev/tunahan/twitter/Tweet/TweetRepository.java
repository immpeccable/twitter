package dev.tunahan.twitter.Tweet;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.tunahan.twitter.User.User;
import dev.tunahan.twitter.User.UserDto;

@Repository
public interface TweetRepository extends MongoRepository<Tweet, ObjectId> {

    List<Tweet> findByFrom(User from);

    List<Tweet> findByFromInOrderByCreatedDateDesc(List<UserDto> users);

}
