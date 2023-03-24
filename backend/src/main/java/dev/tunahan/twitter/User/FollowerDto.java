package dev.tunahan.twitter.User;

public class FollowerDto {

    private String username;
    private String profileName;
    private String imageUrl;

    public FollowerDto(String username, String profileName, String imageUrl) {
        this.username = username;
        this.profileName = profileName;
        this.imageUrl = imageUrl;
    }

    // getters and setters
}
