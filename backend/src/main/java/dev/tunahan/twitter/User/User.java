package dev.tunahan.twitter.User;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private ObjectId id;

    User(String profile_name, String user_name, String image_url, String password) {
        this.profile_name = profile_name;
        this.user_name = user_name;
        this.password = password;
        this.image_url = image_url;
    }

    private String profile_name;
    private String user_name;
    private String image_url;
    private String password;
}
