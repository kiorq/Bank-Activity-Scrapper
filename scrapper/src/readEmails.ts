var imaps = require("imap-simple");

const readEmails = (user, password) => {
    return new Promise((resolve, reject) => {
        const config = {
            imap: {
                user,
                password,
                host: "imap.gmail.com",
                port: 993,
                tls: true,
                authTimeout: 3000
            }
        };
        const searchCriteria = ["UNSEEN"];
        const fetchOptions = {
            bodies: ["HEADER", "TEXT"],
            markSeen: true
        };

        imaps.connect(config).then(connection => {
            return connection.openBox("INBOX").then(() => {
                return connection.search(searchCriteria, fetchOptions).then(function(results) {
                    const messages = results.map(res => {
                        const parts = res.parts;
                        const subject = parts.find(part => part.which === "HEADER").body.subject[0];
                        const body = parts.find(part => part.which === "TEXT").body;

                        return { subject, body };
                    });

                    resolve(messages);
                    connection.end();
                });
            });
        });
    });
};

export default readEmails;
