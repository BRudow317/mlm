package quickbitlabs.com.mlm.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "accounts")
public class Account extends BaseEntity {
    private String name;
    private String industry;
    private String website;

    // Foreign references (IDs)
    private java.util.UUID caseId;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getIndustry() { return industry; }
    public void setIndustry(String industry) { this.industry = industry; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public java.util.UUID getCaseId() { return caseId; }
    public void setCaseId(java.util.UUID caseId) { this.caseId = caseId; }
}
