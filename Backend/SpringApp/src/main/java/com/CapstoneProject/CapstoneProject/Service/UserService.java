package com.CapstoneProject.CapstoneProject.Service;

import com.CapstoneProject.CapstoneProject.Model.Address;
import com.CapstoneProject.CapstoneProject.Model.User;
import com.CapstoneProject.CapstoneProject.Repository.AddressRepo;
import com.CapstoneProject.CapstoneProject.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Optional;

// In the user service is located the business logic, every method that the object is going to use must be in the object Service.

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AddressRepo addressRepo;

    @Autowired
    private JWTService jwtService;

    @Autowired
    AuthenticationManager authManager;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    //Error Checking: Allow multiple accounts with the same email?
    public ResponseEntity<User> createUser(String username,
                                     String password,
                                     String firstName,
                                     String lastName,
                                     String email,
                                     Address address,
                                     Long phoneNumber)
    {
        Address address1 = new Address(address.getStreet(), address.getCity(), address.getState(), address.getZipCode(), address.getCountry());

        User user = new User(username, password, firstName, lastName, email, address1, phoneNumber);
        user.setPassword(encoder.encode(user.getPassword())); //Encrypting of the password before saving it to the database

        Optional<User> emailExists = userRepo.findByEmail(email);
        Optional<User> usernameExists = Optional.ofNullable(userRepo.findByUsername(username));

        if(emailExists.isPresent()){  //An email can only have one account
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("Error", "Email already exists").body(null);
        }

        if (usernameExists.isPresent()) { // Username are unique for each account
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("Error", "Username already exists").body(user);
        }

        addressRepo.save(address1);
        userRepo.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).header("Success", "User has been created").body(user);
    }

    public ResponseEntity<User> updateUserInfo(String firstName,
                                               String lastName,
                                               String email,
                                               Address address,
                                               Long phoneNumber) {
        // Retrieve the authenticated user's username from the security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // Find the existing user
        User existingUser = userRepo.findByUsername(username);

        if (existingUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .header("Error", "Username not found")
                    .body(null);
        }

        // Update only the relevant fields
        if (firstName != null) existingUser.setFirstName(firstName);
        if (lastName != null) existingUser.setLastName(lastName);
        if (email != null) existingUser.setEmail(email);
        if (address != null) {
            Address newAddress = addressRepo.save(address);
            existingUser.setAddress(newAddress);
        }
        if (phoneNumber != null) existingUser.setPhoneNumber(phoneNumber);

        // Save the updated user back to the database
        userRepo.save(existingUser);

        return ResponseEntity.status(HttpStatus.OK)
                .header("Success", "User has been modified")
                .body(existingUser);
    }


    public ResponseEntity<User> updatePassword (String password){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User user = userRepo.findByUsername(username);

        if(user == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Error", "Username not found").body(new User());

        user.setPassword(encoder.encode(password));
        userRepo.save(user);

        return ResponseEntity.status(HttpStatus.OK).header("Success", "Password has been modified").body(user);
    }

    public ResponseEntity<User> getUserDetails() {
        // Retrieve the authenticated user's username from the security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // Find the user by their username
        User user = userRepo.findByUsername(username);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .header("Error", "User not found")
                    .body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(user);
    }


    public ResponseEntity<User> deleteUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        userRepo.deleteByUsername(username);

        return ResponseEntity.status(HttpStatus.OK).header("Success", "User has been deleted").body(new User());
    }

    public ResponseEntity<String> verify(String username, String password){ //Login method
        Authentication auth = authManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        if (auth.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.OK).header("Success", "Validated").body(jwtService.generateToken(username));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Error", "Id not found").body("Invalid credentials");
    }

}
