package nl.aquadine.model;

import javax.persistence.*;



//@NamedQueries({
//  @NamedQuery(name = "Restaurant.findOne", query = "select m from Restaurant m where m.id = :id"),
//  @NamedQuery(name = "Restaurant.getAll", query = "select m from Restaurant m")
//})
/**
 * @author Fethi
 */
@Entity
@Table(name = "restaurant")
public class Restaurant {

    @Id
    @GeneratedValue
    private Long restaurantId;

    private String name;
    private String address;
    private String menu;

    public Restaurant(){

    }

    public Restaurant(String name, String address) {
      this.name = name;
      this.address = address;
      this.menu = menu;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMenu() {
        return menu;
    }

    public void setMenu(String menu) {
        this.menu = menu;
    }
}
