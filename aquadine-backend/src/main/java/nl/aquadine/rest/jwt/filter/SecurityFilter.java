package nl.aquadine.rest.jwt.filter;

import io.jsonwebtoken.Jwts;
import nl.aquadine.service.ApplicationState;
import nl.aquadine.service.SecurityUtil;

import javax.annotation.Priority;
import javax.inject.Inject;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.security.Key;
import java.security.Principal;


@Provider
@Secure
@Priority(Priorities.AUTHENTICATION)
public class SecurityFilter implements ContainerRequestFilter {
    private static final String BEARER = "Bearer";

    @Inject
    ApplicationState applicationState;

    @Inject
    private SecurityUtil securityUtil;

    @Override
    public void filter(ContainerRequestContext reqCtx) throws IOException {

        //1. Get the token from the request header
        String authHeader = reqCtx.getHeaderString(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith(BEARER)) {

            System.out.println("No authorization header found!");
            throw new NotAuthorizedException("No authorization header provided");
        }

        String token = authHeader.substring(BEARER.length()).trim();

        //2. Parse the token
        try {
//            Key key = securityUtil.generateKey(applicationState.getEmail());
            Key key = securityUtil.generateKey();
            Jwts.parser().setSigningKey(key).parseClaimsJws(token);
            SecurityContext securityContext = reqCtx.getSecurityContext();
            reqCtx.setSecurityContext(new SecurityContext() {
                @Override
                public Principal getUserPrincipal() {
                    return () -> Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody().getSubject();

                }

                @Override
                public boolean isUserInRole(String s) {
                    return securityContext.isUserInRole(s);
                }

                @Override
                public boolean isSecure() {
                    return securityContext.isSecure();
                }

                @Override
                public String getAuthenticationScheme() {
                    return securityContext.getAuthenticationScheme();
                }
            });

            //3. If parsing fails, yell.
        } catch (Exception e) {
            System.out.println("An error has occured!");
            //Another way to send exceptions to the client
            reqCtx.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
        }

    }

}

