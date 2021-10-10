const express=require('express')
const Razorpay=require('razorpay')
const cors=require('cors')
const bodyparser=require("body-parser")
const crypto=require("crypto")

const app = express()
const razorpay=new Razorpay({
    key_id:'rzp_test_18ChUAHoxDZNj3',
    key_secret:'jTVskolHU7pnWwj8AM1v9Js'
})
const port = 8080
const path=require('path')
const bodyParser = require('body-parser')
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs')
app.use(cors())
app.use((express.json()))
app.use(
    bodyParser.urlencoded({
        extended:false
    })
)
app.use(bodyParser.json())

app.get('/', (req, res) => {

    res.sendFile('views/index.ejs', { root: __dirname })
    res.render('index.ejs')
    //   stripePublickey:stripePublickey
   

})
app.post('/createOrder', (req, res)=>{ 
  
    // STEP 1:
    // const {amount,currency,receipt, notes}  = req.body;      
    app.post('/createOrder', (req, res)=>{ 
  
        // STEP 1:
        const {amount,currency,receipt, notes}  = req.body;      
              
        // STEP 2:    
        razorpay.orders.create({amount, currency, receipt, notes}, 
            (err, order)=>{
              
              //STEP 3 & 4: 
              if(!err)
                res.json(order)
              else
                res.send(err);
            }
        )
    });
    
});
    

// const instance=new 

app.listen(port, () => {
    console.log(`Website is  listening at http://localhost:${port}`)
  })

