package com.taskmanag.taskmanag.controller;

import com.taskmanag.taskmanag.entity.User;
import com.taskmanag.taskmanag.security.RegistrationForm;
import com.taskmanag.taskmanag.service.UserDetailsServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/registration")
public class RegistrationRestController {
    private UserDetailsServiceImpl userDetailsService;

    public RegistrationRestController(UserDetailsServiceImpl userDetailsService) {
        this.userDetailsService=userDetailsService;
    }

    @GetMapping
    public String registerForm(){return "registration";}

    @PostMapping
    public User registration(RegistrationForm registrationForm){
        log.info("registration new user .............");
        return userDetailsService.addUser(registrationForm);

    }


}
