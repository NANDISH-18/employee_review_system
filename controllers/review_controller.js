const User = require('../models/user');
const Review = require('../models/review');

// Create review cotroller
module.exports.newReview = async(req,res) => {
    try {
        // first find reciepents
        let recipient = await User.findById(req.params.id);
        // console.log("Recipient:"+recipient);
        if(!recipient){
            console.log('Invalid Recipient');
            return res.redirect('/');
        }
        for(let i=0;i<req.user.userToReview.length;i++){
            if(req.user.userToReview[i] == recipient.id){
                let deleted = req.user.userToReview.splice(i,1);
                req.user.save();
            }
        }

        // Take reviewer and reviewed
        for(let i=0;i<recipient.reviewRecievedFrom.length;i++){
            if(req.user) {
                if(recipient.reviewRecievedFrom[i] == req.user.id){
                    req.user.userToReview.pop(i);
                    const new_review = Review.create({
                        reviewer: recipient.id,
                        reviewed: req.user.id,
                        content: req.query.newReview
                    })
                    // if there is no new review
                    if(!new_review){
                        console.log("Review is not created");
                    }
                    return res.redirect('/');
                }
            }else{
                console.log('User is not login');
                req.flash('error','Please Login');
                return res.redirect('/users/sign-in');
            }
        }
        return res.redirect('/');

    } catch (error) {
            console.log(error);
            return;
    }
}