const express = require('express');
const nodemailer = require("nodemailer");
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

let transporterFaleConosco = nodemailer.createTransport({
    host: "smtps.uhserver.com",
    port: 465,
    secure: true,
    auth: {
        user: "faleconosco@realenergy.com.br",
        pass: "real@0102"
    }

});



let transporterDenuncia = nodemailer.createTransport({
    host: "smtps.uhserver.com",
    port: 465,
    secure: true,
    auth: {
        user: "denuncia@realenergy.com.br",
        pass: "real@0102"
    }

});

let transporterTrabalhe = nodemailer.createTransport({
    host: "smtps.uhserver.com",
    port: 465,
    secure: true,
    auth: {
        user: "trabalheconosco@realenergy.com.br",
        pass: "real@0102"
    }

});

app.post('/sendmailfale', (req, res) => {
    let nome = req.body.nome;
    let email = req.body.email;
    let motivo = req.body.motivo;
    let menssage = req.body.menssage;
    transporterFaleConosco.sendMail({
        from: `${nome} <faleconosco@realenergy.com.br>`,
        to: "faleconosco@realenergy.com.br",
        subject: motivo,
        text: menssage

    }).then((message) => {
        res.json({
            "result": `Mensagem enviada com sucésso!`
        })
    }).catch((err) => {
        res.send(err)
    })
})
app.post('/sendmaildenuncia', (req, res) => {
    let nome = req.body.nome;
    let email = req.body.email;
    let ocorrencia = req.body.ocorrencia;
    let relacao = req.body.relacao;
    let denunciado = req.body.denunciado;
    let relato = req.body.relato;
   
    transporterDenuncia.sendMail({
        from: `${nome} <denuncia@realenergy.com.br>`,
        to: "denuncia@realenergy.com.br",
        subject: ocorrencia,
        html:`<p>nome:${nome?nome:'Não identificado'}</p><p>Email:${email?email:'Não Identificado'}</p><p>relação:${relacao}</p><p>denunciado:${denunciado}</p><p>relato:${relato}</p>`

    }).then((message) => {
        res.json({
            "result": `Mensagem enviada com sucésso!`
        })
    }).catch((err) => {
        res.send(err)
    })

})



.post('/sendtrabalhe', (req, res) => {
    res.json({message:'teste'})
})


app.get('/', (req, res) => {
    res.json({ "author": "Helio Livramento", "Domain": "realenergy.com.br" })
})



app.listen(21055, () => {
    console.log('Server Online')
})