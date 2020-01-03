package nl.aquadine.rest;


import nl.aquadine.model.Restaurant;

import nl.aquadine.service.Impl.RepositoryServiceImpl;
import nl.aquadine.service.RepositoryService;


import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

/**
 * @author Fethi
 */


@Path("restaurant")
public class RestaurantResource {


  private RepositoryService repositoryService;

  public RestaurantResource() {
    repositoryService = RepositoryServiceImpl.getInstance();
  }

  @GET
  @Produces("application/json")
  public Response all(){
    List<Restaurant> all = repositoryService.getAllRestaurants();
    return  Response
      .status(200)
      .header("Access-Control-Allow-Origin", "*")
      .entity(all)
      .build();
  }


  @GET
  @Path("/{id}")
  @Consumes("application/json")
  public Response getRestaurant(@PathParam("id") Integer id){
    Restaurant restaurant = repositoryService.find(id);
    return Response
      .status(200)
      .entity(restaurant)
      .build();
  }


  @GET
  @Path("/name{restaurantName}")
  @Consumes("application/json")
  public Response getAllRestaurantNames(@PathParam("restaurantName") String restaurantName){
    Restaurant restaurantNames = repositoryService.getAllRestaurantNames(restaurantName);
    return Response
      .status(200)
      .entity(restaurantNames)
      .build();
  }


  @Produces(MediaType.APPLICATION_JSON)
  public List<Restaurant> getAllRestaurants(){
    return repositoryService.getAllRestaurants();
  }


  /**
   * Saves restaurant JSON
   * @param restaurant
   * @return response
   */
  @POST
  @Consumes("application/json")
  public Response save(Restaurant restaurant){
    System.out.println("TESTING");
    repositoryService.save(restaurant);
    return Response
            .status(201)
            .build();
  }

  @PUT
  @Consumes("application/json")
  public void update(Restaurant restaurant) {
    repositoryService.update(restaurant);
  }

  @DELETE
  @Path("/{id}")
  @Consumes("application/json")
  public void delete(@PathParam("id") Integer id) {
    Restaurant restaurant = repositoryService.find(id);
    repositoryService.delete(restaurant);
  }


}
