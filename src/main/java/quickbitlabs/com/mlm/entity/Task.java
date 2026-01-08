package quickbitlabs.com.mlm.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tasks")
public class Task extends BaseEntity {
    private String title;
    @Column(length = 2000)
    private String description;
    private String statusLabel;
    private String assignedTo;

    // Foreign references (IDs)
    // private java.util.UUID caseId;
    private java.util.UUID emailId;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }


    public String getStatusLabel() { return statusLabel; }
    public void setStatusLabel(String statusLabel) { this.statusLabel = statusLabel; }

    public String getAssignedTo() { return assignedTo; }
    public void setAssignedTo(String assignedTo) { this.assignedTo = assignedTo; }

    public java.util.UUID getEmailId() { return emailId; }
    public void setEmailId(java.util.UUID emailId) { this.emailId = emailId; }

}
