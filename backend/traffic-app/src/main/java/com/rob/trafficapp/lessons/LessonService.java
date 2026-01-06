package com.rob.trafficapp.lessons;

import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class LessonService {

    private final ObjectMapper mapper = new ObjectMapper();

    public List<Lesson> getAllLessons() throws Exception {
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

    public Lesson getLessonById(String lessonId) throws Exception {

        return getAllLessons().stream().filter(lesson -> lesson.getId().equals(lessonId)).findFirst().orElse(null);

    }
}
