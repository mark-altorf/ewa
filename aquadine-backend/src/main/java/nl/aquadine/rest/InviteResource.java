package nl.aquadine.rest;

import nl.aquadine.model.Invite;
import nl.aquadine.service.Impl.RepositoryServiceImpl;
import nl.aquadine.service.RepositoryService;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.io.Serializable;
import java.util.List;


@Path("invites")
public class InviteResource implements Serializable {


    private RepositoryService repositoryService;
    public InviteResource() {
        repositoryService = RepositoryServiceImpl.getInstance();
    }



    /**
     * Gets all invites JSON
     * @return list of invite in JSON format
     */
    @GET
    @Produces("application/json")
    public Response all(){
        List<Invite> all = repositoryService.inviteGetAll();
        return Response
                .status(200)
                .header("Access-Control-Allow-Origin", "*")
                .entity(all)
                .build();
    }

    /**
     * Get invite by given ID
     * @param id id to get individual invite by
     * @return individual invite JSON
     */
    @GET
    @Path("/{id}")
    @Consumes("application/json")
    public Response getInvite(@PathParam("id") Long id){
        Invite invite = repositoryService.findInvite(id);
        return Response
                .status(200)
                .entity(invite)
                .build();
    }

    /**
     * Saves invite JSON
     * @param invite
     * @return
     */
    @POST
    @Consumes("application/json")
    public Response save(Invite invite){
        repositoryService.saveInvite(invite);
        return Response
                .status(201)
                .build();
    }

    /**
     * Updates individual invite
     * @param invite
     * @return updated invite
     */
    @PUT
    @Consumes("application/json")
    public Response update(Invite invite){
        repositoryService.updateInvite(invite);
        return Response
                .status(200)
                .entity(invite)
                .build();
    }

    /**
     * Deletes invite by given ID
     * @param id id to delete invite by
     * @return individual invite JSON
     */
    @DELETE
    @Path("/{id}")
    @Consumes("application/json")
    public Response delete(@PathParam("id") Long id){
        Invite invite = repositoryService.findInvite(id);
        repositoryService.deleteInvite(invite);
        return Response
                .status(200)
                .entity(invite)
                .build();
    }
}

