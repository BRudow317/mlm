package quickbitlabs.com.mlm.controller;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


//https://docs.spring.io/spring-security/reference/servlet/exploits/csrf.html
@RestController
public class CsrfController {
  @GetMapping("/csrf")
  public CsrfToken csrf(CsrfToken csrfToken) {
    return csrfToken;
  }
}
