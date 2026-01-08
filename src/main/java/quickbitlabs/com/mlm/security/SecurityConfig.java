
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
            .csrf(csrf -> csrf
                // Disable CSRF for public API endpoints
                .ignoringRequestMatchers("/api/contact/**")
                .ignoringRequestMatchers("/api/public/**")
                .ignoringRequestMatchers("/api/health/**")
            )
            .authorizeHttpRequests((requests) -> requests
                // 1. SECURE YOUR DATA (The most important part)
                // Any request to the API requires login.
                .requestMatchers("/api/private/**").authenticated() // Example private route
                .requestMatchers("/api/admin/**").authenticated()
                
                // 2. EXPLICIT PUBLIC API
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/contact/**").permitAll()
                .requestMatchers("/api/health/**").permitAll()
                // 3. ALLOW FRONTEND RESOURCES
                // Allow Vite assets (hashed JS/CSS usually live here)
                .requestMatchers("/assets/**").permitAll()
                .requestMatchers("/dist/**").permitAll()
                .requestMatchers("/static/**").permitAll()
                // Allow root files
                .requestMatchers("/favicon.ico", "/index.html", "/manifest.json").permitAll()

                // 4. THE SPA FIX: ALLOW "EVERYTHING ELSE"
                // If it's not an /api/ route (handled above), it's likely a frontend route 
                // like /dashboard, /profile, /settings. 
                // We permit these so the Spring Controller can forward them to index.html.
                // NOTE: This relies on your API routes being strictly prefixed (e.g. with /api)
                .anyRequest().permitAll() 
            )
            .formLogin(Customizer.withDefaults())
            .logout((logout) -> logout.permitAll());

        return http.build();
    }
}