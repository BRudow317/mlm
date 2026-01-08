
package quickbitlabs.com.mlm.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.config.Customizer;

/**
 * @Security configuration class to set up CSRF protection and request authorization.
 * 
 * @see https://docs.spring.io/spring-security/reference/servlet/exploits/csrf.html
 * @see https://docs.spring.io/spring-security/reference/servlet/authentication/index.html
 * 
 * 
 */

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            
            .csrf(csrf -> csrf
                // Disable CSRF for public API endpoints
                // .ignoringRequestMatchers("/api/contact/**")
                .ignoringRequestMatchers("/api/public/**")
                .ignoringRequestMatchers("/api/health/**")
                .spa()
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/csrf").permitAll() // Allow access to CSRF token endpoint
                .requestMatchers("/assets/**", "/dist/**", "/static/**").permitAll()
                .requestMatchers("/", "/favicon.ico", "/index.html", "/manifest.json").permitAll()
                .anyRequest().authenticated()
            )
            // .cors(Customizer.withDefaults())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .formLogin(Customizer.withDefaults())
            .logout((logout) -> logout.permitAll());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}