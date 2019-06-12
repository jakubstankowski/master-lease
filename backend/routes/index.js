const express = require('express');
const router = express.Router();

const PagesController = require('../controllers/PagesController');
const ReservationController = require('../controllers/ReservationController');
const NewsletterController = require('../controllers/NewsletterController');
const CourseController = require('../controllers/CourseController');
const AboutController = require('../controllers/AboutController');
const JoinToCourse = require('../controllers/JoinToCourse');




router.get('/api/courses',
  CourseController.get
  );

router.post('/api/courses',
  CourseController.post
);

router.post('/api/join-to-course',
  JoinToCourse.post
  );


/*router.get('/api/abouts',
  AboutController.get
);


router.post('/api/abouts',
  AboutController.post
);*/

router.get('/',
  PagesController.home
);

router.post('/reservation',
  ReservationController.store
);


router.post('/newsletter',
  NewsletterController.store
);





module.exports = router;
