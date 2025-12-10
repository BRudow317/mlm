package quickbitlabs.com.mlm.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "admins")
public class Admin extends BaseEntity {
    private String username;
    private String email;
    private String role;

    // Foreign references
    private java.util.UUID userId;
    private java.util.UUID ownerId;

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public java.util.UUID getUserId() { return userId; }
    public void setUserId(java.util.UUID userId) { this.userId = userId; }

    public java.util.UUID getOwnerId() { return ownerId; }
    public void setOwnerId(java.util.UUID ownerId) { this.ownerId = ownerId; }
}
