package nl.aquadine.rest.config;

import nl.aquadine.rest.InviteResource;
import nl.aquadine.rest.RestaurantResource;
import nl.aquadine.rest.UserResource;
import nl.aquadine.service.RestResponseFilter;

import javax.ws.rs.core.Application;
import java.util.Set;

@javax.ws.rs.ApplicationPath("resources")
public class App extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    /**
     * @param resources
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(UserResource.class);
        resources.add(RestResponseFilter.class);
        resources.add(InviteResource.class);
        resources.add(RestaurantResource.class);
    }
}