const express = require("express");
const router = express.Router();

//Working test
//IDEA maybe move back to the cart route,
//store items will be from the db

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

//test data
const storeItems = new Map([
    [1, {priceInCents: 10000, name: "product one"}],
    [2, {priceInCents: 20000, name: "product two"}]
])


//check out route, id of the user
router.get('/checkout', async(req,res,next) => {
    // checkout route, get user.session.id to find the cart
    
    })
    
    router.post("/checkout", async (req, res) => {
        try {
           const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.SERVER_URL}/`,
            cancel_url: `${process.env.SERVER_URL}/cart/:id`
        
            })
            res.json({url: session.url})
        } catch (e) {
            res.status(500).json({error: e.message})
        }
      
      })
    
    //Stripe checkout is in app.js
    //dom manipulation is in public/js/script.js

module.exports = router;