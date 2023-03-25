package dev.tunahan.twitter.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

enum Status {
    PASS,
    INVALID_USERNAME,
    INVALID_PASSWORD
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseObject {

    LoginResponseObject(Status status) {
        this.status = status;
    }

    LoginResponseObject(UserDto user, Status status) {
        this.status = status;
        this.user = user;
    }

    private Status status;
    private UserDto user;
}
