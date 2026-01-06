package com.rob.trafficapp.lessons;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import tools.jackson.databind.ObjectMapper;

import java.io.InputStream;
import java.util.List;
import java.util.ArrayList;
import java.io.File;

@CrossOrigin(originPatterns = "http://localhost:51*")
@RestController

public class LessonController{

    private final ObjectMapper mapper = new ObjectMapper();

    @GetMapping("/api/lessons")
    public List<Lesson> getLessons() throws Exception{
        List<Lesson> lessons = new ArrayList<>();

        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        Resource[] resources = resolver.getResources("classpath:lessons/*.json");

        for (Resource resource : resources) {
            try (InputStream inputStream = resource.getInputStream()) {
            lessons.add(mapper.readValue(inputStream, Lesson.class));
            }
        }
        return lessons;
    }
}
