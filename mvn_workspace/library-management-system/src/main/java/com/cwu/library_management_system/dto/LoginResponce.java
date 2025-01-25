package com.cwu.library_management_system.dto;

public class LoginResponce {
    private String role;

    public LoginResponce(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

