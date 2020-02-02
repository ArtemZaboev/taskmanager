package com.taskmanag.taskmanag.service;

import com.taskmanag.taskmanag.entity.Task;
import com.taskmanag.taskmanag.entity.User;
import com.taskmanag.taskmanag.repo.TaskRepo;
import com.taskmanag.taskmanag.repo.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Iterator;

@Service
@Slf4j
public class TaskRestService {
    private UserRepository userRepo;
    private TaskRepo taskRepo;
    private MailSender mailSender;

    @Autowired
    public TaskRestService(UserRepository userRepo, TaskRepo taskRepo,MailSender mailSender) {
        this.userRepo = userRepo;
        this.taskRepo = taskRepo;
        this.mailSender=mailSender;
    }

    public Task save(Task task){
        return taskRepo.save(task);
    }


    public void delete(Task task,User user){
        if(task.getUserId()==user.getId()){
            taskRepo.delete(task);
        }
    }
    public Page<Task> findByUserId(Pageable pageable, Long id ) {
        return taskRepo.findByUserId(pageable,id);
    }
//    public Task update(Long id,Task task){
//        Task dbTask=taskRepo.findById(id).get();
//        BeanUtils.copyProperties(task,dbTask,"id");
//        return taskRepo.save(dbTask);
//    }

    public void mailTasks(User user){
        Iterator<Task> tasksIterator=taskRepo.findByUserId(user.getId()).iterator();
        String tasksList="";
        int i=1;
        while(tasksIterator.hasNext()){
            Task tempTask=tasksIterator.next();
            tasksList+=i+")"+tempTask.getTitle()+"  "+tempTask.getDescription()+"  "+tempTask.getTime()+"\n";
            i++;
        }
        String message=String.format(
                "Hello, %s! \n" +
                        "Welcome to TaskManager, this is your tasks: \n"+tasksList

                ,user.getUsername()
        );
        mailSender.send(user.getEmail(),"Your tasks from TaskManage",message);
    }



}
