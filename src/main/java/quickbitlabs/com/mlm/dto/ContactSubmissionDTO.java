package quickbitlabs.com.mlm.dto;

public class ContactSubmissionDTO {
    private String name;
    private String email;
    private String phone;
    private String message;
    private String address;
    private String honey; // Honeypot field

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getHoney() { return honey; }
}
