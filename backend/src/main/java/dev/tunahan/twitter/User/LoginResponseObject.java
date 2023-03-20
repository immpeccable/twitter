package dev.tunahan.twitter.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

enum Status {
    FOUND,
    NOT_FOUND
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseObject {

    LoginResponseObject(Status status) {
        this.status = status;
    }

    private Status status;
    private User user;
}
