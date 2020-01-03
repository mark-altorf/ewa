package nl.aquadine.service.Impl;

import nl.aquadine.model.Invite;
import nl.aquadine.model.Restaurant;
import nl.aquadine.model.User;
import nl.aquadine.service.RepositoryService;
import nl.aquadine.service.SecurityUtil;

import javax.persistence.*;
import java.util.List;
import java.util.Map;

public class RepositoryServiceImpl implements RepositoryService {

    private EntityManagerFactory entityManagerFactory;

    private static RepositoryServiceImpl instance;

    static { instance = new RepositoryServiceImpl(); }

    public static RepositoryService getInstance() {
        return instance;
    }

    private RepositoryServiceImpl(){
        entityManagerFactory = Persistence.createEntityManagerFactory("aquadinePU");
    }

    private EntityManager getEntityManager(){
        return entityManagerFactory.createEntityManager();
    }

    // TODO: hook up to actual list of users
    private Map<String, User> users;

  //restaurant
  @Override
  public List<Restaurant> getAllRestaurants() {
    EntityManager em = entityManagerFactory.createEntityManager();
    List<Restaurant> restaurants = em.createQuery("SELECT r FROM Restaurant r").getResultList();
    em.close();
    return restaurants;
  }

  @Override
  public Restaurant getAllRestaurantNames(String restaurantName) {
    EntityManager em = getEntityManager();
    Restaurant restaurant = em.find(Restaurant.class, restaurantName);
    em.close();
    return restaurant;
  }


  @Override
  public Restaurant find(Integer id) {
    EntityManager em = getEntityManager();
    Restaurant restaurant = em.find(Restaurant.class, id);
    em.close();
    return restaurant;
  }

  @Override
  public Restaurant save(Restaurant restaurant) {
    saveToDatabase(restaurant);

    return restaurant;
  }

  @Override
  public Restaurant update(Restaurant restaurant) {
    return null;
  }

  @Override
  public Restaurant delete(Restaurant restaurant) {
    return null;
  }

    @Override
    public List<User> userGetAll() {
        EntityManager em = entityManagerFactory.createEntityManager();
        List<User> users = em.createQuery("SELECT u FROM User u").getResultList();
        em.close();
        return users;
    }

    // user
    @Override
    public User find(String email) {
        EntityManager em = getEntityManager();
        User user = em.find(User.class,email);
        em.close();
        return user;
    }

    @Override
    public User save(User user) {
        saveToDatabase(user);

        return user;
    }

    @Override
    public User update(User user) {
return null;
    }

    @Override
    public User delete(User user) {
return null;
    }


    //invite
    @Override
    public List<Invite> inviteGetAll() {
        EntityManager em = entityManagerFactory.createEntityManager();
        List<Invite> invites = em.createQuery("SELECT i FROM Invite i").getResultList();
        em.close();
        return invites;
    }


    /**
     * Get all invites for a certain user
     * @return open invites for the user
     * SELECT invite.name, restaurant.name FROM invite INNER JOIN user ON  invite.inviteeId = user.userId INNER JOIN restaurant ON invite.restaurantId = restaurant.restaurantId
     * TODO: implement the query!
     */
    @Override
    public List<Invite> getInvitesForUser() {
        EntityManager em = entityManagerFactory.createEntityManager();
        List<Invite> invites = em.createQuery("SELECT invite.name FROM invite INNER JOIN user ON  invite.inviteeId = user.userId").getResultList();
        em.close();
        return invites;
    }

    @Override
    public Invite findInvite(Long id) {
        EntityManager em = getEntityManager();
        Invite invite = em.find(Invite.class,id);
        em.close();
        return invite;
    }

    @Override
    public void saveInvite(Invite invite) {
        saveToDatabase(invite);
    }

    @Override
    public void updateInvite(Invite invite) {

    }

    @Override
    public void deleteInvite(Invite invite) {

    }

    private <E> void saveToDatabase(E value){
        EntityManager em = getEntityManager();

        em.getTransaction().begin();
        em.persist(value);
        em.getTransaction().commit();
        em.close();
    }


    /**
     * This method is used to authenticate the user.
     * @param email email of user
     * @param plainTextPassword password in plaintext to be tested
     * @return true if password is correct false if not
     */
    @Override
    public boolean authenticateUser(String email, String plainTextPassword) {

        SecurityUtil securityUtil = new SecurityUtil();
        EntityManager em = entityManagerFactory.createEntityManager();

        try{
            User user = em.find(User.class,email);
            em.close();

            if (user != null) {
                return securityUtil.passwordsMatch(user.getPassword(), user.getSalt(), plainTextPassword);
            }

        }catch(Exception e){
            System.out.println("Couldn't find user");
        }

        return false;
    }



}
