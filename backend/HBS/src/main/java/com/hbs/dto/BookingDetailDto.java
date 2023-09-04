package com.hbs.dto;

import java.util.List;

public class BookingDetailDto extends CommonApiResponse {
	
	List<BookingDto> bookings;

	public List<BookingDto> getBookings() {
		return bookings;
	}

	public void setBookings(List<BookingDto> bookings) {
		this.bookings = bookings;
	}
	
}
