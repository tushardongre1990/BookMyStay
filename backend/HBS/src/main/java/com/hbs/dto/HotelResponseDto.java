package com.hbs.dto;

import com.hbs.entity.Hotel;

public class HotelResponseDto extends CommonApiResponse {
	
	private Hotel hotel;

	public Hotel getHotel() {
		return hotel;
	}

	public void setHotel(Hotel hotel) {
		this.hotel = hotel;
	}
	
	

}
