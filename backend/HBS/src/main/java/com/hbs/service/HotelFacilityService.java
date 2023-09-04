package com.hbs.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hbs.controller.FacilityController;
import com.hbs.dao.HotelFacilityDao;
import com.hbs.entity.HotelFacility;

@Service
public class HotelFacilityService {
	Logger LOG = LoggerFactory.getLogger(FacilityController.class);
	@Autowired
	private HotelFacilityDao hotelFacilityDao;
	
	public List<HotelFacility> getHotelFacilitiesByHotelId(int hotelId) {
		return this.hotelFacilityDao.findByHotelId(hotelId);
	}
	
	public HotelFacility addFacility(HotelFacility hotelFacility) {
	    return this.hotelFacilityDao.save(hotelFacility);
	}
	
	
	public boolean removeFacility(HotelFacility hotelFacility) {
        try {
            hotelFacilityDao.delete(hotelFacility);
            return true;
        } catch (Exception e) {
            LOG.error("Error removing Hotel Facility: {}", e.getMessage());
            return false;
        }
    }

	public HotelFacility getHotelFacilityByHotelAndFacilityId(int hotelId, int facilityId) {
        Optional<HotelFacility> hotelFacilityOptional = hotelFacilityDao.findByHotelIdAndFacilityId(hotelId, facilityId);
        return hotelFacilityOptional.orElse(null);
    }

}
