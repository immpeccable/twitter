package dev.tunahan.twitter.Dtos;

public class CredentialsDto {

    private String user_name;
    private char[] password;

    public CredentialsDto() {
        super();
    }

    public CredentialsDto(String login, char[] password) {
        this.user_name = login;
        this.password = password;
    }

    public String getLogin() {
        return user_name;
    }

    public void setLogin(String login) {
        this.user_name = login;
    }

    public char[] getPassword() {
        return password;
    }

    public void setPassword(char[] password) {
        this.password = password;
    }
}