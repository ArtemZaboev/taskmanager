package com.taskmanag.taskmanag.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;


import javax.persistence.*;

@Data
//@NoArgsConstructor(access = AccessLevel.PRIVATE,force = true)
@RequiredArgsConstructor
@Table(name = "task")
@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "t_id")
    private long id;

    @Column(name = "title")
    private String title;
    //StringBuilder mb need
    @Column(name = "description")
    private String description;
    @Column(name = "user_id")
    private long userId;

    //change type this variable
    @Column(name = "time")
    private int time;
}
