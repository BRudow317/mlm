package quickbitlabs.com.mlm.security;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

// import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class RateLimiter implements HandlerInterceptor {
    
    private final Map<String, List<Long>> requestCounts = new ConcurrentHashMap<>();
    private static final int MAX_REQUESTS = 5;
    private static final long TIME_WINDOW = 15 * 60 * 1000; // 15 minutes
    
    @Override
    public boolean preHandle(HttpServletRequest request, 
                            HttpServletResponse response, 
                            Object handler) throws Exception {
        
        String ip = getClientIP(request);
        long currentTime = System.currentTimeMillis();
        
        requestCounts.putIfAbsent(ip, new ArrayList<>());
        List<Long> requests = requestCounts.get(ip);
        
        // Remove old requests outside time window
        requests.removeIf(time -> currentTime - time > TIME_WINDOW);
        
        if (requests.size() >= MAX_REQUESTS) {
            response.setStatus(429);
            response.getWriter().write("{\"error\": \"Too many requests\"}");
            return false;
        }
        
        requests.add(currentTime);
        return true;
    }
    
    private String getClientIP(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        return (xfHeader != null) ? xfHeader.split(",")[0] : request.getRemoteAddr();
    }
}
