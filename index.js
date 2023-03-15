const express = require('express');
const nodemailer = require("nodemailer");
const app = express()
app.use(express.json())

let transporter = nodemailer.createTransport({
    host: "smtps.uhserver.com",
    port: 465,
    secure: true,
    auth: {
        user: "atendimento@realenergy.com.br",
        pass: "real@0102"
    }

});

app.post('/sendmail', (req, res) => {
    let nome = req.body.nome;
    let email = req.body.email;
    let motivo = req.body.motivo;
    let menssage = req.body.menssage;
    transporter.sendMail({
        from: `${nome} <atendimento@realenergy.com.br>`,
        to: "ti@realenergy.com.br",
        subject: motivo,
        text: menssage

    }).then((message) => {
        res.json(message)
    }).catch((err) => {
        res.send(err)
    })
})

app.listen(3333, () => {
    console.log('Server Online')
})