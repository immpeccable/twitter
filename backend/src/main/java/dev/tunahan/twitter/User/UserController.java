package dev.tunahan.twitter.User;

import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.tunahan.twitter.config.UserAuthenticationProvider;

import java.nio.CharBuffer;
import java.util.Map;

@RestController
@RequestMapping()
public class UserController {

    @Autowired
    private UserService service;

    private UserAuthenticationProvider userAuthenticationProvider;

    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService,
            UserAuthenticationProvider userAuthenticationProvider, PasswordEncoder passwordEncoder) {
        this.service = userService;
        this.userAuthenticationProvider = userAuthenticationProvider;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<User> createUser(@RequestBody Map<String, String> payload) {
        String encodedPassword = passwordEncoder.encode(payload.get("password"));
        return new ResponseEntity<User>(
                service.createUser(payload.get("profile_name"), payload.get("user_name"), payload.get("image_url"),
                        encodedPassword),
                HttpStatus.OK);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<LoginResponseObject> loginUser(@RequestBody Map<String, String> payload) {
        System.out.println("ia m in sign in");
        User user = service.logUser(payload.get("user_name"));
        LoginResponseObject resp = new LoginResponseObject(user, Status.INVALID_USERNAME);
        if (user != null) {
            if (passwordEncoder.matches(CharBuffer.wrap(payload.get("password")), user.getPassword())) {
                resp.setStatus(Status.PASS);

            } else {
                resp.setStatus(Status.INVALID_PASSWORD);
            }
        }
        if (resp.getStatus() == Status.PASS && user != null) {
            user.setToken(userAuthenticationProvider.createToken(payload.get("user_name")));
        }
        return new ResponseEntity<LoginResponseObject>(resp, HttpStatus.OK);

    }

    @PostMapping("/sign-out")
    public ResponseEntity<Void> signOut(@AuthenticationPrincipal @RequestBody Map<String, String> payload) {
        System.out.println("sign out");
        SecurityContextHolder.clearContext();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/current-user")
    public ResponseEntity<User> getCurrentUser(@RequestHeader("Authorization") String authorization) {
        String[] authElements = authorization.split(" ");
        User user = userAuthenticationProvider.getJWTUser(authElements[1]);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }
}
