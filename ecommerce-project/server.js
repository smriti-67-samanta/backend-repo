const express=require("express")
const app=express()
const PORT=5000

app.use(express.json())

let products=[]
let users=[]
app.post("/products",(req,res)=>{
    const{name,category,price,inStock=true}=req.body

    if(!name || !category || !price || price <1){
        return res.status(400).send({message:"product not found"})
    }


const product={id:products.length+1,
    category,
    name,
    price,
    inStock,
    createdAt:new Date()

}

products.push(product)
res.status(201).send(product)

})

app.get("/products",(req,res)=>{
    res.send(products)
})

app.patch("/products/:id",(req,res)=>{
    const id=parseInt(req.params.id)
    const product=products.find((p)=>p.id===id)

    if(!product){
        return res.status(404).send({message:"product not found"})
    }
    Object.assign(product,req.body)
    res.send(product)

})
app.delete("products/:id",(req,res)=>{
    const id=parseInt(req.params.id)
    const index=products.findIndex((p)=>p.id===id)
    if(index===-1){
        return res.status(404).send({message:"product not found"})
    }
    const deleted=products.splice(index,1)
    res.send(deleted[0])
})

app.post("/users",(req,res)=>{
    const{name,email,address}=req.body
    if(!name || !email){
        return res.status(400).send({message:" user not found"})

    }

    const userFound=users.some((u)=>u.email===email)

    if(userFound){
        return res.status(400).send({message:"email registered"})
    }
    const user={ id:users.length+1,
        name,
        email,
        address,
    }
    users.push(user)
    res.status(201).send(user)
    
})

app.get("/users",(req,res)=>{
    res.send(users)
})

app.listen(PORT,()=>{
     console.log(`Server running on http://localhost:${PORT}`);
})