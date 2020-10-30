const User = require('./auth-dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.createUser = (req, res, next)=>{
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        pass: bcrypt.hashSync(req.body.pass)
    }

    User.create (newUser,(err, user)=>{
        if (err && err.code === 11000 ) return res.status(409).send('Email ya existe');
        if (err) return res.status(500).send('server error');
        const expiresIn = 24*60*60;
        const accessToken = jwt.sign({ id: user.id },
            SECRET_KEY, {
                expiresIn: expiresIn
            });
            const dataUser = {
                name: user.name,
                email: user.email,
                accessToken: accessToken,
                expiresIn: expiresIn
            }

            //RESPONSE
            res.send({ dataUser });
    } )
}

exports.loginUser = (req, res, next) =>{
    const userData ={
        email: req.body.email,
        pass: req.body.pass,
    }
    User.findOne({email: userData.email}, (err, user)=> {
        if (err) return res.status(500).send('Server error');

        if (!user){
            //mail no existe
            res.status(409).send({message: 'Algo está mal'});
        } else{
            const resultPass=bcrypt.compareSync(userData.pass, user.pass);
            if (resultPass) {
                const expiresIn = 24*60*60;
                const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });

                const dataUser = {
                    name: user.name,
                    email: user.email,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
                res.send({ dataUser });
            } else {
                //pass mal
                res.status(409).send({message: 'Algo está mal'});
            }
        }
    })
}