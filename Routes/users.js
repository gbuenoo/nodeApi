const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
const config = require('../config/config');



const createUserToken = (userid) => {
    return jwt.sign({ id: userid }, config.jwt_secret, {expiresIn: config.jwt_expires_in});
}; 

router.get('/', auth, async (req, res) => {     
    try{
        const users = await Users.find({});
        return res.send(users);
    } catch (err){
        return res.status(500).send({ error: 'Erro na consulta de usuaŕios!' });
    }
});

router.post('/create', async (req, res) => {   
    const {email, password} = req.body;  
    
    if(!email || !password) return res.status(400).send({ error: 'Dados insuficientes!' });

    try{
        if (await Users.findOne({email})) return res.send({ error: 'Erro ao buscar usuario!'});

        const user = await Users.create(req.body);
        user.password = undefined;

        return res.send({user, token: createUserToken(user.id)});
    } catch(err){
        return res.status(500).send({ error: 'Erro ao buscar usuario!'});
    }
});



router.post('/auth', async (req, res) => {
    const {email, password} = req.body;  

    if(!email || !password) return res.status(400).send({error: 'Dados insuficientes!'});
    
    try {
        const user = await Users.findOne({email}).select('+password');
        if (!user) return res.status(400).send({error: 'Usuario não registrado!'});
        
        const auth = await bcrypt.compare(password, user.password);

        if(!auth) return res.status(401).send({error: 'Erro ao autenticar usuario!'});
        user.password = undefined;
        return res.send({user, token: createUserToken(user.id)});

    } catch(err){
        return res.status(500).send({error: 'Erro ao buscar usuario!'});
    }

});

module.exports = router;