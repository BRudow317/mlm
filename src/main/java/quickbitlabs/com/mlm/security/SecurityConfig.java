package quickbitlabs.com.mlm.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // CSRF off for now; we can tighten later
            .csrf(AbstractHttpConfigurer::disable)

            .authorizeHttpRequests(auth -> auth
                // 1. SPA entry + static assets (Vite build copied into classpath:/static)
                .requestMatchers(
                    "/",              // SPA entry
                    "/index.html",
                    "/assets/**",
                    "/favicon.ico",
                    "/manifest.json",
                    "/robots.txt",
                    "/*.css",
                    "/*.js"
                ).permitAll()

                // 2. Public API endpoints (if you add some)
                .requestMatchers("/api/public/**").permitAll()

                // 3. Everything else requires auth
                .anyRequest().authenticated()
            )

            .formLogin(Customizer.withDefaults())
            .logout(logout -> logout.permitAll());

        return http.build();
    }
}
