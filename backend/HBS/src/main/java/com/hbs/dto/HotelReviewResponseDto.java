package com.hbs.dto;

import java.util.List;

public class HotelReviewResponseDto extends CommonApiResponse {
	
	private List<HotelReviewDto> hotelReviews;

	public List<HotelReviewDto> getHotelReviews() {
		return hotelReviews;
	}

	public void setHotelReviews(List<HotelReviewDto> hotelReviews) {
		this.hotelReviews = hotelReviews;
	}
	
	

}
