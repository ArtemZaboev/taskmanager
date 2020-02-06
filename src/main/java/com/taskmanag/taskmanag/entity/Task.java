package com.taskmanag.taskmanag.entity;

import lombok.Data;
import lombok.RequiredArgsConstructor;


import javax.persistence.*;
import java.sql.Time;
import java.util.Date;

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
    private String time;

    @Column(name = "complete")
    private boolean completed;

}
