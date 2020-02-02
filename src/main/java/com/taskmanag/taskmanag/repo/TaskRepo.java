package com.taskmanag.taskmanag.repo;

import com.taskmanag.taskmanag.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TaskRepo extends JpaRepository<Task,Long> {
    Page<Task> findByUserId(Pageable pageable, Long userId);

    Iterable<Task> findByUserId(long id);
}
