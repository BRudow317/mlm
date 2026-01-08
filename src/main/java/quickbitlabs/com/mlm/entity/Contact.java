package quickbitlabs.com.mlm.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;

@Entity
@Table(name = "contacts")
public class Contact extends BaseEntity {
    private String firstName;
    private String lastName;
    private String phone;
    private String message;
    private String postTime;
    // private String fullName;

    // Foreign references (IDs)
    private java.util.UUID accountId;
    private java.util.UUID userId;

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getPostTime() { return postTime; }
    public void setPostTime(String postTime) { this.postTime = postTime; }

    public java.util.UUID getAccountId() { return accountId; }
    public void setAccountId(java.util.UUID accountId) { this.accountId = accountId; }

    public java.util.UUID getUserId() { return userId; }
    public void setUserId(java.util.UUID userId) { this.userId = userId; }

    public String getFullName() {
        return firstName + " " + lastName;
    }
    public void setFullName(String fullName) {
        String[] parts = fullName.split(" ", 2);
        this.firstName = parts.length > 0 ? parts[0] : "";
        this.lastName = parts.length > 1 ? parts[1] : "";
    }

}