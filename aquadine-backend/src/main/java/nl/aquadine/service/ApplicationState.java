package nl.aquadine.service;

import javax.enterprise.context.SessionScoped;
import java.io.Serializable;

/**
 * Used to track the state of the application per user
 * TODO: implement
 */
@SessionScoped
public class ApplicationState implements Serializable {
    private String email;
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
}
