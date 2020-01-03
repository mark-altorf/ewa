package nl.aquadine.service;

import io.jsonwebtoken.SignatureAlgorithm;
import nl.aquadine.service.Impl.RepositoryServiceImpl;
import org.apache.shiro.authc.credential.DefaultPasswordService;
import org.apache.shiro.authc.credential.PasswordService;
import org.apache.shiro.codec.Hex;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.Sha512Hash;
import org.apache.shiro.util.ByteSource;

import javax.crypto.spec.SecretKeySpec;
import javax.enterprise.context.RequestScoped;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.HashMap;
import java.util.Map;

@RequestScoped
public class SecurityUtil {
    private final PasswordService passwordService = new DefaultPasswordService();

    private static final String PASSPHRASE = "THIS IS A SUPER SECRET PASSPHRASE, THIS IS GUARANTEED TO BE SECURE ENOUGH";

    private RepositoryService repositoryService;

    public SecurityUtil() {
        repositoryService = RepositoryServiceImpl.getInstance();
    }


    /**
     * Generates a key used to encrypt password
     * @return secret key
     */
    public static Key generateKey() {
        byte hmacKey[] = PASSPHRASE.getBytes(StandardCharsets.UTF_8);
        Key key = new SecretKeySpec(hmacKey, SignatureAlgorithm.HS512.getJcaName());
        return key;
    }

    /**
     * Checks if the user has given the correct credentials
     * @param email user email
     * @param password user password (plaintext)
     * @return true if password is correct, false if not
     */
    public boolean authenticateUser(String email, String password) {
        return repositoryService.authenticateUser(email, password);

    }

    /**
     * Follow up method of authenticateUser. Gets called in the repositoryServceImpl
     * @param dbStoredHashedPassword hashed password from db
     * @param saltText text used to hash the passowrd
     * @param clearTextPassword password passed to the method
     * @return true if password is correct, false if not
     */
    public boolean passwordsMatch(String dbStoredHashedPassword, String saltText, String clearTextPassword) {
        ByteSource salt = ByteSource.Util.bytes(Hex.decode(saltText));
        String hashedPassword = hashAndSaltPassword(clearTextPassword, salt);
        return hashedPassword.equals(dbStoredHashedPassword);
    }

    /**
     * Hashes the password for secure storage
     * @param clearTextPassword
     * @return hashed passwords
     */
    public Map<String, String> hashPassword(String clearTextPassword) {
        ByteSource salt = getSalt();
        Map<String, String> credMap = new HashMap<>();
        credMap.put("hashedPassword", hashAndSaltPassword(clearTextPassword, salt));
        credMap.put("salt", salt.toHex());
        return credMap;
    }

    /**
     * Follow up method of hashPassword()
     * @param clearTextPassword
     * @param salt
     * @return the hash
     */
    private String hashAndSaltPassword(String clearTextPassword, ByteSource salt) {
        return new Sha512Hash(clearTextPassword, salt, 2000000).toHex();
    }

    /**
     * Get salt
     * @return salt
     */
    private ByteSource getSalt() {
        return new SecureRandomNumberGenerator().nextBytes();
    }

}
