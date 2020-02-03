package com.taskmanag.taskmanag.controller;

import com.taskmanag.taskmanag.entity.Task;
import com.taskmanag.taskmanag.entity.User;
import com.taskmanag.taskmanag.service.TaskRestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/task")
public class TaskRestController {
    private TaskRestService taskRestService;

    @Autowired
    public TaskRestController(TaskRestService taskRestService) {
        this.taskRestService = taskRestService;
    }


    @GetMapping
    public Page<Task> list(@PageableDefault Pageable pageable,@AuthenticationPrincipal User user){
        return taskRestService.findByUserId(pageable,user.getId());
    }


    @GetMapping("{id}")
    public Task getOne(@PathVariable("id") Task task){
        return task;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Task dbTask,@AuthenticationPrincipal User user){
        taskRestService.delete(dbTask,user);
    }

    @PostMapping
    public Task add(@RequestBody Task task,@AuthenticationPrincipal User user){
        task.setUserId(user.getId());
        return taskRestService.save(task);
    }

    @PutMapping("{id}")
    public Task update(@PathVariable("id") Task dbTask,@RequestBody Task task){
        BeanUtils.copyProperties(task,dbTask,"id");
        return taskRestService.save(dbTask);
    }

        @PostMapping("/mail")
    public void mailTask(@AuthenticationPrincipal User user){
            taskRestService.mailTasks(user);
            log.info("User "+user+" send list to email");
    }



}


