package com.hbs.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hbs.dao.HotelReviewDao;
import com.hbs.entity.HotelReview;

@Service
public class HotelReviewService {
	
	@Autowired
	private HotelReviewDao hotelReviewDao;
	
	public HotelReview addHotelReview(HotelReview review) {
		return hotelReviewDao.save(review);
	}
	
	public List<HotelReview> fetchHotelReviews(int hotelId) {
		return hotelReviewDao.findByHotelId(hotelId);
	}

}
