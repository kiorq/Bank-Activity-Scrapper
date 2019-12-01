const imaps = require("imap-simple");

export const readEmails = (user: string, password: string): Promise<object[]> => {
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

        imaps.connect(config).then((connection: any) => {
            return connection.openBox("INBOX").then(() => {
                return connection.search(searchCriteria, fetchOptions).then(function(results: object[]) {
                    const messages = results.map((res: any) => {
                        const parts = res.parts;
                        const subject = parts.find((part: any) => part.which === "HEADER").body.subject[0];
                        const body = parts.find((part: any) => part.which === "TEXT").body;

                        return { subject, body };
                    });

                    resolve(messages);
                    connection.end();
                });
            });
        });
    });
};

export const findEmail = (subjectPattern: RegExp, timeout: number = 60000, user: string, password: string) => {
    // keeps checking email for matched subject
    return new Promise(async (resolve, reject) => {
        let _checkTimeout: NodeJS.Timer;
        const _checkEmails = async () => {
            _checkTimeout = setTimeout(async () => {
                const messagesFound = await readEmails(user, password);
                const matchingEmail = messagesFound.find((message: any) => {
                    return message.subject.match(subjectPattern);
                });

                if (matchingEmail) {
                    resolve(matchingEmail);
                    clearTimeout(_checkTimeout);
                    return;
                }

                await _checkEmails();
            }, 7000);
        };

        // set timeout
        setTimeout(() => {
            clearTimeout(_checkTimeout);
            reject(new Error("Timeout"));
        }, timeout);

        await _checkEmails();
    });
};
