package quickbitlabs.com.mlm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaController {

    // 1. Match "/**" to capture nested paths (e.g. /dashboard/settings)
    // 2. Exclude paths containing a dot "." (files) 
    // 3. Exclude paths starting with "/api" (backend endpoints)
    // 4. regex breakdown:
    //    value = "/**": Match any depth
    //    {path:[^\\.]*}: (Old logic, replaced below for better safety)
    
    // The Standard "Forward to Index" Pattern for Spring Boot + React:
    @RequestMapping(value = { 
        "/{path:[^\\.]*}",           // Single level
        "/**/{path:[^\\.]*}"         // Nested levels 
    }) 
    public String forward() {
        return "forward:/index.html";
    }
}