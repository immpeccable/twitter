package dev.tunahan.twitter.User;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import dev.tunahan.twitter.config.UserAuthenticationProvider;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public User createUser(String profile_name, String user_name, String image_url, String password) {

        User user = repository.insert(new User(profile_name, user_name, image_url, password));
        return user;
    }

    public User logUser(String user_name) {
        List<Criteria> criterias = new ArrayList<Criteria>();
        Query query = new Query();
        if (user_name != null && !user_name.isEmpty()) {
            criterias.add(Criteria.where("user_name").is(user_name));
        }
        query.addCriteria(new Criteria().andOperator(criterias.toArray(new Criteria[criterias.size()])));
        User user = mongoTemplate.findOne(query, User.class);
        return user;
    }

    public User getUser(String user_name) {
        List<Criteria> criterias = new ArrayList<Criteria>();
        Query query = new Query();
        if (user_name != null && !user_name.isEmpty()) {
            criterias.add(Criteria.where("user_name").is(user_name));
        }
        query.addCriteria(new Criteria().andOperator(criterias.toArray(new Criteria[criterias.size()])));
        User user = mongoTemplate.findOne(query, User.class);
        return user;
    }

    public List<User> exploreUsers(String name) {
        List<Criteria> criterias = new ArrayList<Criteria>();
        Query query = new Query();
        criterias.add(Criteria.where("profile_name").regex())
    }
}
