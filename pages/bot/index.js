

export default function Bot() {
    
    const client = require('twilio')('AC56ef7f3519f37fdd1c2ef8946d4c14e9', 'ebbd4cc59793cacdaf989c1cdd931711');

    client.messages
        .create({
            from: 'whatsapp:+14155238886',
            body: 'Hello there!',
            to: 'whatsapp:+551938924947'
        })
        .then(message => console.log(message.sid));

    return (
        <>


        </>
    );
}
