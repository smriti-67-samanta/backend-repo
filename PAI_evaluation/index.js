const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser')

const app= express()
app.get('/', (req,res)=>{
    res.send("welcome to my server")
})

app.get('/restaurent', (req,res)=>{
    res.send("welcome to RESTAURENT ")
})

app.get('/cuisin', (req,res)=>{
    res.send("CUISIN")
})

app.get('/review', (req,res)=>{
    res.send("REVIEW")
})
app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000")
})