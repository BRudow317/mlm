package quickbitlabs.com.mlm.web;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import quickbitlabs.com.mlm.security.RateLimiter;


@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Autowired
    private RateLimiter rateLimiter;
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(rateLimiter)
                .addPathPatterns("/api/public/contact/**")
                .addPathPatterns("/api/health/**");
    }
}
