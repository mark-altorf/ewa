package nl.aquadine.model;


import javax.persistence.*;

/**
 * @author huipvandenende
 */
@Entity
@Table(name = "user")
public class User {

    @Id private String email;
    private Integer isOrganizer; // 0 = false, 1 = true
    private String username;
    private String password;

    public User() {
    }

    public User(String email, String username, String password){
        this.email = email;
        this.username = username;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // salt is used for password security
    private String salt;
    public String getSalt() {
        return salt;
    }
    public void setSalt(String salt) {
        this.salt = salt;
    }

}
