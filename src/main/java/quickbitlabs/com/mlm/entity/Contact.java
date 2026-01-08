package quickbitlabs.com.mlm.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;

@Entity
@Table(name = "contacts")
public class Contact extends BaseEntity {
    private String name;
    private String phone;
    private String email;
    private String address;
    private String message;
    private String honey;


    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getHoney() { return honey; }
    public void setHoney(String honey) { this.honey = honey; }
}