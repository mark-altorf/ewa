package nl.aquadine.rest;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import nl.aquadine.model.User;
import nl.aquadine.service.Impl.RepositoryServiceImpl;
import nl.aquadine.service.RepositoryService;
import nl.aquadine.service.SecurityUtil;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static javax.ws.rs.core.HttpHeaders.AUTHORIZATION;
import static javax.ws.rs.core.MediaType.APPLICATION_FORM_URLENCODED;


/**
 * @author huipvandenende
 */

@Path("user")
public class UserResource {

    private RepositoryService repositoryService;

    public UserResource() {
        repositoryService = RepositoryServiceImpl.getInstance();
    }

    private SecurityUtil securityUtil = new SecurityUtil();

    @Context
    private UriInfo uriInfo;

    /**
     * Gets all users JSON
     * @return list of users in JSON format
     */
    @GET
    @Produces("application/json")
    public Response all(){
        List<User> all = repositoryService.userGetAll();
        return Response
                .status(200)
                .header("Access-Control-Allow-Origin", "*")
                .entity(all)
                .build();
    }

    /**
     * Get user by given email
     * @param email email to get individual user by
     * @return individual user JSON
     */
    @GET
    @Path("/{email}")
    @Consumes("application/json")
    public Response find(@PathParam("email") String email){
        User user = repositoryService.find(email);
        return Response
                .status(200)
                .entity(user)
                .build();
    }

    /**
     * Login user using JWT
     * @param email email to get individual user by
     * @return individual user JSON
     */
    @POST // this indicates that this is a resource accessed by a POST request
    @Path("/login") // the path the request is to be recieved on
    @Consumes(APPLICATION_FORM_URLENCODED)
    public Response login(@FormParam("email") String email, @FormParam("password") String password) {
    if (!securityUtil.authenticateUser(email, password)) {
            throw new SecurityException("Email or password incorrect");
        }
        String token = issueToken(email, uriInfo); // gets token using email

        // returns token as header
        return Response.ok().header(AUTHORIZATION, "Bearer " + token).build();
    }

    /**
     * Saves user JSON
     * @param user
     * @return response
     */
    @POST
    @Consumes("application/json")
    public Response save(User user){

        // Hashes user password before storing
        Map<String, String> credMap = securityUtil.hashPassword(user.getPassword());

        user.setPassword(credMap.get("hashedPassword"));
        user.setSalt(credMap.get("salt"));

        repositoryService.save(user);
        return Response
                .status(201)
                .build();
    }

    /**
     * Updates individual user
     * @param user
     * @return updated user
     */
    @PUT
    @Consumes("application/json")
    public Response update(User user){
        repositoryService.update(user);
        return Response
                .status(200)
                .entity(user)
                .build();
    }

    /**
     * Deletes user by givenID
     * @param email email to delete user by
     * @return individual user JSON
     */
    @DELETE
    @Path("/{email}")
    @Consumes("application/json")
    public Response delete(@PathParam("email") String email){
        User user = repositoryService.find(email);
        repositoryService.delete(user);
        return Response
                .status(200)
                .entity(user)
                .build();
    }


    /**
     * Issues a JWT to the user
     * @param email
     * @param uri
     * @return
     */
    private static String issueToken(String email, UriInfo uri) {
        Key key = SecurityUtil.generateKey();

        String jwtToken = Jwts.builder()
                .setSubject(email)
                .setIssuer(uri.getAbsolutePath().toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+15*60*1000)) // 15 minutes
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        return jwtToken;
    }

}
