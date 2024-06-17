package com.acheron.devx.entity;

import com.acheron.devx.entity.type.Role;
import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Builder
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String email;

    @ToString.Exclude
    private String password;
    private String image;

    @Enumerated(value = EnumType.STRING)
    private Role role;
}
