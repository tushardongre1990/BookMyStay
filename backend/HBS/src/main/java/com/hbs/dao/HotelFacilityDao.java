package com.hbs.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.hbs.entity.HotelFacility;

@Repository
public interface HotelFacilityDao extends JpaRepository<HotelFacility, Integer> {
	
	List<HotelFacility> findByHotelId(int hotelId);
	
	 // Custom method to find a specific HotelFacility entity based on hotel ID and facility ID
    Optional<HotelFacility> findByHotelIdAndFacilityId(int hotelId, int facilityId);
}


