package com.rob.trafficapp.common;

import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/health")

public class HealthController {

    @GetMapping
    public String health() {
        return "Backend is running";
    }
}
