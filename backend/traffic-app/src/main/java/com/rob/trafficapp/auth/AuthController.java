package com.rob.trafficapp.auth;

import org.apache.catalina.User;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(originPatterns = "http://localhost:51*")
@RestController

public class AuthController {

    @PostMapping("/api/auth/signup")
    public String signup(@RequestBody SignupRequest req) {
        return "signup complete";
    }

    @PostMapping("api/auth/login")
    public String login(@RequestBody LoginRequest req) {
        return "login complete";
    }
}
