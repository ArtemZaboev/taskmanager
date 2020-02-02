package com.taskmanag.taskmanag.security;

import com.taskmanag.taskmanag.entity.User;
import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;

@Data
public class RegistrationForm {
    private String username;
    private String pass;
    private String email;


    public User toUser(PasswordEncoder passwordEncoder){

        return new User(username,passwordEncoder.encode(pass),email);
    }
}
