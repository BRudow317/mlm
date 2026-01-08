package quickbitlabs.com.mlm.web;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import quickbitlabs.com.mlm.security.RateLimiter;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    private final RateLimiter rateLimiter;
    
    // Constructor injection (better than @Autowired)
    public WebConfig(RateLimiter rateLimiter) {
        this.rateLimiter = rateLimiter;
    }
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(rateLimiter)
                .addPathPatterns("/api/contact/**");
    }
}