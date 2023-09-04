package com.hbs.dto;

import java.util.List;

import com.hbs.entity.Location;

public class LocationFetchResponse extends CommonApiResponse {
	
    private List<Location> locations;

	public List<Location> getLocations() {
		return locations;
	}

	public void setLocations(List<Location> locations) {
		this.locations = locations;
	}
    
    
    
    

}
