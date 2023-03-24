package dev.tunahan.twitter.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FollowerDto {

    private String user_name;
    private String profile_name;
    private String image_url;

    // getters and setters
}
