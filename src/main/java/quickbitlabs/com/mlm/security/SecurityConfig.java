package quickbitlabs.com.mlm.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests((requests) -> requests
                // 1. Allow Static Resources (Vite usually puts them in /assets)
                .requestMatchers("frontend/dist/**",
                                    "/assets/**", 
                                    "/images/**", 
                                    "/public/**"
                                ).permitAll()
                
                // 2. Allow Root files (favicon, manifest, index.html)
                .requestMatchers("/", 
                                    "/index.html", 
                                    "/favicon.ico", 
                                    "/*.js", 
                                    "/*.css"
                                ).permitAll()
                
                // 3. Allow Public API endpoints
                .requestMatchers("/api/public/**").permitAll()
                
                // 4. Require Auth for everything else (Admin, etc)
                .anyRequest().authenticated()
            )
            // default login: user/password: user/user
            .formLogin(Customizer.withDefaults())
            .logout((logout) -> logout.permitAll());

        return http.build();
    }
}

// "/assets/**",
// "/*.js",
// "/*.css",
// "/index.html",
// "/*.jpg"
