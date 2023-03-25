package dev.tunahan.twitter.Tweet;

import java.time.LocalDateTime;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import dev.tunahan.twitter.User.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TweetDto {

    @Id
    private ObjectId id;

    private UserDto from;
    private String context;
    private LocalDateTime createdDate;

    public TweetDto(String context) {
        this.context = context;
    }

    public TweetDto(String context, LocalDateTime createdDate) {
        this.context = context;
        this.createdDate = createdDate;
    }

    // getters and setters
}