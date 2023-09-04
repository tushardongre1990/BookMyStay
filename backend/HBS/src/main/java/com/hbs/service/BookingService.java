package com.hbs.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hbs.dao.BookingDao;
import com.hbs.entity.Booking;

@Service
public class BookingService {
	
	@Autowired
	private BookingDao bookingDao;
	
	public Booking bookHotel(Booking booking) {
		return bookingDao.save(booking);
	}

	public List<Booking> getAllBookings() {
		return bookingDao.findAll();
	}
	
	public List<Booking> getMyBookings(int userId) {
		return bookingDao.findByUserId(userId);
	}
	
	public List<Booking> getMyHotelBookings(int hotelId) {
		return bookingDao.findByHotelId(hotelId);
	}
	
	public Booking getBookingById(int bookingId) {
		return bookingDao.findById(bookingId).get();
	}
	
	
}
