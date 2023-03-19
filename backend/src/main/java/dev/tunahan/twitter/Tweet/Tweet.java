package dev.tunahan.twitter.Tweet;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
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

    @Id
    private ObjectId id;
    private String context;
    private User from;
    private int likes;
    private int retweets;
    private int mentions;
}
