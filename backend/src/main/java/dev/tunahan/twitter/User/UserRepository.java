package dev.tunahan.twitter.User;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {

    @Query("{ $or: [ { 'user_name': { $regex: ?0, $options: 'i' } }, { 'profile_name': { $regex: ?0, $options: 'i' } } ] }")
    List<User> findByUsernameContainingIgnoreCase(String keyword);

}
