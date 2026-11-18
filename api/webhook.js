export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { message } = req.body;
        const token = '9283172833:AAHirnEo3h-DTQakpRiqewAq73eSqRhvbPM'; 
        const apiUrl = `https://api.telegram.org/bot${token}/sendMessage`;

        if (message && message.text === '/start') {
            await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: message.chat.id,
                    text: `Assalomu alaykum, ${message.from.first_name}!\n\nMuhammadamin Isomiddinovning rasmiy botiga xush kelibsiz! 🚀\n\nXizmatlarim: Sayt yaratish, AI video va SMM.\n\nIltimos, avval quyidagi sahifalarga obuna bo'ling:`,
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "📢 Telegram Kanal", url: "https://t.me/muhammadamin_isomiddinovx" }],
                            [{ text: "📸 Instagram", url: "https://www.instagram.com/muhammadamin__officiall/" }],
                            [{ text: "👤 Shaxsiy Telegram", url: "https://t.me/Muhammadaminofficial" }]
                        ]
                    }
                })
            });
        }
        res.status(200).json({ status: 'ok' });
    } else {
        res.status(200).json({ status: 'Bot is running' });
    }
}
