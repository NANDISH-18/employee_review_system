const User = require('../models/user');
const Review = require('../models/review');

module.exports.home = async function(req,res){
    try {
        if(!req.isAuthenticated()){
            req.flash('error','please login');

            return res.redirect('/users/sign-in');
        }
        // Fetching the user and review from the form
        let user = await User.findById(req.user.id);
        let review = await Review.find({reviewer: req.user.id});
        // Taking the all necessary part of recipent user
        let recipent = [];
        for(let i=0;i<user.userToReview.length;i++){
            let userName = await User.findById(user.userToReview[i]);
            recipent.push(userName);
        }

        // Taking all the necessary part of the reviewers in review array, and passing it in home page
        let reviews = [];
        for(let i =0;i<review.length;i++){
            let reviewUser = await User.findById(review[i].reviewed);
            if(reviewUser != null){
                let currUser ={
                    name: reviewUser.name,
                    content: review[i].content
                }
                reviews.push(currUser);
            }
        }

        // Render the page, with the variable made above , and pass them as the argument
        return res.render('home',{
            title: "ERS | HOME",
            recipent: recipent,
            reviews: reviews,
            user: user
        })
        
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}