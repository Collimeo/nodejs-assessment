const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.get('/' , (req , res)=>{
   res.send('Welcome on my server! See <a href="/random" style="color:green;">random fact</a> or <a href="/daily" style="color:red;">daily fact</a>, both useless!')
})
app.get(/\/random|\/daily/, async (req, res) => {
    let pathname = req.path == '/daily' ? '/today' : '/random';
    try{
        const raw_random_fact = await fetch(`https://uselessfacts.jsph.pl/api/v2/facts/${pathname}?language=en`)
        const random_fact = await raw_random_fact.json();
        if(random_fact) {
            return res.json({"useless_fact": random_fact.text});
        } 
    } catch(err) {
        return res.send(err)
    } 
    return res.json({"success": false});
})
app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))