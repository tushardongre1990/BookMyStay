package com.hbs.dto;

import java.util.List;

import com.hbs.entity.User;

public class UsersResponseDto extends CommonApiResponse {
	
	private List<User> users;
	
	private User user;

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	

}
