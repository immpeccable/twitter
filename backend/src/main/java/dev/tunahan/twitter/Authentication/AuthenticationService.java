package dev.tunahan.twitter.Authentication;

import java.nio.CharBuffer;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import dev.tunahan.twitter.Dtos.CredentialsDto;
import dev.tunahan.twitter.User.User;
import dev.tunahan.twitter.User.UserRepository;

@Service
public class AuthenticationService {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository repository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public AuthenticationService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public User authenticate(CredentialsDto credentialsDto) {

        List<Criteria> criterias = new ArrayList<Criteria>();
        Query query = new Query();
        String user_name = credentialsDto.getLogin();
        char[] password = credentialsDto.getPassword();
        if (user_name != null && !user_name.isEmpty()) {
            criterias.add(Criteria.where("user_name").is(user_name));
        }
        query.addCriteria(new Criteria().andOperator(criterias.toArray(new Criteria[criterias.size()])));
        User user = mongoTemplate.findOne(query, User.class);

        if (user != null) {
            if (passwordEncoder.matches(CharBuffer.wrap(password), user.getPassword())) {
                return user;
            }
            throw new RuntimeException("Invalid password");
        }
        throw new RuntimeException("Invalid Username");
    }

    public User findByLogin(String login) {
        List<Criteria> criterias = new ArrayList<Criteria>();
        Query query = new Query();
        if (login != null && !login.isEmpty()) {
            criterias.add(Criteria.where("user_name").is(login));
        }
        query.addCriteria(new Criteria().andOperator(criterias.toArray(new Criteria[criterias.size()])));
        User user = mongoTemplate.findOne(query, User.class);
        if (user != null) {
            return user;
        }
        throw new RuntimeException("Invalid login");
    }
}