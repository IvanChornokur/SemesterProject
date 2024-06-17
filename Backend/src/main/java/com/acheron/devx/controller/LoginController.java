package com.acheron.devx.controller;

import com.acheron.devx.dto.LoginRequest;
import com.acheron.devx.service.UserService;
import com.acheron.devx.util.JwtTokenUtils;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LoginController {
    private final AuthenticationManager authenticationManager;
    private final UserService service;
    private final JwtTokenUtils tokenUtils;

    @PostMapping("/login")
    @SneakyThrows
    public String login(@RequestBody LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails userDetails = service.loadUserByUsername(request.getUsername());
        return tokenUtils.generateToken(userDetails);
    }
}
