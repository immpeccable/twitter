package dev.tunahan.twitter.User;

import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.tunahan.twitter.config.UserAuthenticationProvider;

import java.util.Map;

@RestController
@RequestMapping()
public class UserController {

    @Autowired
    private UserService service;

    private UserAuthenticationProvider userAuthenticationProvider;

    public UserController(UserService userService,
            UserAuthenticationProvider userAuthenticationProvider) {
        this.service = userService;
        this.userAuthenticationProvider = userAuthenticationProvider;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<User> createUser(@RequestBody Map<String, String> payload) {
        return new ResponseEntity<User>(
                service.createUser(payload.get("profile_name"), payload.get("user_name"), payload.get("image_url"),
                        payload.get("password")),
                HttpStatus.OK);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<LoginResponseObject> loginUser(@RequestBody Map<String, String> payload) {
        LoginResponseObject response = service.logUser(payload.get("user_name"), payload.get("password"));
        if (response.getUser() != null) {
            response.getUser().setToken(userAuthenticationProvider.createToken(payload.get("user_name")));
        }
        return new ResponseEntity<LoginResponseObject>(response, HttpStatus.OK);
    }

    @PostMapping("/sign-out")
    public ResponseEntity<Void> signOut(@AuthenticationPrincipal @RequestBody Map<String, String> payload) {
        SecurityContextHolder.clearContext();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/current-user")
    public ResponseEntity<String> getCurrentUser(@RequestHeader("Authorization") String authorization) {
        String[] authElements = authorization.split(" ");
        System.out.println(authorization);
        return new ResponseEntity<String>("hello world", HttpStatus.OK);
    }
}
