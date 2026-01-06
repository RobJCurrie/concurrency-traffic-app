package com.rob.trafficapp.lessons;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@CrossOrigin(originPatterns = "http://localhost:51*")
@RestController

public class LessonController{

    private final LessonService lessonService;

    public LessonController(LessonService lessonService){
        this.lessonService = lessonService;
    }

    @GetMapping("/api/lessons")
    public List<Lesson> getLessons() throws Exception{
        return  lessonService.getAllLessons();
    }

    @GetMapping("/api/lessons/{id}")
    public Lesson getLessonById(@PathVariable String id) throws Exception{
        Lesson lesson = lessonService.getLessonById(id);
        if(lesson == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Lesson Not Found");
        }
        return lesson;
    }
}
