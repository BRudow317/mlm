package quickbitlabs.com.mlm.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "owners")
public class Owner extends BaseEntity {
    private String name;
    private String email;
    private String phone;
    @Column(unique = true)
    private String username;
    private String password;

    // Foreign references
    private java.util.UUID caseId;
    private java.util.UUID userId;
    private java.util.UUID taskId;
    private java.util.UUID adminId;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public java.util.UUID getCaseId() { return caseId; }
    public void setCaseId(java.util.UUID caseId) { this.caseId = caseId; }

    public java.util.UUID getUserId() { return userId; }
    public void setUserId(java.util.UUID userId) { this.userId = userId; }

    public java.util.UUID getTaskId() { return taskId; }
    public void setTaskId(java.util.UUID taskId) { this.taskId = taskId; }

    public java.util.UUID getAdminId() { return adminId; }
    public void setAdminId(java.util.UUID adminId) { this.adminId = adminId; }
}
