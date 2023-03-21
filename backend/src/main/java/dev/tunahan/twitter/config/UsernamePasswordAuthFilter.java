package dev.tunahan.twitter.config;

import java.io.IOException;

import com.fasterxml.jackson.databind.ObjectMapper;

import dev.tunahan.twitter.Dtos.CredentialsDto;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpMethod;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

public class UsernamePasswordAuthFilter extends OncePerRequestFilter {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    private final UserAuthenticationProvider userAuthenticationProvider;

    public UsernamePasswordAuthFilter(UserAuthenticationProvider userAuthenticationProvider) {
        this.userAuthenticationProvider = userAuthenticationProvider;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse,
            FilterChain filterChain) throws ServletException, IOException {
        System.out.println("Validation username password");
        if ("/sign2-in".equals(httpServletRequest.getServletPath())
                && HttpMethod.POST.matches(httpServletRequest.getMethod())) {
            CredentialsDto credentialsDto = MAPPER.readValue(httpServletRequest.getInputStream(), CredentialsDto.class);
            System.out.println("Password authentication");
            System.out.println(credentialsDto.getUser_name());
            try {
                SecurityContextHolder.getContext().setAuthentication(
                        userAuthenticationProvider.validateCredentials(credentialsDto));
                System.out.println("end of try");
            } catch (RuntimeException e) {
                System.out.println("catched");
                SecurityContextHolder.clearContext();
                throw e;
            }
        }
        System.out.println("ı am out");
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}