package com.neu.finalproject.repositories;

import com.neu.finalproject.models.Course;
import org.springframework.data.repository.CrudRepository;

public interface CourseRepository
        extends CrudRepository<Course, Integer> {
}
