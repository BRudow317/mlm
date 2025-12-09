package quickbitlabs.com.mlm.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "emails")
public class Email extends BaseEntity {
    private String fromAddress;
    private String toAddress;
    private String subject;
    @Column(length = 4000)
    private String body;

    public String getFromAddress() { return fromAddress; }
    public void setFromAddress(String fromAddress) { this.fromAddress = fromAddress; }

    public String getToAddress() { return toAddress; }
    public void setToAddress(String toAddress) { this.toAddress = toAddress; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getBody() { return body; }
    public void setBody(String body) { this.body = body; }

}
