package quickbitlabs.com.mlm.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "emails")
public class Email extends BaseEntity {
    private String email;
    private java.util.UUID contactId;

    public String getToAddress() { return email; }
    public void setToAddress(String email) { this.email = email; }

    public java.util.UUID getContactId() { return contactId; }
    public void setContactId(java.util.UUID contactId) { this.contactId = contactId; }

}
