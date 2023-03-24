package dev.tunahan.twitter.Tweet;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import dev.tunahan.twitter.User.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "tweets")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tweet {

    Tweet(User from, String context) {
        this.from = from;
        this.context = context;
    }

    @Id
    private ObjectId id;

    private String context;

    @DBRef
    private User from;
    @DBRef
    private User[] likes;
    @DBRef
    private User[] retweets;
    @DBRef
    private User[] mentions;
}
