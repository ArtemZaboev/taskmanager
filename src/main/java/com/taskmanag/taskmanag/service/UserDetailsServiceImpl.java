package com.taskmanag.taskmanag.service;

import com.taskmanag.taskmanag.entity.User;
import com.taskmanag.taskmanag.repo.UserRepository;
import com.taskmanag.taskmanag.security.RegistrationForm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

@Slf4j
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

//    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;


    private UserRepository userRepo;
    private PasswordEncoder passwordEncoder;

   @Autowired
   public UserDetailsServiceImpl(UserRepository userRepo,PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder=passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=userRepo.findByUsername(username);

        //!user.isPresent()
        if(user!=null){
            log.info("we are  UserService in method loadUserByUsername; username: "+username);
            return user;
        }
        throw  new UsernameNotFoundException("User '"+username+"' not found ");
    }


    public User addUser(RegistrationForm registrationForm){
        return userRepo.save(registrationForm.toUser(passwordEncoder));

    }


}



