
const Users = require('../models/user')

//Sow employee list
module.exports.showEmployeeList = async function(req,res){
    if(!req.isAuthenticated()){
        req.flash('error','You are not authorized');
        return res.redirect('/users/sign-in');
    }
    // Check if user is admin or not
    if(req.user.isAdmin == false){
        req.flash('error','You are not authorized');
        return res.redirect('/');
    }

    let employeeList = await Users.find({});

    return res.render('employee',{
        title: 'ERS | Employee-List',
        employes: employeeList
    })
} 

// Assign work
module.exports.assignWork = async function(req,res){
    let employe = await Users.find({});

    return res.render('admin',{
        title: 'ERS | Assign Work',
        employe: employe
    });
}

// This function is for making the new Admin
module.exports.newAdmin = async function(req,res){
    try {
        // Check the authentication
        if(!req.isAuthenticated()){
            req.flash('success','Please LogIn');
            return res.redirect('/users/sign-in');
        }

        // Checking for authorization
        if(req.user.isAdmin == false){
            req.flash('error', 'You are not admin');
            return res.redirect('/');
        }
        // Making the user admin
        if(req.user.isAdmin){
            let user = await Users.findById(req.body.selectedUser);
            if(!user){
                return res.redirect('back');
            }
            req.flash('success','New admin added');
            user.isAdmin = 'true';
            user.save();
            return res.redirect('back');
        }


    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

// This function will set the reviewer and review
module.exports.setReviewAndReviewer =  async function(req,res){
    try {
        // Check the authentication
        if(!req.isAuthenticated()){
            req.flash('success','Please LogIn');
            return res.redirect('/users/sign-in');
        }else{
            let employee = await Users.findById(req.user.id);

            if(employee.isAdmin == false){
                req.flash('error', 'You are not admin');
                return res.redirect('/users/sign-in');
            }
            else if(req.body.sender == req.body.reciver){
                req.flash('error', 'Sender and reciever should not be same');
                return res.redirect('back');
            }
            // main part
            else{
                let sender = await Users.findById(req.body.sender);
                let reciever = await Users.findById(req.body.reciver);

                sender.userToReview.push(reciever);
                sender.save();
                reciever.reviewRecievedFrom.push(sender);
                reciever.save();
                req.flash('success','Task Assigned');
                return res.redirect('back');
            }

        }

    } catch (error) {
        console.log("errr in setting up the user",error);
    }
}

// Delete Employee
module.exports.deleteEmployee = async function(req,res){
    // Check the authentication
    try {
        if(!req.isAuthenticated()){
            req.flash('success','Please LogIn');
            return res.redirect('/users/sign-in');
        }
        if(!req.user.isAdmin){
            req.flash('error' , 'You are not admin !')
            return res.redirect('/');
        }
    
        // Deleting the user
        let employee = await Users.deleteOne({_id : req.params.id});
        console.log('employee deleted');
        req.flash('success','User deleted');
        return res.redirect('back');
    
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }   

}

module.exports.addEmployee = function(req,res){
    return res.render('addEmployee',{
        title: 'ERS | Add Employee'
    });
}