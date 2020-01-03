package nl.aquadine.service;

import nl.aquadine.model.Invite;
import nl.aquadine.model.Restaurant;
import nl.aquadine.model.User;

import java.util.List;

/**
 * @author Fethi
 */

public interface RepositoryService {


    // Restaurant
    List<Restaurant> getAllRestaurants();
    Restaurant getAllRestaurantNames(String restaurantName);
    Restaurant find(Integer id);
    Restaurant save(Restaurant restaurant);
    Restaurant update(Restaurant restaurant);
    Restaurant delete(Restaurant restaurant);

    // User services
    List<User> userGetAll();
    User find(String email);
    User save(User user);
    User update(User user);
    User delete(User user);

    // Invite services
    List<Invite> inviteGetAll();
    List<Invite> getInvitesForUser();
    Invite findInvite(Long id);
    void saveInvite(Invite invite);
    void updateInvite(Invite invite);
    void deleteInvite(Invite invite);

    boolean authenticateUser(String email, String plainTextPassword);

}
