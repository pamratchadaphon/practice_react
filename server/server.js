const express = require('express')
const cors = require('cors')

const app = express()

var corOptions = {
    origin:'https://localhost:8081',
    origin: 'http://localhost:3000'
}

//moddleware
app.use(cors(corOptions))

app.use(express.json())

app.use(express.urlencoded({extended:true}))


const routerFarmer = require('./routes/farmerRoutes')
app.use('/api/farmer', routerFarmer)

const routerVariety = require('./routes/varietyRouter')
app.use('/api/variety', routerVariety)

const routerDisease = require('./routes/diseaseRoutes')
app.use('/api/disease', routerDisease)

const routerRicecrop = require('./routes/ricecropRoutes')
app.use('/api/ricecrop', routerRicecrop)

const routerIncome = require('./routes/incomeRoutes')
app.use('/api/income', routerIncome)

const routerExpense = require('./routes/expenseRoutes')
app.use('/api/expense', routerExpense)

const routerIncomeExpense = require('./routes/incomeExpenseRouter')
app.use('/api/incomeExpense', routerIncomeExpense)

app.get('/',(req,res) => {
    res.json({ message : 'hii'})
})

const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})