package dev.tunahan.twitter.Tweet;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "tweets")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tweet {

    Tweet(ObjectId from, String context) {
        this.from = from;
        this.context = context;
    }

    @Id
    private ObjectId id;

    private String context;
    private ObjectId from;
    private ObjectId[] likes;
    private ObjectId[] retweets;
    private ObjectId[] mentions;
}
