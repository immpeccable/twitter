package dev.tunahan.twitter.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping()
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/create-user")
    public ResponseEntity<User> createUser(@RequestBody Map<String, String> payload) {
        System.out.println("hello world!!!!");
        return new ResponseEntity<User>(
                service.createUser(payload.get("profile_name"), payload.get("user_name"), payload.get("image_url"),
                        payload.get("password")),
                HttpStatus.OK);
    }
}
