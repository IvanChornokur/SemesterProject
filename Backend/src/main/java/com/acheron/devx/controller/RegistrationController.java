package com.acheron.devx.controller;

import com.acheron.devx.dto.RegistrationDto;
import com.acheron.devx.entity.User;
import com.acheron.devx.entity.type.Role;
import com.acheron.devx.service.UserService;
import com.acheron.devx.util.JwtTokenUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RegistrationController {
    private final UserService usersService;
    private final JwtTokenUtils tokenUtils;

    @PostMapping("/registration")
    public String regPost(@RequestBody RegistrationDto dto) {

        User save = usersService.save(new User(
                null,
                dto.getUsername(),
                dto.getEmail(),
                dto.getPassword(),
                null,
                Role.USER
        ));
        UserDetails userDetails = usersService.loadUserByUsername(save.getUsername());
        return tokenUtils.generateToken(userDetails);
    }
}
