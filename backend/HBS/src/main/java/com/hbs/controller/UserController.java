package com.hbs.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hbs.dto.CommonApiResponse;
import com.hbs.dto.UserDto;
import com.hbs.dto.UserLoginRequest;
import com.hbs.dto.UserLoginResponse;
import com.hbs.dto.UserRoleResponse;
import com.hbs.dto.UsersResponseDto;
import com.hbs.entity.User;
import com.hbs.service.CustomUserDetailsService;
import com.hbs.service.UserService;
import com.hbs.utility.Constants.ResponseCode;
import com.hbs.utility.Constants.Sex;
import com.hbs.utility.Constants.UserRole;
import com.hbs.utility.JwtUtil;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("api/user/")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	Logger LOG = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserService userService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Autowired
	private JwtUtil jwtUtil;

	
	
	@PostMapping("register")
	@ApiOperation(value = "API to Register User")
	public ResponseEntity<?> register(@RequestBody User user) {
		LOG.info("Recieved request for User  register");

		CommonApiResponse response = new CommonApiResponse();
		String encodedPassword = passwordEncoder.encode(user.getPassword());

		user.setPassword(encodedPassword);

		Boolean registerUser = userService.registerUser(user);

		if (registerUser == true) {
			response.setResponseCode(ResponseCode.SUCCESS.value());
			response.setResponseMessage(user.getRole() + " User Registered Successfully");
			return new ResponseEntity(response, HttpStatus.OK);
		}

		else {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("Failed to Register " + user.getRole() + " User");
			return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("login")
	@ApiOperation(value = "API to Login User")
	public ResponseEntity<?> login(@RequestBody UserLoginRequest userLoginRequest) {
		LOG.info("Recieved request for User Login");

		String jwtToken = null;
		UserLoginResponse userLoginResponse = new UserLoginResponse();
        User user = null;
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(userLoginRequest.getEmailId(), userLoginRequest.getPassword()));
		} catch (Exception ex) {
			LOG.error("Autthentication Failed!!!");
			userLoginResponse.setResponseCode(ResponseCode.FAILED.value());
			userLoginResponse.setResponseMessage("Failed to Login as " + userLoginRequest.getEmailId());
			return new ResponseEntity(userLoginResponse, HttpStatus.BAD_REQUEST);
		}

		UserDetails userDetails = customUserDetailsService.loadUserByUsername(userLoginRequest.getEmailId());

		for (GrantedAuthority grantedAuthory : userDetails.getAuthorities()) {
			if (grantedAuthory.getAuthority().equals(userLoginRequest.getRole())) {
				jwtToken = jwtUtil.generateToken(userDetails.getUsername());
			}
		}

		// user is authenticated
		if (jwtToken != null) {

			user = userService.getUserByEmailId(userLoginRequest.getEmailId());
			
			userLoginResponse = User.toUserLoginResponse(user);
			
			userLoginResponse.setResponseCode(ResponseCode.SUCCESS.value());
			userLoginResponse.setResponseMessage(user.getFirstName() + " logged in Successful");
			userLoginResponse.setJwtToken(jwtToken);
			return new ResponseEntity(userLoginResponse, HttpStatus.OK);
		
		}

		else {

			userLoginResponse.setResponseCode(ResponseCode.FAILED.value());
			userLoginResponse.setResponseMessage("Failed to Login as " + userLoginRequest.getEmailId());
			return new ResponseEntity(userLoginResponse, HttpStatus.BAD_REQUEST);
		}
	}
	
	
	@GetMapping("id")
	@ApiOperation(value = "API to fetch User using userId")
	public ResponseEntity<?> fetchUser(@RequestParam int userId) {
		
		UsersResponseDto response = new UsersResponseDto();
		
		User user = userService.getUserById(userId);
		
		if(user == null) {
			response.setResponseCode(ResponseCode.SUCCESS.value());
			response.setResponseMessage("No User with this Id present");
		}
		
		response.setUser(user);
		response.setResponseCode(ResponseCode.SUCCESS.value());
		response.setResponseMessage("User Fetched Successfully");
		
		return new ResponseEntity(response, HttpStatus.OK);
	}
	
	@GetMapping("hotel")
	@ApiOperation(value = "API to fetch all Hotel Manager")
	public ResponseEntity<?> fetchAllHotelUsers() {
		
		UsersResponseDto response = new UsersResponseDto();
		
		List<User> users = userService.getUsersByRoleAndHotelId(UserRole.HOTEL.value(), 0);
		
		if(users == null || users.isEmpty()) {
			response.setResponseCode(ResponseCode.SUCCESS.value());
			response.setResponseMessage("No Users with Role Hotel found");
		}
		
		response.setUsers(users);
		response.setResponseCode(ResponseCode.SUCCESS.value());
		response.setResponseMessage("Hotel Users Fetched Successfully");
		
		return new ResponseEntity(response, HttpStatus.OK);
	}

	
	
	

	
	@GetMapping("roles")
	@ApiOperation(value = "API to fetch all User Roles")
	public ResponseEntity<?> getAllUsers() {
		
		UserRoleResponse response = new UserRoleResponse();
		List<String> roles = new ArrayList<>();
		
		for(UserRole role : UserRole.values() ) {
			roles.add(role.value());
		}
		
		if(roles.isEmpty()) {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("Failed to Fetch User Roles");
			return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		else {
		    response.setRoles(roles);
			response.setResponseCode(ResponseCode.SUCCESS.value());
			response.setResponseMessage("User Roles Fetched success");
			return new ResponseEntity(response, HttpStatus.OK);
		}
		
	}
	
	@GetMapping("gender")
	@ApiOperation(value = "API to fetch all User Genders")
	public ResponseEntity<?> getAllUserGender() {
		
		UserRoleResponse response = new UserRoleResponse();
		List<String> genders = new ArrayList<>();
		
		for(Sex gender : Sex.values() ) {
			genders.add(gender.value());
		}
		
		if(genders.isEmpty()) {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("Failed to Fetch User Genders");
			return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		else {
			response.setGenders(genders);
			response.setResponseCode(ResponseCode.SUCCESS.value());
			response.setResponseMessage("User Genders Fetched success");
			return new ResponseEntity(response, HttpStatus.OK);
		}
		
	}

}
