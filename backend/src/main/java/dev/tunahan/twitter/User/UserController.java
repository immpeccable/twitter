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
        return new ResponseEntity<User>(
                service.createUser(payload.get("profile_name"), payload.get("user_name"), payload.get("image_url"),
                        payload.get("password")),
                HttpStatus.OK);
    }

    @PostMapping("/login-user")
    public ResponseEntity<LoginResponseObject> loginUser(@RequestBody Map<String, String> payload) {
        LoginResponseObject response = service.logUser(payload.get("user_name"), payload.get("password"));
        return new ResponseEntity<LoginResponseObject>(response, HttpStatus.OK);
    }
}
