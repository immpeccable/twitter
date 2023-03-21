package dev.tunahan.twitter.Dtos;

public class CredentialsDto {

    private String user_name;
    private char[] password;

    public CredentialsDto() {
        super();
    }

    public CredentialsDto(String user_name, char[] password) {
        this.user_name = user_name;
        this.password = password;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public char[] getPassword() {
        return password;
    }

    public void setPassword(char[] password) {
        this.password = password;
    }
}