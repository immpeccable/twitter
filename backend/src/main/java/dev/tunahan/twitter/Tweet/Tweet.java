package dev.tunahan.twitter.Tweet;

import java.time.LocalDateTime;
import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import dev.tunahan.twitter.User.UserDto;
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

    Tweet(UserDto from, String context, LocalDateTime createdDate) {
        this.from = from;
        this.context = context;
        this.createdDate = createdDate;
    }

    private String context;
    private LocalDateTime createdDate;
    private UserDto from;
    private UserDto[] likes;
    private UserDto[] retweets;
    private UserDto[] mentions;
}
