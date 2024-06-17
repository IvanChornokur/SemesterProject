package com.acheron.devx.service;

import com.acheron.devx.entity.User;
import com.acheron.devx.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public Optional<User> findByEmail(String username) {
        return userRepo.findByUsername(username);
    }

    public User save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("user not found"));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), Collections.singleton(user.getRole()));
    }
}
