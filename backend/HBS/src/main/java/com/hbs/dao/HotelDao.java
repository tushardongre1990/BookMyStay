package com.hbs.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hbs.entity.Hotel;
import com.hbs.entity.Location;

@Repository
public interface HotelDao extends JpaRepository<Hotel, Integer> {
	
	List<Hotel> findByLocation(Location locationId);
	
	void deleteById(int hotelId);
	
}
