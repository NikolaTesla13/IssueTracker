const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Issue = require('../server/Issue');
const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(express.json()) 
const port = 3000

mongoose.connect(
    "",
    { useUnifiedTopology: true }, 
    () => {
        console.log("C O N N E C T E D");
});

app.get('/', async (req, res) => {
    try {
        const issues = await Issue.find();
        res.json(issues);
    } catch(err) {
        res.json({message: err});
    }
});

app.post('/', async (req, res) => {
    const issue = new Issue({
        title: req.body.title,
        text: req.body.text,
        author: req.body.author,
        asignedTo: req.body.asignedTo,
        status: req.body.status
    });

    try {
        const savedIssue = await issue.save();
        res.json(savedIssue);
    } catch(err){
        res.json({message: error})
    }
});

app.delete('/:issueId', async (req,res)=>{
    try{
        const removedIssue = await Issue.remove({_id: req.params.issueId});
        res.json(removedIssue);
    } catch(err){
        res.json({message: err})
    }
});

app.patch('/:issueId', async (req,res)=>{
    try{
        const updatedIssue = await Issue.updateOne({_id: req.params.issueId}, { $set: {
            title: req.body.title, 
            text: req.body.text,
            author: req.body.author,
            asignedTo: req.body.asignedTo,
            status: req.body.status
        }});
        res.json(updatedIssue);
    } catch(err){
        res.json({message: err})
    }
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
