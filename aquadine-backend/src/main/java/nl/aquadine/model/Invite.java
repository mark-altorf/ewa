package nl.aquadine.model;

import javax.persistence.*;


/**
 * @author huipvandenende
 */
@Entity
@NamedQueries({
        @NamedQuery(name = "Invite.findOne", query = "select i from Invite i where i.id = :id"),
        @NamedQuery(name = "Invite.getAll", query = "select i from Invite i")
}
)
public class Invite {

    @Id
    @GeneratedValue
    private long inviteId;

    private String name;
    private Long organizerId;
    private Long inviteeId;
    private Long restaurantId;

    public long getInviteId() {
        return inviteId;
    }

    public void setInviteId(long inviteId) {
        this.inviteId = inviteId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getOrganizerId() {
        return organizerId;
    }

    public void setOrganizerId(Long organizerId) {
        this.organizerId = organizerId;
    }

    public Long getInviteeId() {
        return inviteeId;
    }

    public void setInviteeId(Long inviteeId) {
        this.inviteeId = inviteeId;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }
}
