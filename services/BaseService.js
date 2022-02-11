import axios from 'axios';

export default axios.create({


    // Production
    // baseURL:  'https://ask.abacusdesk.com/askApi/index.php/'
    // Developement
    baseURL:  'https://phpstack-414838-2222412.cloudwaysapps.com/askApi/index.php/'

});