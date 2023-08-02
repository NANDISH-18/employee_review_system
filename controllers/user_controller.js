// Include user Schema
const User = require('../models/user');

// Rendering the sign up page

module.exports.signUp = function(req,res){
    return res.render('sign_up',{
        title: 'ERS | SignUp'
    });
}

// create the user
module.exports.create = async function(req,res){
    // Check password and confirm password is same or not
    console.log(req.body);
    if(req.body.password != req.body.confirmPassword){
        // display flash message
        req.flash('error','Password should be equal to Confirm Password');
        return res.redirect('back');
    }
    const user = await User.findOne({ email: req.body.email });
    if(!user){
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: false,
        });
        return res.redirect('/users/sign-in');
    }else{
        return res.redirect('back');

    }
}


// Rendering sign in page
module.exports.signIn = function(req,res){
    return res.render('sign_in',{
        title: 'ERS | SignIn'
    })
}

// Create session
module.exports.createSession = function(req,res){
    req.flash('success','You are logged In');
    return res.redirect('/');
}

// This function is used for making the new admin, it is admin specific, function
module.exports.makeAdmin = async function(req,res){
    try {
        if(req.body.admin_password == 'Happy'){
            let user = await User.findById(req.user.id);
            user.isAdmin= true;
            user.save();
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
        
    } catch (error) {
        console.log('Error',error);
        return;
    }
}

// Adding Employee
module.exports.addEmployee = async function(req,res){
    console.log(req.body)
    if(req.body.password != req.body.confirmPassword){
        return res.redirect('back');
    }
    const user = await User.findOne({ email: req.body.email });
    if(!user){
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: false,
        });
        return res.redirect('/admin/view-employee');
    }else{
        return res.redirect('back');

    }
}

// Destroy session
module.exports.destroySession = function(req,res,done){
    return req.logout((err) => {
        if(err){
            return done(err);
        }
        return res.redirect('/users/sign-in')
    })
}

// forrget password page
module.exports.forgetPasswordPage = function(req, res){
    return res.render('forget_password',{
        title : 'Forget Password'
    });
}

// Update the existing password with newly created password
module.exports.forgetPasswordLink = async function(req, res){
    let user = await User.findOne({ email: req.body.email });
    if(!user){
        return res.redirect('/users/signUp');
    }
    if(req.body.password == req.body.confirmPassword){
        req.flash('success' , 'Password Changed :)');
        user.password = req.body.password;
        await user.updateOne({password : req.body.password});
        return res.redirect('/users/sign-in');
    }
    return res.redirect('back');

}


