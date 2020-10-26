import { Router } from 'express';
import { FirebaseClient } from '../databases/firebase';
const firebaseClient = new FirebaseClient();

const router = Router();

//@route    POST /fb/account
//@desc     Add account data
router.post('/account', async (req, res, next) => {
    const accounts = req.body;
    try {
        await firebaseClient.addData(accounts)
    } catch (error) {
        throw error;
    }

    res.json({
        message: 'success'
    });
});

//@route    GET /fb/account
//@desc     Get all account data
router.get('/account', async (req, res, next) => {
    let accounts;
    try {
        accounts = await firebaseClient.getData();
    } catch (error) {
        return next(error);
    }
    res.json(accounts);
});

//@route    GET /fb/account/:id
//@desc     Get account by Id
router.get('/account/:id', async (req, res, next) => {
    const id = req.params.id;
    let account;
    try {
        account = await firebaseClient.getDataById(id)
    } catch (error) {
        return next(error)
    }
    res.json(account);
});

//@route    PUT /fb/account/:id
//@desc     Update account by id
router.put('/account/:id', async (req, res, next) => {
    const id = req.body.id;
    const update = req.body;
    let account;
    try {
        account = await firebaseClient.updateData(id, update)
    } catch (error) {
        return next(error)
    }
    res.json(account)
});

//@route    DELETE /fb/account/:id
//@desc     Delete accoubt by id
router.delete('/account/:id', async (req, res, next) => {
    const id = req.params.id;
    let account;
    try {
        await firebaseClient.deleteData(id)
    } catch (error) {
        return next(error);
    }
    res.json({
        message: 'Data deleted',
    })
});

//@route    GET /fb/account/number/:accNum
//@desc     Get account by account number
router.get('/account/number/:state', async (req, res, next) => {
    const state = req.params.state;
    let account;
    try {
        account = await firebaseClient.getDataByState(state)
    } catch (error) {
        return next(error)
    }
    res.json(account)
});

//@route    GET /fb/account/age/:age
//@desc     Get account by age
router.get('/account/age/:age', async (req, res, next) => {
    const age = Number(req.params.age)
    let accounts;
    try {
        accounts = await firebaseClient.getDataByAge(age);
    } catch (error) {
        return next(error)
    }
    res.send(accounts)
});

export default router;