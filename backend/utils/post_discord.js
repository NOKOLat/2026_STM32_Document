export async function PostProgressToDiscord(webhookUrl, username, sec, pg) {

    try {
        const content = `${username}さんが セクション ${sec}のページ ${pg}をクリアしました!!!!`;
        const payload = { content };

        const resp = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        let bodyText = "";  
        try {
            bodyText = await resp.text();
        } catch (tErr) {
            bodyText = `<unable to read body: ${tErr.message}>`;
        }

        if (!resp.ok) {
            console.error(`Discord webhook responded with ${resp.status}:`, bodyText);
            return false;
        }

        console.log(`Discord webhook sent (status ${resp.status}):`, bodyText);
        return true;

    } catch (err) {
        console.error("Discord webhook error:", err);
        return false;
    }

}

export { PostProgressToDiscord as PostDiscord };