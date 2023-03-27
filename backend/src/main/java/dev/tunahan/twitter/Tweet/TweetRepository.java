package dev.tunahan.twitter.Tweet;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import dev.tunahan.twitter.User.User;
import dev.tunahan.twitter.User.UserDto;

@Repository
public interface TweetRepository extends MongoRepository<Tweet, ObjectId> {

    List<Tweet> findByFrom(User from);

    @Query(value = "{'createdDate': {$lt: ?0}, 'from': {$in: ?1}}")
    List<Tweet> getFeedFromDatabase(LocalDateTime createdDate,
            List<UserDto> users, Pageable pageable);

    Optional<Tweet> findById(ObjectId id);

}
